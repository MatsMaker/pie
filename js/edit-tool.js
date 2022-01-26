/*
How use

    To scale - hold key 'e', use shift for save ratio
    To move - hold key 'w'
    To rotation - hold key 'q'
    To toggle visible - key 'v'
    Show active item to console log - 'space', use shift to log all items

    Select edited item:
        next item - key 'f'
        prev item - key 'd'

*/

function editTool() {
  console.log("PIE is active");
  const targetListener = window;

  const controlKeys = {
    nextItem: "f",
    prevItem: "d",
    rotation: "q",
    move: "w",
    scale: "e",
    visible: "v",
    itemsToLog: " ", // space
    scaleSensitivity: 1 / 100,
    rotationSensitivity: 1 / 5,
  };

  const editState = {
    editObjects: [],
    activeItemIndex: 0,
    mod: undefined, // 'scale' / 'move' / 'rotation'
    isActive: false,
    mousePosition: {
      x: 0,
      y: 0,
    },
  };

  function getActiveItem() {
    return editState.editObjects[editState.activeItemIndex];
  }

  function blinkActiveItem() {
    const activeItem = getActiveItem();
    if (activeItem === undefined) return;

    const startStatus = activeItem.visible;
    setTimeout(function () {
      activeItem.visible = !activeItem.visible;
    }, 0);
    setTimeout(function () {
      activeItem.visible = !activeItem.visible;
    }, 150);
    setTimeout(function () {
      activeItem.visible = !activeItem.visible;
    }, 250);
    setTimeout(function () {
      activeItem.visible = startStatus;
    }, 300);
  }

  function onStartEdit(event) {
    if (!editState.mod) return;
    editState.isActive = true;
    editState.mousePosition = { x: event.x, y: event.y };
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event) {
    if (!editState.isActive) return;
    event.stopPropagation();
    event.preventDefault();

    const activeItem = getActiveItem();
    if (!activeItem) {
      // eslint-disable-next-line
      return console.info("Is not active item");
    }

    switch (editState.mod) {
      case "move": {
        const mouseDelta = {
          x: editState.mousePosition.x - event.x,
          y: editState.mousePosition.y - event.y,
        };
        activeItem.position.x -= mouseDelta.x;
        activeItem.position.y -= mouseDelta.y;
        break;
      }

      case "rotation": {
        const mouseYDelta = editState.mousePosition.y - event.y;
        activeItem.angle -= mouseYDelta * controlKeys.rotationSensitivity;
        break;
      }

      case "scale": {
        let mouseDelta = {
          x: event.shiftKey
            ? editState.mousePosition.y - event.y
            : editState.mousePosition.x - event.x,
          y: editState.mousePosition.y - event.y,
        };
        activeItem.scale.x =
          activeItem.scale.x - mouseDelta.x * controlKeys.scaleSensitivity;
        activeItem.scale.y =
          activeItem.scale.y - mouseDelta.y * controlKeys.scaleSensitivity;
        break;
      }

      default:
        break;
    }
    editState.mousePosition = { x: event.x, y: event.y };

    return false;
  }

  function onEndEdit(event) {
    if (!editState.isActive) return;
    editState.isActive = false;
    editState.mousePosition = { x: 0, y: 0 };
    event.stopPropagation();
    event.preventDefault();
  }

  function onSetMod(event) {
    switch (event.key.toLowerCase()) {
      case controlKeys.nextItem: {
        editState.activeItemIndex = Math.min(
          editState.activeItemIndex + 1,
          editState.editObjects.length - 1
        );
        blinkActiveItem();
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.prevItem: {
        editState.activeItemIndex = Math.max(editState.activeItemIndex - 1, 0);
        blinkActiveItem();
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.scale: {
        editState.mod = "scale";
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.move: {
        editState.mod = "move";
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.rotation: {
        editState.mod = "rotation";
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.visible: {
        const activeItem = getActiveItem();
        activeItem.visible = !activeItem.visible;
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      case controlKeys.itemsToLog: {
        const dataToLog = event.shiftKey
          ? editState.editObjects
          : getActiveItem();

        // eslint-disable-next-line
        console.log("PIE: ", dataToLog);
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      default:
        break;
    }
  }

  function onUnsetMod(event) {
    if (!editState.mod) return;
    editState.mod = undefined;
    event.stopPropagation();
    event.preventDefault();
  }

  targetListener.addEventListener("mousedown", onStartEdit);
  targetListener.addEventListener("mousemove", onMouseMove);
  targetListener.addEventListener("mouseup", onEndEdit);

  targetListener.addEventListener("keydown", onSetMod);
  targetListener.addEventListener("keyup", onUnsetMod);

  return {
    ADD: function (item) {
      editState.editObjects.push(item);
    }.bind(this),
    SET: function (item) {
      editState.editObjects = [item];
    }.bind(this),
  };
}
window.___PIE___ = editTool();
