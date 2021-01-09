import { Router } from './Router';
import { Page } from '../Page';
// import { $ } from '../dom';

class DashboardPage extends Page {
  // перепишем метод, так как это моковая реализация и тут можно что угодно
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router;
  // А в тесте new Router принимает не обьект конфигурации !
  // А Selector; поэтому его в добавок надо создать
  let $root;

  // И т.к. мы не хотим использовать те склассы которые были в Prod моде
  // то создадим моковые классы

  beforeEach(() => {
    $root = document.createElement('div');

    // В Рабочей реализации Selector попадает в библиотеку Dom
    // И в этой связи ей не важно элемент или строка попадётся

    router = new Router($root, {
      // А сюда ещё необходимо в соответствии с Проектной схемой
      // Добавить сюда конфигурацию
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  test('should be defined', () => {
    // А самоего router не существует пока что, поэтому создадим его в хуке
    expect(router).toBeDefined();
  });

  test('should render Dashboard Page', () => {
    // Для теста насильно у роутера вызовем метод changePageHandler
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashboard</div>');
  });
});
