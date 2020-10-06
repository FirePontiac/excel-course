//import './module'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

import './scss/index.scss'

const excel = new Excel('#app', { // #app - Пока что просто селектор для того чтобы можно было тестировать id="app" в html подключено
    components: [Header, Toolbar, Formula, Table] // Тут можно менять контент и наполнение страницы
}) 

excel.render()

// А уже после рендера надо вызыввать методы initDOMListeners() {
//console.log('Excel', excel)

// console.log('Working !')