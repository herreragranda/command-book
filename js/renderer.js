import { replaceVariables } from './config.js';

function renderCommandList(commands) {
    const list = document.getElementById('command-list');
    list.innerHTML = '';
    
    commands.forEach(command => {
        const replacedCommand = replaceVariables(command.command);
        
        const li = document.createElement('li');
        li.dataset.type = command.type;
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'command-name';
        nameSpan.textContent = command.name;
        
        const typeTag = document.createElement('span');
        typeTag.className = 'command-type';
        typeTag.textContent = command.type;
        
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
        
        li.appendChild(nameSpan);
        li.appendChild(typeTag);
        li.appendChild(codeBlock);
        li.appendChild(copyButton);
        list.appendChild(li);
    });
}

export { renderCommandList };
