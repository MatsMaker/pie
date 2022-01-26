# PIE (PIxi js Edit)

Developer Tools for modifying display objects written with Pixi.js

## How install

Download and instal as chrome extension

## How use

Then in project source code add display object to editing list use the next code:

```
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

Then we can use hot key for fast modify object

### Hotkeys list:

- To scale - hold key 'e', use shift for save ratio
- To move - hold key 'w'
- To rotation - hold key 'q'
- To toggle visible - key 'v'
- Show active item to console log - 'space', use shift to log all items

- Select edited item:
  next item - key 'f'
  prev item - key 'd'

## Note, Attention

When the extension is active you can't use some keys(from hotkey list) with default behavior. Because extension intercepted their behavior

### To more comfortable

Set activation extension by click.
##### For it
Click by extension in bar. Then "The can reed and change data" set "When you click the extension". After turn on this extension when it need and don't block keys from hotkey list on all sites.
