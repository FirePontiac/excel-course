import {$} from '@core/dom'

export class Excel {
    constructor(selector, options) { // options и есть обьект components: [] из индекс js файла; И пока что selector это всего лишь строка
        // this.$el = document.querySelector(selector) // $el передаём текущий DOM элемент 
        this.$el = $(selector)

        this.components = options.components || [] // Если не определено по умолчанию, то передать массив
    }

    getRoot() { // метод будет возвращать корневую ноду для Excel

        const $root = $.create('div', 'excel') // Когда это подключили Сделаем копию проекта,т.к. далее будем при помощи dom.js переписывать функционал; создём div с классом excel
        // const $root = document.createElement('div')  // Нативный элемент ; 2 Строки отрефакторили смотри строку 11
        // $root.classList.add('excel') // Добавить в $root корневой класс excel, смотри иерархию в excel html документе
        // Любые DOM ноды которые будем создавать, будет обёрнуты в данный класс строка 11
        // 18 Строка Это просто массив из классов, а не инстансов ! Этих классов
        // this.components.forEach(Component => { // Component с большой буквы т.к. обращаемся к кострукторам этих классов
            // Поменяем метод
        this.components = this.components.map(Component => {   

            // const $el = document.createElement('div') // Создали div для корневого элемента, затем передаём этот $el в 15 ую строку ; Тоже устаревшая конструкция

            // $el.classList.add(Component.className) // Обратимся к компоненту у когторого ещё не создан инстанс
            // Кривенько работеет, добавим непосредственно $el для HTML
            const $el = $.create('div', Component.className) // Like jquery // На данном этапе перенесли шаблон проектирования

            const component = new Component($el) // Раз Component - это конструктор, то внутри можно создавать новые элементы; new Component - этот компонент, - это класс короторый являнется наследником от excelComponent
            // Component($el) - Пока что единственное место определения конструктора
            // $el.innerHTML = component.toHTML() // Тпереь с $root по другому взаимодействуем

            // Debugging ; Вынесем component в глобальную область видимости

            if (component.name) { // Если определил имя компонента
                window['c' + component.name] = component // Debug; пока что только для обьекта Formula задали c + name; т.е. cFormula в консоли браузера
                // window.cFormula.destroy в консоли браузера; Тут важно понять как работает метод Bind и у том месте где собитие создаётся
                // Обрати внимание на метод bind в файле DomListener 
            }


            $el.html(component.toHTML()) // Отрефакторили 25 строку

            // $root.insertAdjacentHTML('beforeend', component.toHTML()) // Добавили массив компонентов на страницу
            $root.append($el) // в $root только склыдывает этот $el
            // Но если map то нам надо вернуть что то
            return component // Состоящий уже как раз из инстансов

        })
        // $root.textContent='test' // Добавили модуль и оперируем его свойствами
        // $root.style.fontSize='5rem'
        return $root
    }

    render() {
        // console.log(this.$el)
        // afterbegin, afterend, beforeend, beforebegin
        // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`) // По другому добавим
        // this.$el - это пока что просто контейнер с div
        // const node = document.createElement('h1') // Возможность виртуального создания нод и их наполнением
        // node.textContent = 'Test' // Создали тестовый заголовок
        // this.$el.append(this.getRoot()) // Элемент таким образом получаем из метода getRoot ;
        this.$el.append(this.getRoot()) // Поэтому мы внедряем библиотеку в самом начале, дабы дебажить проще
        // console.log(this.components) // Новый массив
        this.components.forEach(component => component.init())
        // this.components.forEach(component => component.remove());
        // console.log(this.components)
        // this.$el.append(this.getRoot().$el) // Можно так чтобы заработало
    }
}