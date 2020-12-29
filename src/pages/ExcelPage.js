import { Page } from '@core/Page';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { debounce, storage } from '@core/utils';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/toolbar';
function storageName(param) {
  return 'excel:' + param; // Просто формирует по шаблону название
}
export class ExcelPage extends Page {
  // Новая страница; 2 ая Excel
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300); // 300 Можно менять, Избавляет от Спама в store;
    store.subscribe(stateListener);
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table], // Это всё классы
      store,
    });
    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
