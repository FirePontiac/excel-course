// Тут будет автоматизация нативности
class Dom {

   // #mfek // Приватная переменная в JS
    constructor(selector) { // На это ES linter ругается; Тут 2 разный Case: 1 selector = строка; 

        // this.$$listeners = {} // Это связано с решением вопроса bind в файле DomListener через системную переменную

        // div c #app к примеру
        this.$el = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector // Так мы определили приватную переменную this.$el с которой будем работать

    }
    html(html) { // Метод, на подобие как было в jquery; Может быть и геттером и сеттером; если SET то вернуть сам инстанс в последствии; (html) просто строка
        if (typeof html === 'string') { //'string' - т.е. что то передано в условие
            this.$el.innerHTML = html // Используем как сеттер если в (html) была передана строка
            return this // Для того чтобы выполнялось в 28 строке, передавался инстантс
        }
        return this.$el.outerHTML.trim() // trim() получили другой метод при не выполенном условии и trim() удалили у него пробелы вначале и в конце
    }

    clear() {
        this.html = ('')
        return this
    }

    // Like add.eventListener ; заменяем его на другое т.к. работаем в абстракции
    // Тут добавляем собитие
    on(eventType, callback) { // evntType Это строка Input, click, mouseDown и т.д. ; callback - эт просто функция выполняющаяся
       // Тут мы можем слудить какие вообще события добавлены для нашего элемента, добавляя их в какую то системную переменную
    
    //    this.$$listeners = { // Тут Каждый раз создаём как новый обьект поэтому не всё удаляется корретно, перепишем
    //        [eventType]: callback // [eventType] - это ключ, Это относится к bind
    //    }
       
        // this.$$listeners[eventType] = callback // Опять же из за bind; Так сделали так как это уже обьект и его не надо заного постоянно создавать, просто добавляем в него новый ключ

       this.$el.addEventListener(eventType, callback) // И Это доп обёртка ! 
    }

    del(eventType, callback) {
        this.$el.removeEventListener(eventType, callback) 

    }

    // Element ; (node) - Element в JS
    append(node) { // Миниполифил !
        if (node instanceof Dom) { // Если node является инстансом класса DOM 
            node = node.$el // И если на вход попадёт нативный элемент , данная проверка не пройдёт
        } 
        // Polyfill
        if (Element.prototype.append) { // Если такой метод присутствует в базовом классе элемент то тогда будем использовать его
            this.$el.append(node) // Тут в append получаенм инстанс класса DOM ; bug [object Object] Нативные append и appendChild работают так не с классами, а с элементами
            // this.$el.append(node.$el) // Так делать неверно, вдруг заходим заапендить нативную ноду, у неё не будет $el и будет bug
        } else {
            this.$el.appendChild(node)
            // this.$el.appendChild(node.$el)
        }
        return this // Для того чтобы могли продолжать делать chain 
    }
        // console.log(node)
        // console.log(node.$el)
    // Если падает приложение, то Комментим тот элемент, который делает хз чо, тут это append(node)

} // Это чтобы каждый раз не писать document при создании

// event target К примеру тоже как и все остальные будем передавать в конструктор

// $('div').html('<h1>Test</h1>').clear() // clear() пока что нет; смотри строку 15 Тут и делается chain !

export function $(selector) { // как в jquery; selector сюда передаём или уже готовую ноду
    return new Dom(selector) // Сперва тут добавили, потом в класс выше
}
// в 14 ой строчке для неё же создадим статический метод create
$.create = (tagName, classes = '') => { // С этой функцией в основном будет вестить работа с DOM элементами и шаблоном
    const el = document.createElement(tagName) // Тут без $ так как просто обращаемся к этому document.createElement() и тут создаём этот эл по тегу который передавали
    if (classes) { // если они есть и отлично от пустой строки как описано выше
        el.classList.add(classes) // el ту будем тут добавлять в + случае классы
    } // Весь $.create просто статический метод ! Пока что кроме него тут ничего нету
    // return el // Дабы ошибок не было обернём в функцию, т.к. щас el никуда не передаётся
    return $(el) // Обернули в функцию теперьбб передаётся в class Dom
} 