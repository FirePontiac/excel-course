import { $ } from '../core/dom'; // Такой путь, т.к. потом накрутом тесты

export function Loader() {
  return $.create('div', 'loader').html(`
  <div class="lds-roller">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  </div>
  `);
}
