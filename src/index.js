import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage, debounce } from '@core/utils';
import { initialState } from '@/redux/initialState';
import './scss/index.scss';

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  // Базовая оптимизация debounce Работает на всю страницу
  // debounce - 1 Аргумент ф-я call back; 2 м параметром количество милисекунд после задержки
  // Тут обновляем state, и всё это сохраняется в storage
  console.log('App State: ', state);
  storage('excel-state', state);
}, 300); // 300 Можно менять, Избавляет от Спама в store; т.е. пока до конца не ввели, в store не заносится
store.subscribe(stateListener);

// Было store.subscribe((state) => {
//   // Тут обновляем state, и всё это сохраняется в storage
//   console.log('App State: ', state);
//   storage('excel-state', state);
// });

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
// Что такое Супер парсер ?
// Сделаем базовый парсинг, сложение умножение, деление и вычитание
// Сделаем этой одной функцией что не писать сложные регулярки ?? Регулярные выражения
// Изначально вычисляющее выражение будет в дата атрибуте, а результирующее в ячейке
