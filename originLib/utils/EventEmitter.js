class EventListener {
  constructor() {
    this._events = this._events || new Map();
  }

  eventNames() {
    return Array.from(this._events.keys());
  }

  addListener(type, fn) {
    const handles = this._events.get(type);
    // 一个新的事件类型
    if (!handles) {
      this._events.set(type, [fn]);
    } else {
      handles.push(fn);
    }
  }

  emit(type, ...args) {
    const handles = this._events.get(type);
    if (!handles || !Array.isArray(handles)) {
      return;
    }
    handles.forEach((handle) => {
      handle.apply(this, args);
    });
  }

  removeListener(type, fn) {
    const handles = this._events.get(type);
    if (!handles || !Array.isArray(handles)) {
      return;
    }
    if (handles.length <= 1 || !fn) {
      this._events.delete(type);
    } else {
      const _handles = handles.filter((handle) => handle !== fn);
      this._events.set(type, _handles);
    }
  }

  removeAllListeners() {
    this._events = new Map();
  }
}
