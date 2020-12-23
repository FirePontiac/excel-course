import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];
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

  // Сюда будут приходить изменения действительно в тот момент когда они изменятся в store
  // Сюда приходят только изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    // subscribe - В этом массиве просто список строк, и мы выбираем на пакие поля хотим подписаться
    return this.subscribe.includes(key);
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    // Live cycle hoock ?
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим слушателей
  // Далее не будем иметь возможности подписываться внутри Excel компонента
  destroy() {
    // Live cycle hoock ?
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());

    // Было this.storeSub.unsubscribe();
  }
}
