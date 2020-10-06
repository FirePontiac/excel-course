import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'

    constructor ($root) { //($root, options) { 
        super ($root, { // Всё по аналогии с Formula.js
            name: 'toolbar', // !!!! Внимание тут с маленькой буквы, аккуратнее в будущем
            listeners: ['click']
        })
    }

    toHTML() {
        return `
                <div class="button">
                    <i class="material-icons">format_align_left</i>
                </div>

                <div class="button">
                    <i class="material-icons">format_align_center</i>
                </div>

                <div class="button">
                    <i class="material-icons">format_align_right</i>
                </div>

                <div class="button">
                    <i class="material-icons">format_bold</i>
                </div>

                <div class="button">
                    <i class="material-icons">format_italic</i>
                </div>

                <div class="button">
                    <i class="material-icons">format_underlined</i>
                </div>
        `       
    }

    onClick(event) { // Теперь после того как добавили Framework, можно к примеру легко добавлять и удалять события
        console.log(event.target)
    }
}