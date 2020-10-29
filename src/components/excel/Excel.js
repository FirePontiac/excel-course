import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter';
export class Excel {
  // Это Родитель и Обёртка для всех внутренних элементов
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    // Соответственно этот обьект надо по ссылке передаать всем нижестоящим обьектам
    this.emitter = new Emitter(); // Сюда добавим, для того чтобы влиял на все внутренние элементы
  }
  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter, // Переместили ключ во вне
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      // Сюда нужно передать параметры для взаимодействия с Emitter;
      // new Component($el) ясвляется частным случаем либо table, formula и т.д. на каждом событии
      const component = new Component($el, componentOptions);
      // После того как к каждому элементу добавили options
      // emitter: this.emitter, // В Обьекте передали ключ
      //   }); // а этот Component наследуется от excelComponent в свою очередь
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot()); // Тут всё вставляется в DOM дерево
    this.components.forEach((component) => component.init()); // В этот момент времени компонент уже инициализируется
  }
}
