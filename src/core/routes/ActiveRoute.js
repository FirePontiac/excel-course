export class ActiveRoute {
  static get path() {
    // Статических геттер
    // Будет возвращать текущий путь забитый в адресной строке
    return window.location.hash.slice(1);
  }
  static get param() {
    // Геттер забирающий id из URL после Хеша
    return ActiveRoute.path.split('/')[1];
  }
  static navigate(path) {
    window.location.hash = path; // Переопределяем путь
  }
}
