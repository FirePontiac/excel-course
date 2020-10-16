// Тут буду храниться проверки скорее всего
export function shouldResize(event) {  // От IF ов в Table.js избавляемся таким образом
    return event.target.dataset.resize
}