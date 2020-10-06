import {capitalize} from '@core/utils'

export class DomListener { // Тут будем добавлять изолированные собития для какого -л. элемента который наследуется от этого класса
    // В конструктор будем передавать чтобы в формуле заработало массив, ппо умолчанию пустой эт если его не передали
    constructor($root, listeners = [] ) { // Пока что про тот элемент который хотим получать мы ничего не знаем, это будет корневой элемент на которым мы будем вешать различные слушатели
        if (!$root) { // Проверка не $root
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root // Просто занесли в переменную корневой элемент
        this.listeners = listeners // Сохраним в this переменную listeners чтобы она была доступна в initDOMListeners() { ; removeDOMListeners() { методах
    } // Тут Далее будем добавлять собития DOM; по Шаблону проектирования см картинку, тут ниже будем добавлять и удалять слушателей

    initDOMListeners() { // надо вызывать для каждого из компонентов
        // console.log(this.listeners, this.$root)
        // А начнём с массива строк
        this.listeners.forEach(Listener => { // На каждой итерации будем получать Listener
            
            // input => onInput

            const method = getMethodName(Listener) // Эту переменную надо получить из Listener
            if (!this[method]) {
                const name = this.name || '' // this.name приходит из файла ExcelComponent
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            // console.log(method)
            // console.log(Listener, this.$root) // $root тут это инстанс класса DOM; нашей абстрактной оболочки над нативными элементами
            // Like add.eventListener ; заменяем его на другое т.к. работаем в абстракции
            // this.$root.on(Listener, () => {}) // Было
            // this.$root.on(Listener, this['onInput']) // Протестировали

            this[method] = this[method].bind(this) // this[method] - Это тут onInput, onClick; и тут мы переопределяем этот метод, и что он тут всегда будет забинден на свой собственный контекст
            // Подобные конструкции встречаются щас в React и Angular в этом то как раз их идея, в передаче контекста и управления другому методу в 1 строку; Об Этом в файле dom.js написано в Методе on
            // 31 Строка  этот этот метод куда бы мы его не передавали всегда будет иметь контекст this

            this.$root.on(Listener, this[method]) 
            // Было this.$root.on(Listener, this[method].bind(this)) // Важно понять как работает bind !!!
            // bind Ключевое, Создаёт новую функцию ! И уже новую функцию передаём в метод on ! Для Того чтобы посмотреть другое решение создана отдельная копия; создан каталог Удаление слушателей
        })
    }

    removeDOMListeners() {
        // console.log('removeDOMListeners') // Метод вызывается , проверили removeDOMListeners
        this.listeners.forEach(Listener => {
            // Неверно создавать для этого новую переменную const methodRemove = getMethodName(Listener) // Эту переменную надо получить из Listener
            const method = getMethodName(Listener)
            // console.log('removeDOM', method)
            // this.$root.del(Listener, this[methodRemove].bind(this)) // Сюда выжно добавить ту же функцию которую добавляли
            this.$root.del(Listener, this[method]) // Вот и всё удаление, с теми же переменными работаем
            // this[method] - Это та же самая функция и с тем же контекстом что и в initDOMListeners; И это так Работает, после срабатывания этого события больше нет генерируются
            // Это скопировали в отдельный резервный файл с таким решением

            // this.$root.del(Listener, this[method]) // Так было, а для bind сделали как в строке 42
            // А тут в методе del мы удаляем функцию без bind ! Но этой функции на самом деле нету, т.е. мы обращаемся к методу method нашего класса получаются разные события, и поэтому слушатели не удаляются 

            // const name = this.name || '' // this.name приходит из файла ExcelComponent
            // Надо тестировать удаления собития, полезно при утечке памяти !
        })

        }

        
    }


function getMethodName(eventName) { // Приватная(так используется только внутри этого класса) Pure Function для всего этого модуля для добавления приставки on !
    return 'on' + capitalize(eventName) // решили вопрос с префиксами

}  


