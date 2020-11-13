import { TABLE_RESIZE } from './types';

// Pure FUnction
export function rootReducer(state, action) {
  // Теперь, после тго как в Table.js задиспатчили, в этой функции есть эти значения !!
  // Пропишем action Type
  let prevState;
  switch (
    action.type // action.type Это строка говорящая о том какое именно поле надо изменить
  ) {
    case TABLE_RESIZE: // Это константа из файла types.js
      prevState = state.colState || {}; // Это предыдущее состояние state; и если оно не определено вдруг, то {} пустой обьект
      prevState[action.data.id] = action.data.value;
      return {
        // Тут нельзя мутировать state, надо всегда возвращать старый state
        ...state, // Так с помощью спред оператора разворачиваем сам state
        colState:
          // Для реализации этого надо id, value
          // В такой реализации, мы перетираем colState а надо его совмещать, конкатинировать
          // Было, пока не добавили предыдущее состояние action.data, // Из Table.js передаём // Тут будем описывать данные которые будут прилетать в самом action
          prevState,
      };
    default:
      return state;
  }
  // Было сперва тут return state;
}
