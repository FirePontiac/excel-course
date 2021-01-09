// Так jest не понимает, и надо Этот Alias заменить на Относительный путь
// import { createStore } from '@core/createStore';
// Alias понимает Только WebPack !!!
import { createStore } from './createStore';

// Для тестирования функции getState
const initialState = {
  count: 0,
};

// Опишем отдельно Моковые значение
const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    // Тогда вернём Изменённый state
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe('CreateStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    // initialState - Если сюда это не добавить
    // то последний тест работать не будет
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should return store object', () => {
    // () => {} - Это rootReducer; {} - это начальное состояние
    // Сперва протестируем систему импортов

    // Функция CreateStore должна вернуть обьект у которого как минимум 3 метода
    // getState, subscribe и dispatch
    // Было const store = createStore(reducer);
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();

    // expect(1).toBe(1); Самый простой тест
  });

  test('should return object as a state', () => {
    // Было const store = createStore(reducer);
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change state if action exist', () => {
    // Для этого сперва надо задиспатчить это
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  test("should NOT change state if action don't exist", () => {
    // Для этого сперва надо задиспатчить это
    store.dispatch({ type: 'NOT_EXISTING_ACTION' });
    expect(store.getState().count).toBe(0);
    // Раз Экшона нет, поэтому state не должен изменяться
    // и поэтому он принимает в себя начальное состояние 0
  });

  test('should call subscriber function', () => {
    // Для этого отдельно создадим функцию subscriber
    // Назовём ее handler
    store.subscribe(handler); // Условный шпион, который можно тестировать
    store.dispatch({ type: 'ADD' });
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('sould NOT call sum if unsubscribe', () => {
    const sub = store.subscribe(handler);

    sub.unsubscribe();

    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch in async way', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Через 500 мс Задиспатчим что то в store
        store.dispatch({ type: 'ADD' });
      }, 500);

      setTimeout(() => {
        // Через секунду будем проверять добавилось ли
        expect(store.getState().count).toBe(1);
        resolve();
        // Чтобы зарезолвить Промис; Разрешить Обещание (resolve Promise)
      }, 1000);
    });
  });
});
