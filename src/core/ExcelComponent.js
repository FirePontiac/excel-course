import { DomListener } from '@core/DomListener';
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    // Сюда уже передаются, в пустой обьект options = {} передаются formula, header и т.д.
    super($root, options.listeners);
    this.name = options.name || '';
    // Создадим новый инстанс
    this.emitter = options.emitter;
    // Далее у каждого компонента, который наследуется от Excel компонента есть приватная переменная emitter
    // и это одна и та же ссылка на один и тот же обьект
    // console.log(options); // Посмотрели на все options обьекты

    this.prepare(); // Вызывается до init, и это ещё 1 hook, где можно творить вспомогательные элементы
  }

  prepare() {}

  toHTML() {
    return '';
  }
  init() {
    // Это Hook ! Т.е. метод вызывающийся в определнный этап жизни компонента
    // init берётся из Excel.js смотри там, С этого начнём
    this.initDOMListeners(); //
  }
  destroy() {
    this.removeDOMListeners();
  }
}
