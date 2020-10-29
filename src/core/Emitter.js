export class Emitter {
  // Важно чтобы этот Observer был единым для всех компонентов внутри Excel.js
  // Для этого в Excel.js смотри что сотворим!
  constructor() {
    this.listeners = {};
  }
  // dispatch, fire, trigger Аналогиии
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      );
    };
  }
}
