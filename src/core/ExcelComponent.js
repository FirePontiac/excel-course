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
    this.unsubscribers = []
    this.prepare(); // Вызывается до init, и это ещё 1 hook, где можно творить вспомогательные элементы
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращаем шаблон компонента
  toHTML() {
    return '';
  }
  // Позаимствуем из Vue.js назов]м с $
  // Фасад паттерн
  // Дале посложнее: 
  // Тутуже допишем что Уведомляем слушателей о событии event Оч важно
  $emit(event, ...args){ // Это интерфейс позволяющий взаимодействовать с emitter
    this.emitter.emit(event, ...args)
  }
  
  // Создадим новый механизм подписки, subscribe покаостается
  // Подписываемся на событие event; далее идем в Table именяем там
  $on(event, fn) { // Централизованное место место подписки в рамках любых компонентов
  const unsub = this.emitter.subscribe(event, fn)
  // const unsub тут ее пишем т.к. подписавшись на какое то событие мы в тот же момент и получаем функцию отписки от этого события
  this.unsubscribers.push(unsub) // В массив складываем функцию отписки
  // Теперь далее уже не имеет значения кто и сколько раз подписалмя благодоря такому коду
  }
  
  // Инициализируем компонент
  // Добавляем DOM слушателей 
  init() {
    // Это Hook ! Т.е. метод вызывающийся в определнный этап жизни компонента
    // init берётся из Excel.js смотри там, С этого начнём
    this.initDOMListeners(); //
  }
  
  // Удаляем компонент
  // Чистим слушателей
  destroy() { // Описан но еще нигде не вызывается, начнем с Самого Excel.js
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub()) // Просто перебираем масси и у каждого элемента вызываем эту функцию
  }
}
