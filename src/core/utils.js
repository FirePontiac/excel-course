// Тут юудем хранить наболее функци не привязанных к конкретному участку кода, но которые можно переиспользовать
// Pure Functions Concept
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    } // Таким образом уверены что отсюда всегда возвращается строчка
    return string.charAt(0).toUpperCase() + string.slice(1) // charAt() метод получения символа по индексу (0 -позиция 1 ой буквы нужна); slice(1) удаляем 1 символ от приплюсованного остатка
} // Таким образом получили onInput and onClick
