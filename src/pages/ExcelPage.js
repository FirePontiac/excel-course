import { Page } from '@core/Page';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/toolbar';
import { StateProcessor } from '@core/StateProcessor';
import { LocalStorageClient } from '@core/LocalStorageClient';

// function storageName(param) {
//   return 'excel:' + param; // Просто формирует по шаблону название
// } перемещено в файл LocalStorageClient

// В итоге Вся прелесть то что мы вынесли всю логику из этого файла
// А тут  можем менять взаимодействие

// Важно ! Если Хотим теперь переписать взаимодействие, например к серверу
// Приписать надо ещё один Client, описать его и готово

export class ExcelPage extends Page {
  constructor(param) {
    super(param); // super - Это метод

    this.storeSub = null;
    // processor - будет являться инстансом класса StateProcessor
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
      // Можно тут задержку ,400 // вместо this.params будет id
      // Т.е. в парамеры инстанса передали другой класс с id
      // 400 - Это задержка
    );
  }
  // Новая страница; 2 ая Excel

  // На текущем этапе задача состоит в том чтобы все сохранялось на серваке

  // При нажатии на новую таблицу получаем Ошибку Тут
  async getRoot() {
    // В Route Это не обрабатываем
    // const params = this.params ? this.params : Date.now().toString();

    // Storage будем получать из процессора
    // Это поведение может быть асинхронным т.к. можем грузить это с сервера
    // было const state = storage(storageName(params));

    // processor.get() - Теперь это может быть асинхронным
    // Получается из класса StateProcessor;
    // Который по цепочке обращается в другой класс
    const state = await this.processor.get();

    const initialState = normalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    // Было  const stateListener = debounce((state) => {
    //   storage(storageName(params), state);
    // }, 300); // 300 Можно менять, Избавляет от Спама в store;

    // было store.subscribe(stateListener);
    // Было this.storeSub = store.subscribe(stateListener);

    // Так подписались на store с общим интерфейсом
    this.storeSub = store.subscribe(this.processor.listen);

    // Далее state мы можем получать из LocalStorage или из Базы данных

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table], // Это всё классы
      store,
    });
    return this.excel.getRoot(); // В Route Это не обрабатываем, поэтому ошибка
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
    this.storeSub.unsubscribe();
  }
}
