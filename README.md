# Command Book

A simple, fast command reference tool for developers. Keep your most-used commands at hand, filter by type, and replace variables on the fly.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

- **Search** — Find commands instantly by name, content, or type
- **Filter by type** — Toggle categories (aws, kubernetes, istio, etc.)
- **Variable replacement** — Configure values once, apply everywhere
- **Copy to clipboard** — One click to copy the ready-to-use command
- **Persistent config** — Your settings are saved in localStorage
- **Dynamic** — Add new commands or types without changing the code

---

## Quick Start

1. Clone or download the repository
2. Serve with any local server:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` in your browser

> **Note:** ES modules require HTTP. Opening `index.html` directly (`file://`) won't work.

---

## Project Structure

```
command-book/
├── index.html        → Main HTML (minimal markup)
├── index.css         → Styles
├── commands.json     → Your command definitions
└── js/
    ├── app.js        → Entry point, initialization
    ├── config.js     → Variable configuration & replacement
    ├── filters.js    → Type filters & search
    └── renderer.js   → Command list rendering
```

---

## Adding Commands

Edit `commands.json`:

```json
{
    "name": "my command",
    "description": "What this command does",
    "command": "kubectl get pods -n <namespace>",
    "type": "kubernetes"
}
```

| Field | Description |
|-------|-------------|
| `name` | Display name |
| `description` | Brief explanation (optional) |
| `command` | The actual command with `<variables>` |
| `type` | Category for filtering |

---

## Adding Variables

Edit `js/config.js`:

```javascript
const CONFIG_FIELDS = [
    { key: 'namespace', placeholder: 'ej: my-namespace' },
    { key: 'cluster_name', placeholder: 'ej: eks-dev' },
    // Add new variables here:
    { key: 'my_variable', placeholder: 'ej: value' }
];
```

Then use `<my_variable>` in your commands.

---

## Current Variables

| Variable | Example |
|----------|---------|
| `<namespace>` | `gestion-precios-dev` |
| `<cluster_name>` | `eks-clientes-qa` |
| `<region>` | `us-east-1` |
| `<pod_name>` | `my-pod-abc123` |
| `<deployment_name>` | `my-deployment` |
| `<replicaset_name>` | `my-replicaset-xyz` |
| `<policy_name>` | `jwt-validator-policy` |
| `<search_term>` | `ERROR` |

---

## License

MIT — Use it however you want.
