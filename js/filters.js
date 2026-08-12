let activeTypes = new Set();
let onFilterChange = () => {};
let favorites = new Set();

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
    
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = new Set(JSON.parse(savedFavorites));
    }
}

function save() {
    localStorage.setItem('activeTypes', JSON.stringify([...activeTypes]));
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function toggleFavorite(commandName) {
    if (favorites.has(commandName)) {
        favorites.delete(commandName);
    } else {
        favorites.add(commandName);
    }
    saveFavorites();
}

function isFavorite(commandName) {
    return favorites.has(commandName);
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
    
    // Ordenar favoritos primero
    filtered.sort((a, b) => {
        const aIsFav = isFavorite(a.name);
        const bIsFav = isFavorite(b.name);
        if (aIsFav === bIsFav) return 0;
        return aIsFav ? -1 : 1;
    });
    
    return filtered;
}

function initWithTypes(types) {
    if (activeTypes.size === 0) {
        types.forEach(t => activeTypes.add(t));
    }
}

export { load, save, render, apply, getUniqueTypes, initWithTypes, setOnFilterChange, toggleFavorite, isFavorite, saveFavorites };
