import { debounce } from '@core/utils';

// В итоге будет обьект на странице который будет взаимодействовать со store
// Процессор должен иметь подписку на события,
// Подписка реализована в debounce тут !
// По подписке записываем в storage

export class StateProcessor {
  constructor(client, delay = 300) {
    // client - Это и есть DIP;
    // это обьект у которого есть общий интерфейс; Он может быть и Local Storage
    // И асинхронными запросами на сервер
    // Сразу переопределим метод listen
    // Т.е. будем настраивать сколько будем дебаунсисть функцию listen
    this.client = client; // Т.к. мы в ООП сохраним всё это в Инстансе
    this.listen = debounce(this.listen.bind(this), delay);
  }
  listen(state) {
    // Тут неважно с чем работает, или c Ajax запросами
    // или через debounce, всё равно реализуем этот метод
    this.client.save(state); // Тут state будем прокидывать в наш интерфейс
  }

  // Далее state мы можем получать из LocalStorage или из Базы данных
  get() {
    return this.client.get(); // Получаем client
  }
}
