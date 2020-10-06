import {DomListener} from '@core/DomListener' // Импорт этой фигни из Webpack; @core - это и есть обращение к webpack

export class ExcelComponent extends DomListener { // Централизованное место ExcelComponent для всех компонентов в приложении 

    constructor($root, options = {}) { // Это щас тоже что и super ($root, в файле Formula.js

        super($root, options.listeners)  // А остальные constructor($root, options) опции уже будут нужны для excel компонента 
        this.name = options.name || ''
    }

    // Возвращает шаблон компонента
    toHTML() { // Первый абстрактный метод, будет определён для инстанса каждого будущего класса
        return '' // А последующие реализации этого метода буду возвращать не строку а уже шаблон для наследуемого класса
    }

    // Для кождого из компонентов реализуем метод init; Это будет ещё 1 уровень абстрации, который позволит управлять кодом; и это всегда делать после Render
    init() { // Достаточно вызвать метод init и сюда будем помещать всё то что необходимо проинициализовать для этого компонента
        this.initDOMListeners() // Просто пока что вызовем, initDOMListeners приходит из наследования базового класса DomListener
    }

    destroy() { // Корректное удаление без утечек памяти; Было remove
        this.removeDOMListeners() // Тут всё верно по наследованию
    }

}