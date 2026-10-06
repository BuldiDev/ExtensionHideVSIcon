# Hide VS Code Icon

<p align="center">
  <img src="images/logo.png" alt="Hide VS Code Icon Logo" width="128" height="128">
</p>

A VS Code extension that hides the VS Code application icon from the top-left corner of the title bar.

## Features

- **Enabled by default**: the icon is hidden as soon as the extension is installed
- **Survives updates**: the CSS patch is re-applied on every startup
- **No "corrupt installation" warning**: the checksum in product.json is kept in sync
- **Simple commands** to hide or show the icon

## How it works

The extension modifies VS Code's CSS files to hide the application icon from the title bar, providing a cleaner interface.

## Available Commands

- `Hide VS Code Icon` - Hides the icon
- `Show VS Code Icon` - Restores the icon

To use the commands:
1. Press `Ctrl+Shift+P` to open the Command Palette
2. Type one of the commands above

## Configuration

You can also control the icon visibility through VS Code settings:

1. Open Settings (Ctrl+,)
2. Search for "Hide VS Code Icon"
3. Toggle the "Enabled" checkbox
4. Close all VS Code windows and reopen

## Important Notes

⚠️ **This extension modifies VS Code system files**

- A full restart of VS Code (all windows) is needed after each change
- After a VS Code update the patch is re-applied automatically: just reload when prompted
- Administrator permissions might be required on some systems

## Project Structure

```
├── extension.js          # All the extension logic
├── package.json          # Extension manifest
└── README.md             # This file
```

## Troubleshooting

### The icon is not hidden
- Close all VS Code windows and reopen
- Check that `hideVSCodeIcon.enabled` is `true`
- Check write permissions in VS Code installation folder

### Permission errors
- Start VS Code as administrator (Windows) or with sudo (Linux/macOS)
- Verify that VS Code installation folder is writable

### Icon reappears after update
- VS Code updates overwrite the CSS file: the extension patches it again at startup, then restart VS Code

## License

MIT License - See LICENSE file for details.
