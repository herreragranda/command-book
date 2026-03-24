import { replaceVariables } from './config.js';

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
        
        li.appendChild(header);
        li.appendChild(codeBlock);
        li.appendChild(copyButton);
        list.appendChild(li);
    });
}

export { renderCommandList };
