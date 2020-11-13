import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;

    this.store = options.store; // Передали ещё и сюда; и после этого можно создавать методы, из Excel.js связь

    this.unsubscribers = [];

    this.storeSub = null; // Тут по другому если назвать, полная Жопа будет

    this.prepare();
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращаем шаблон компонента
  toHTML() {
    return '';
  }

  // Позаимствуем из Vue.js назовем с $
  // Фасад паттерн
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    // Не описывает сотояние
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    // Не описывает сотояние
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    // Будет Диспатчить какие-л события прямо в store; Это для каждого компонента будет
    this.store.dispatch(action);
  }
  // Далее логично написать метод для подписки на события, но:
  // $subscribe(fn) { // подпишемся всего 1 раз, и это не на уровне компонента; а где то в Excel.js
  //   // const sub = this.store.subscribe(fn)
  //   this.store.subscribe(fn)
  //   // sub.unsubscribe()
  // } //  Хотя :

  $subscribe(fn) {
    // Сюда Прилетает null И всё идёт к херам
    this.storeSub = this.store.subscribe(fn); // Так как изначальная задумка слишком сложна, начнём с простого
    // Смотри 3 Связывание store и UI
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());

    this.storeSub.unsubscribe(); // unsubscribe Этот наш метод описан где в другом файле
  }
}
