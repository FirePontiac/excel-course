export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];
  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        // Не функцию, а обьект уже
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action); // state тут это старый state не измененный; state = Тут Получается state переопределили
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      // Потом улучшим
      return state;
    },
  };
}

// Extra Task Переписать на класс
