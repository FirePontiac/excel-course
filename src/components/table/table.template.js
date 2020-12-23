import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  // state = {}, index = 0
  // this: undefined
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      // И Записываем ещё сюда те стили которые потенциально есть в store
      ...state.stylesState[id],
    }); // 1 Обьект styles; чтобы его сделать ещё и с дефолтными значениями toInlineStyles Внутрь передаём обьект
    return `<div class="cell" 
            contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width}"
            >${parse(data) || ''}</div> `;
  };
}
function toColumn({ col, index, width }) {
  return `<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`;
}
function createRow(index, content, state = {}) {
  // Если тут state = {} Будет Bug
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  // Сюда высоту добавим
  const height = getHeight(state, index);
  return `<div class="row" 
            data-type="resizable" 
            data-row="${index}"
            style="height: ${height}"
            >
                <div class="row-info">
                ${index ? index : ''}
                ${resize}    
                </div>
                <div class="row-data">${content}</div>
            </div>`;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index), // Зымыкания
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  // rowsCount = 20, state = {rowState: {…}, colState: {…}, dataState: {…}, stylesState: {…}, currentText: "", …}
  const colsCount = CODES.Z - CODES.A + 1; // colsCount = 26
  const rows = [];
  const cols = new Array(colsCount) // cols = undefined, colsCount = 26 ; На следующем вызове функции прилетает HTML кодогенерация
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join(''); // Тут Готовили данные Для LocalStorage
  rows.push(createRow(null, cols)); // Первая строка ; И отсюда Летит Ноль далее; Да всё верно Тут Бага !!! Bug Here

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row)) // Допишем colState чтобы не было лишних данных; Дале тут будет нужен весь state перепишем
      .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
