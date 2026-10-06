const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const START = '/* HideVsIcon Extension - DO NOT EDIT */';
const END = '/* HideVsIcon Extension - END */';
const BLOCK_REGEX = /\/\* HideVsIcon Extension - DO NOT EDIT \*\/[\s\S]*?\/\* HideVsIcon Extension - END \*\//g;
const HIDE_CSS = `${START}
.monaco-workbench .part.titlebar .window-appicon { display: none !important; }
${END}`;

// Relative to <appRoot>/out, the same key VS Code uses in product.json "checksums"
const CSS_KEY = 'vs/workbench/workbench.desktop.main.css';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('hidevsicon.hide', () => setEnabled(true)),
        vscode.commands.registerCommand('hidevsicon.show', () => setEnabled(false)),
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('hideVSCodeIcon.enabled')) {
                apply();
            }
        })
    );

    // Re-apply on every startup: VS Code updates overwrite the CSS file
    apply();
}

function setEnabled(value) {
    return vscode.workspace.getConfiguration('hideVSCodeIcon')
        .update('enabled', value, vscode.ConfigurationTarget.Global);
}

function apply() {
    const hide = vscode.workspace.getConfiguration('hideVSCodeIcon').get('enabled', true);
    const appRoot = vscode.env.appRoot; // .../resources/app, works with versioned install folders
    const cssPath = path.join(appRoot, 'out', ...CSS_KEY.split('/'));

    try {
        const original = fs.readFileSync(cssPath, 'utf8');
        const cleaned = original.replace(BLOCK_REGEX, '').trimEnd();
        const updated = hide ? `${cleaned}\n${HIDE_CSS}\n` : `${cleaned}\n`;

        if (updated === original) {
            return;
        }

        fs.writeFileSync(cssPath, updated, 'utf8');
        updateChecksum(appRoot, updated);

        vscode.window.showInformationMessage(
            hide ? 'VS Code icon hidden. Reload the window to apply.' : 'VS Code icon restored. Reload the window to apply.',
            'Reload Window'
        ).then(choice => {
            if (choice === 'Reload Window') {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(
            `Hide VS Code Icon: cannot modify ${cssPath} (${error.code || error.message}). ` +
            'If VS Code is installed system-wide, run it once as administrator.'
        );
    }
}

/**
 * Keeps product.json in sync so VS Code doesn't report "installation appears to be corrupt".
 */
function updateChecksum(appRoot, cssContent) {
    try {
        const productPath = path.join(appRoot, 'product.json');
        const product = fs.readFileSync(productPath, 'utf8');
        const checksums = JSON.parse(product).checksums;
        if (!checksums || !checksums[CSS_KEY]) {
            return;
        }

        const newChecksum = crypto.createHash('sha256')
            .update(Buffer.from(cssContent, 'utf8'))
            .digest('base64')
            .replace(/=+$/, '');

        fs.writeFileSync(productPath, product.replace(checksums[CSS_KEY], newChecksum), 'utf8');
    } catch (error) {
        console.error('Hide VS Code Icon: failed to update checksum', error);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
