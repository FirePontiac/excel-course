import { $ } from '@core/dom';
// import { $ } from '../dom'; // Это для Тестов
import { ActiveRoute } from '@core/routes/ActiveRoute';
import { Loader } from '../../components/Loader';
// import { ActiveRoute } from './ActiveRoute'; // Это для Тестов
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

    this.loader = new Loader(); // Функциональный компонент

    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    // Основываясь на текущем URL адресе
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear().append(this.loader);
    // И в зависимости от этого роута показывать нужную страницу
    // ActiveRoute позволяет определить текущий URL
    const Page = ActiveRoute.path.includes('excel')
      ? // Тут храним сами классы, а не инстансы
        this.routes.excel
      : this.routes.dashboard; // Так Роутим и парсим нужную страницу
    this.page = new Page(ActiveRoute.param); // Это создали инстанс класса
    // ActiveRoute.param Это параметры в URL

    const root = await this.page.getRoot();
    // Было this.$placeholder.append(this.page.getRoot());
    // Вставляет HTML шаблон в placeholder

    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }
  // Именно Роутер сигнализирует о том что
  // шаблон уже проинициализирован в DOM дереве
  destroy() {
    // Убиваем hash
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
