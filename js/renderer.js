import { replaceVariables } from './config.js';
import { toggleFavorite, isFavorite } from './filters.js';

function renderCommandList(commands) {
    const list = document.getElementById('command-list');
    list.innerHTML = '';
    
    commands.forEach(command => {
        const replacedCommand = replaceVariables(command.command);
        
        const li = document.createElement('li');
        li.dataset.type = command.type;
        
        const header = document.createElement('div');
        header.className = 'command-header';
        
        if (command.icon) {
            const icon = document.createElement('img');
            icon.src = command.icon;
            icon.alt = command.type;
            icon.className = 'command-icon';
            header.appendChild(icon);
        }
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'command-name';
        nameSpan.textContent = command.name;
        header.appendChild(nameSpan);
        
        const typeTag = document.createElement('span');
        typeTag.className = 'command-type';
        typeTag.textContent = command.type;
        header.appendChild(typeTag);
        
        const favoriteButton = document.createElement('button');
        favoriteButton.className = 'favorite-button';
        favoriteButton.type = 'button';
        const isFav = isFavorite(command.name);
        favoriteButton.innerHTML = isFav ? '★' : '☆';
        favoriteButton.classList.toggle('active', isFav);
        
        favoriteButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleFavorite(command.name);
            const newIsFav = isFavorite(command.name);
            favoriteButton.innerHTML = newIsFav ? '★' : '☆';
            favoriteButton.classList.toggle('active', newIsFav);
        });
        header.appendChild(favoriteButton);
        
        const infoButton = document.createElement('button');
        infoButton.className = 'info-button';
        infoButton.innerHTML = 'ℹ';
        infoButton.type = 'button';
        infoButton.addEventListener('click', (e) => {
            e.preventDefault();
            const explanation = li.querySelector('.command-explanation');
            if (explanation) {
                explanation.classList.toggle('show');
            }
        });
        header.appendChild(infoButton);
        
        const codeBlock = document.createElement('code');
        codeBlock.className = 'command-text';
        codeBlock.textContent = replacedCommand;
        
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(replacedCommand);
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy', 1500);
        });
        
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'command-explanation';
        explanationDiv.innerHTML = `<p>${command.explanation}</p>`;
        
        li.appendChild(header);
        li.appendChild(codeBlock);
        li.appendChild(copyButton);
        li.appendChild(explanationDiv);
        list.appendChild(li);
    });
}

export { renderCommandList };
