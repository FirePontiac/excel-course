import { ExcelComponent } from '@core/ExcelComponent';
export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    // Сериализуем сразу, тут его не было, Описание в Formula.js
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHTML() {
    return `
        <input type="text" class="input" value="New Table"/> 
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
        `;
  }
}
