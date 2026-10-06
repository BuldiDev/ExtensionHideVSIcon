# Change Log

All notable changes to this project will be documented in this file.

## [1.0.3] - 2026-10-06

### 🐛 Fixed
- Extension did nothing on recent VS Code versions: the install folder is now versioned (`Microsoft VS Code/<hash>/resources`), so the hardcoded path lookup failed silently. The path now comes from `vscode.env.appRoot`
- "Your Code installation appears to be corrupt" warning: the checksum in `product.json` is updated together with the CSS

### 🔧 Changed
- Enabled by default
- Visible error message when the CSS file can't be written
- Simplified: single `extension.js`, removed unused `src/` and `media/`

## [1.0.2] - 2025-08-19

### ✨ Added
- **Visual Identity**: Added professional logo (128x128 PNG) for marketplace
- **Documentation**: Streamlined README.md by removing installation and development sections
- **Marketplace Ready**: Enhanced presentation for better user experience

### 🔧 Improved
- Cleaner documentation focused on features and usage
- Professional branding with custom logo
- Simplified user guide

## [1.0.1] - 2025-08-19

### 🌍 Changed
- **Internationalization**: Complete translation to English for global marketplace
- **Documentation**: Updated README.md with professional English documentation
- **User Interface**: All commands, settings, and messages now in English
- **Marketplace Ready**: Prepared for international VS Code Marketplace publication

## [1.0.0] - 2025-01-19

### ✨ Added
- **Main functionality**: Hides VS Code icon from the title bar
- **Settings control**: `hideVSCodeIcon.enabled` configuration in User Settings
- **Command Palette commands**: 
  - `Hide VS Code Icon` - Hides the icon
  - `Show VS Code Icon` - Restores the icon
- **Auto-application**: Extension automatically reads and applies setting on startup
- **Persistence**: Preferences are saved between sessions
- **Multi-platform compatibility**: Supports Windows, macOS and Linux

### 🔧 Technical
- Direct modification of VS Code's `workbench.desktop.main.css` file
- Real-time configuration change listener
- Specific CSS targeting for `.window-appicon` element
- Automatic CSS removal when extension is deactivated

### 📝 Notes
- Requires complete VS Code restart to apply changes
- Safe method that doesn't compromise VS Code stability
- First stable release ready for publication

---

**Changelog format based on [Keep a Changelog](https://keepachangelog.com/)**