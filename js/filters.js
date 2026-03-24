let activeTypes = new Set();
let onFilterChange = () => {};

function setOnFilterChange(callback) {
    onFilterChange = callback;
}

function getUniqueTypes(commands) {
    return [...new Set(commands.map(cmd => cmd.type))].sort();
}

function load() {
    const saved = localStorage.getItem('activeTypes');
    if (saved) {
        activeTypes = new Set(JSON.parse(saved));
    }
}

function save() {
    localStorage.setItem('activeTypes', JSON.stringify([...activeTypes]));
}

function render(types) {
    const container = document.getElementById('type-filters');
    container.innerHTML = '';
    
    types.forEach(type => {
        const label = document.createElement('label');
        label.className = 'type-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = type;
        checkbox.checked = activeTypes.has(type);
        
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                activeTypes.add(type);
            } else {
                activeTypes.delete(type);
            }
            save();
            onFilterChange();
        });
        
        const span = document.createElement('span');
        span.textContent = type;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

function apply(commands) {
    const query = document.getElementById('search-input').value.toLowerCase();
    let filtered = commands;
    
    if (activeTypes.size > 0) {
        filtered = filtered.filter(cmd => activeTypes.has(cmd.type));
    }
    
    if (query) {
        filtered = filtered.filter(cmd =>
            cmd.name.toLowerCase().includes(query) ||
            cmd.command.toLowerCase().includes(query) ||
            cmd.type.toLowerCase().includes(query)
        );
    }
    
    return filtered;
}

function initWithTypes(types) {
    if (activeTypes.size === 0) {
        types.forEach(t => activeTypes.add(t));
    }
}

export { load, save, render, apply, getUniqueTypes, initWithTypes, setOnFilterChange };
