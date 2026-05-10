# PIE (PIxi.js Edit)

🎨 Developer Tools Chrome Extension for modifying Pixi.js display objects in real-time

**Features:**
- Real-time object manipulation (scale, move, rotate)
- Keyboard shortcuts for rapid editing
- Automatic integration with Pixi.js DevTools
- Manifest V3 compliant

## Preview

[![PIE Demo Video](https://img.youtube.com/vi/cwUaDd4eZjE/maxresdefault.jpg)](https://youtu.be/cwUaDd4eZjE)

[Watch demo on YouTube](https://youtu.be/cwUaDd4eZjE)

## How install

Download and install as Chrome extension:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the PIE extension folder

## How use

Then in project source code add display object to editing list use the next code:

```javascript
...
const circle = new Graphics();
circle.lineStyle(2, 0x00ffff);
circle.drawCircle(0, 0, 3);
container.addChild(circle);
...
/// #if DEBUG
// To add Display object to PIE edit list
window.___PIE___ && window.___PIE___.ADD(circle);
// and other do
window.___PIE___ && window.___PIE___.ADD(container);
/// #endif
...
```

## Pixi.js DevTools Integration

**PIE automatically integrates with [Pixi.js DevTools](https://pixijs.io/devtools/)!**

When you select an object in Pixi DevTools, PIE will automatically:
- Detect the selected object (available as `$pixi` in console)
- Add it to the editing list if it's not already there
- Switch to that object as the active item
- Visually blink the object to confirm selection

### Setup for DevTools integration:

Make sure your app exposes PIXI globals:

```javascript
const app = new PIXI.Application({ /* options */ });

// Required for Pixi DevTools
window.__PIXI_APP__ = app;
window.__PIXI_STAGE__ = app.stage;
window.PIXI = PIXI;

// Dispatch initialization event
window.dispatchEvent(new CustomEvent('__PIXI_APP_INIT__', { detail: { app } }));
```

Now you can:
1. Install [Pixi DevTools Chrome extension](https://chrome.google.com/webstore/detail/pixi-devtools)
2. Open Chrome DevTools → **Pixi** tab
3. Select any object in the scene tree
4. Use PIE hotkeys to edit the selected object!

Then we can use hot key for fast modify object

### Hotkeys list:

- To scale - hold key **'e'**, use shift for save ratio
- To move - hold key **'w'**
- To rotation - hold key **'q'**
- To toggle visible - key **'v'**
- Show active item to console log - **'space'**, use shift to log all items

- Select edited item:
  - next item - key **'f'**
  - prev item - key **'d'**

### API Methods:

PIE exposes a global object `window.___PIE___` with the following methods:

```javascript
// Add display object to editing list
window.___PIE___.ADD(displayObject);

// Set single display object (replaces the list)
window.___PIE___.SET(displayObject);

// Manually trigger sync with Pixi DevTools $pixi selection
window.___PIE___.SYNC();
```

**Note:** PIE automatically syncs with Pixi DevTools every 500ms, so manual `SYNC()` calls are usually not needed.

## Note, Attention

When the extension is active you can't use some keys(from hotkey list) with default behavior. Because extension intercepted their behavior

### To more comfortable

Set activation extension by click.
##### For it
Click by extension in bar. Then "The can reed and change data" set "When you click the extension". After turn on this extension when it need and don't block keys from hotkey list on all sites.

## Testing

A test page with Pixi.js demo is included: **test.html**

The test page includes:
- 5 interactive Pixi.js objects (circle, rectangle, star, text, diamond)
- Automatic registration with PIE
- Full Pixi DevTools integration
- Visual instructions

To test:
1. Load the PIE extension in Chrome
2. Open `test.html` in your browser
3. (Optional) Install Pixi DevTools and select objects in the Pixi tab
4. Use PIE hotkeys to edit objects!

## Requirements

- Chrome 88 or higher
- Pixi.js application
- (Optional) [Pixi.js DevTools](https://pixijs.io/devtools/) for enhanced workflow
