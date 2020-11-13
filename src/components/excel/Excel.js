import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];

    this.store = options.store; // В this.store быдет храниться обьект единый для всего прриложения
    // А далее создадим дополнительный методы позволяющие взаимодействовать со store
    // Для этого надо передать store для каждого из компонентов
    // Для этого есть componentOptions внизу; который мы передаём в каждый компонент
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store, // Передали store
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
