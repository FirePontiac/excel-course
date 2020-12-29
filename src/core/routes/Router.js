import { $ } from '@core/dom';
import { ActiveRoute } from '@core/routes/ActiveRoute';
export class Router {
  // Не будет ни от чего наследоваться, существует сам по себе
  constructor(selector, routes) {
    // selector обозначает тот элемент который
    // необходимо менять при построении страницы
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }
    // Теперь это Dom Нода + обёрнутая в библиотеку $
    // эту чтобы у неё были необходимые методы
    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    // Основываясь на текущем URL адресе
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    // И в зависимости от этого роута показывать нужную страницу
    // ActiveRoute позволяет определить текущий URL
    const Page = ActiveRoute.path.includes('excel')
      ? // Тут храним сами классы, а не инстансы
        this.routes.excel
      : this.routes.dashboard; // Так Роутим и парсим нужную страницу
    this.page = new Page(ActiveRoute.param); // Это создали инстанс класса
    // ActiveRoute.param Это параметры в URL
    this.$placeholder.append(this.page.getRoot());
    // Вставляет HTML шаблон в placeholder
    this.page.afterRender();
  }
  // Именно Роутер сигнализирует о том что
  // шаблон уже проинициализирован в DOM дереве
  destroy() {
    // Убиваем hash
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
