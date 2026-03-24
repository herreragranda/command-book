const CONFIG_FIELDS = [
    { key: 'namespace', placeholder: 'ej: mi-namespace' },
    { key: 'cluster_name', placeholder: 'ej: eks-clientes-dev' },
    { key: 'region', placeholder: 'ej: us-east-1' },
    { key: 'pod_name', placeholder: 'ej: my-pod-abc123' },
    { key: 'deployment_name', placeholder: 'ej: my-deployment' },
    { key: 'replicaset_name', placeholder: 'ej: my-replicaset-xyz' },
    { key: 'policy_name', placeholder: 'ej: jwt-validator-policy' },
    { key: 'search_term', placeholder: 'ej: ERROR' }
];

const config = {};
CONFIG_FIELDS.forEach(field => config[field.key] = '');

function load() {
    CONFIG_FIELDS.forEach(field => {
        const saved = localStorage.getItem(`config_${field.key}`);
        if (saved) {
            config[field.key] = saved;
            const input = document.getElementById(`${field.key}-input`);
            if (input) input.value = saved;
        }
    });
}

function render(container, onChange) {
    container.innerHTML = '';
    
    CONFIG_FIELDS.forEach(field => {
        const div = document.createElement('div');
        div.className = 'config-item';
        
        const label = document.createElement('label');
        label.htmlFor = `${field.key}-input`;
        label.textContent = field.key;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `${field.key}-input`;
        input.placeholder = field.placeholder;
        input.value = config[field.key] || '';
        
        input.addEventListener('input', (e) => {
            set(field.key, e.target.value);
            if (onChange) onChange();
        });
        
        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);
    });
}

function save() {
    CONFIG_FIELDS.forEach(field => {
        localStorage.setItem(`config_${field.key}`, config[field.key]);
    });
}

function set(key, value) {
    config[key] = value;
    save();
}

function replaceVariables(text) {
    let result = text;
    CONFIG_FIELDS.forEach(field => {
        const regex = new RegExp(`<${field.key}>`, 'g');
        result = result.replace(regex, config[field.key] || `<${field.key}>`);
    });
    return result;
}

// Profile management
const PROFILES_KEY = 'config_profiles';

function getProfiles() {
    const saved = localStorage.getItem(PROFILES_KEY);
    return saved ? JSON.parse(saved) : {};
}

function saveProfiles(profiles) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

function saveProfile(name) {
    if (!name || !name.trim()) return false;
    const profiles = getProfiles();
    profiles[name.trim()] = { ...config };
    saveProfiles(profiles);
    return true;
}

function loadProfile(name) {
    const profiles = getProfiles();
    if (!profiles[name]) return false;
    
    const profile = profiles[name];
    CONFIG_FIELDS.forEach(field => {
        config[field.key] = profile[field.key] || '';
        const input = document.getElementById(`${field.key}-input`);
        if (input) input.value = config[field.key];
    });
    save();
    return true;
}

function deleteProfile(name) {
    const profiles = getProfiles();
    delete profiles[name];
    saveProfiles(profiles);
}

let onProfileChange = () => {};

function setOnProfileChange(callback) {
    onProfileChange = callback;
}

function renderProfiles(container) {
    container.innerHTML = '';
    const profiles = getProfiles();
    const profileNames = Object.keys(profiles);
    
    if (profileNames.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'profiles-empty';
        empty.textContent = 'No saved profiles';
        container.appendChild(empty);
        return;
    }
    
    profileNames.forEach(name => {
        const item = document.createElement('div');
        item.className = 'profile-item';
        
        const nameBtn = document.createElement('button');
        nameBtn.className = 'profile-name';
        nameBtn.textContent = name;
        nameBtn.title = 'Load this profile';
        nameBtn.addEventListener('click', () => {
            loadProfile(name);
            onProfileChange();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'profile-delete';
        deleteBtn.textContent = '×';
        deleteBtn.title = 'Delete profile';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Delete profile "${name}"?`)) {
                deleteProfile(name);
                renderProfiles(container);
            }
        });
        
        item.appendChild(nameBtn);
        item.appendChild(deleteBtn);
        container.appendChild(item);
    });
}

function renderSaveSection(container, profilesContainer) {
    const wrapper = document.createElement('div');
    wrapper.className = 'save-profile-section';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'profile-name-input';
    input.placeholder = 'Profile name...';
    
    const btn = document.createElement('button');
    btn.textContent = 'Save';
    btn.addEventListener('click', () => {
        const name = input.value;
        if (saveProfile(name)) {
            input.value = '';
            renderProfiles(profilesContainer);
        }
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btn.click();
    });
    
    wrapper.appendChild(input);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
}

export { 
    CONFIG_FIELDS, config, load, save, set, render, replaceVariables,
    getProfiles, saveProfile, loadProfile, deleteProfile, 
    renderProfiles, renderSaveSection, setOnProfileChange
};
