// Тут будем хранить функции для класса DashboardPage
import { storage } from '@core/utils';
function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
  <li class="db__record">
  <a href="#excel/${id}">${model.title}</a>
  <strong>
  ${new Date(model.openedDate).toLocaleDateString()}
  ${new Date(model.openedDate).toLocaleTimeString()}
  </strong>
  </li>
  `;
}
// Тут будем хранить в виде списка с id и id шник будет точно показывать какую модель excel подгружать
// excel: 123345
// excel: 34557
function getAllKeys() {
  const keys = [];
  // Будет содержать список всех таблиц которые мы создавали
  // Задача этой функции получить из LocalStorage те данные которые соответствую описанию выше
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // console.log('Key:', key); // нужный
    if (!key.includes('excel')) {
      // Если не ключ включающий в себя элемент 'excel то на следующую итерацию
      continue;
    }
    keys.push(key);
  }
  return keys;
}
export function createRecordsTable() {
  const keys = getAllKeys();
  console.log('keys:', keys);
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }
  return `
      <div class="db__list-header">
        <span> Table name </span>
        <span> Last date of open </span>
      </div>
    <ul class="db__list">
    ${keys.map(toHTML).join('')}
    </ul>
    `;
}
