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

export { CONFIG_FIELDS, config, load, save, set, render, replaceVariables };
