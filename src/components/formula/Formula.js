import { ExcelComponent } from '@core/ExcelComponent';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    // Добавили options
    // Отсюда начнём расширять конструкторы, для взаимодействия компонентов через паттерн Observer
    super($root, {
      name: 'Formula',
      listeners: ['input'], // Если сюда щас добавить какой то компонент, то будет ошибка так как он не описан
      ...options, // Спред оперетором передаём эти Опции на родительский класс
      // Благодоря такой конструкции выше конструктора можно передавать любой набор параметром
      // и они автоматически будут делегированы для родительского ExcelComponent
    });
  }
  toHTML() {
    return `
        <div class="info">fx</div> 
        <div class="input" contenteditable spellcheck="false"></div>
        `;
  }
  onInput(event) {
    // console.log(this.$root);
    const text = event.target.textContent.trim(); // text = тому что в данный момент находится в поле formula
    // console.log('Formula: onInput', event.target.textContent.trim());
    // было this.emitter.emit('it is working', text); // Сюда можно передавать абсолютно любую строку
    this.$emit('formula:input', text); // Стало к примеру когда дописали в ExcelComponent новый паттерн
  
  }

  //   onClick(event) {
  //     // Bug ??? Test it !!
  //     console.log('mk');
  //   }
}
