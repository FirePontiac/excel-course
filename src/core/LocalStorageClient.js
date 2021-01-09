import { storage } from '@core/utils';

export function storageName(param) {
  return 'excel:' + param; // Просто формирует по шаблону название
}

// Это будет интерфейс взаимодействующий с классом StateProcessor
export class LocalStorageClient {
  constructor(name) {
    // name - то имя по которому мы должны получить данные из Local Storage
    // было this.name = name;
    this.name = storageName(name);
  }

  save(state) {
    // А сам LocalStorage синхронный
    storage(this.name, state);
    // т.к. LocalStorage работает с асинхронными операциями то
    return Promise.resolve(); // Асинхронность тут для универсальности
  }

  get() {
    // Обьект обёрнутый в промис
    // На время Эту имплементацию из Local Storage
    // закоментим т.к. там идут синхронные события
    // return Promise.resolve(storage(this.name));
    return new Promise((resolve) => {
      // Таким образом тут ещё можно обрабатывать ошибки
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 2500);
    });
  }
}
