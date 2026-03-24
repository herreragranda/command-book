import * as Config from './config.js';
import * as Filters from './filters.js';
import { renderCommandList } from './renderer.js';

let allCommands = [];

function applyAndRender() {
    const filtered = Filters.apply(allCommands);
    renderCommandList(filtered);
}

async function loadCommands() {
    const response = await fetch('commands.json');
    allCommands = await response.json();
    return allCommands;
}

function initSearch() {
    document.getElementById('search-input').addEventListener('input', applyAndRender);
}

function initConfig() {
    const container = document.getElementById('config-grid');
    Config.render(container, applyAndRender);
}

async function init() {
    Config.load();
    Filters.load();
    Filters.setOnFilterChange(applyAndRender);
    
    initConfig();
    
    const commands = await loadCommands();
    const types = Filters.getUniqueTypes(commands);
    
    Filters.initWithTypes(types);
    Filters.render(types);
    
    initSearch();
    
    applyAndRender();
}

init();
