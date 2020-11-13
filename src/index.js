import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from './core/createStore'; // @ Через это не работает
import { rootReducer } from './redux/rootReducer';
import './scss/index.scss';
import { storage } from './core/utils';
const store = createStore(
  rootReducer,
  storage('excel-state') // Т.е. теперь в storage обратимся к состоянию excel-state
  //  Был Обьект {
  //   // tableTitle: 'My Table excel', // Это initialState ; Так вызывает state c обьектом
  //   colState: {
  //     // В этом обьекте будем хранить все данные которые относятся к состоянию размерности колонок
  //   },
  // }
); // Alias

// Тут создавали stere тут на него и подпишемся
store.subscribe((state) => {
  console.log('App State', state); // Это subscribe работает вне  зависимости от нашего представления

  storage('excel-state', state); // Добавили state в storage
  // localStorage.setItem('excel-state', JSON.stringify(state)); // Добавить В localStorage state

  // Но теперь в localStorage сохраняется не то начальное состояние, которое должно быть + данные перетираются
}); // Получили app state который дублируется во всех наших компонентах
// Для оптимизации Создадим новую утилиру в файле utils.js

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store, // Сущность ни от чего не зависящая , просто
});
excel.render();
