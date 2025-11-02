# Durable Auto-Injector Browser Extension

## What It Does

This Chrome/Edge extension automatically injects the enrollment programs section into www.elevateforhumanity.org without needing to edit the Durable.co dashboard.

## How It Works

1. **Content Script**: Runs on elevateforhumanity.org and injects the enrollment HTML
2. **Background Worker**: Monitors page loads and manages state
3. **Popup UI**: Provides manual control and status display

## Installation

### Chrome/Edge

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `durable-extension` folder
5. The extension icon will appear in your toolbar

### Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file from `durable-extension` folder

## Usage

### Automatic (Recommended)

1. Visit https://www.elevateforhumanity.org
2. The extension automatically injects enrollment programs
3. No manual action needed!

### Manual

1. Visit https://www.elevateforhumanity.org
2. Click the extension icon in toolbar
3. Click "Inject Enrollment Programs"
4. Refresh the page to see changes

## Features

✅ **Automatic injection** - Works as soon as you visit the site
✅ **No Durable.co login needed** - Injects client-side
✅ **Instant updates** - Changes appear immediately
✅ **Safe** - Only runs on elevateforhumanity.org
✅ **Reversible** - Refresh page to remove (if not saved in Durable)

## Limitations

⚠️ **Client-side only** - Changes are not saved in Durable.co
⚠️ **Temporary** - Disappears on page refresh (unless you save in Durable)
⚠️ **Browser-specific** - Only works in your browser

## Making It Permanent

To make the injected content permanent:

1. Use the extension to inject the content
2. Log into Durable.co dashboard
3. Edit the site and add the same HTML as a Custom HTML block
4. Publish the changes

Or use one of the autopilot scripts to inject directly into Durable.

## Troubleshooting

**Extension not working?**

- Make sure you're on elevateforhumanity.org
- Check that Developer mode is enabled
- Reload the extension in chrome://extensions/

**Content not showing?**

- Open browser console (F12) and check for errors
- Try clicking the extension icon and manually injecting
- Refresh the page

**Want to remove it?**

- Disable or remove the extension from chrome://extensions/
- Refresh the page

## Files

- `manifest.json` - Extension configuration
- `inject.js` - Content script that injects HTML
- `background.js` - Background service worker
- `popup.html` - Extension popup UI
- `popup.js` - Popup functionality
- `README.md` - This file

## Alternative Approaches

If the extension doesn't work for you, try:

1. **Manual HTML** - Copy/paste from DURABLE_ENROLLMENT_CODE.html
2. **Autopilot scripts** - Run `./durable workers` or `./durable manual`
3. **AI Assistant** - Use Durable's built-in AI to add the section

See `QUICK_DEPLOY.md` for all options.
