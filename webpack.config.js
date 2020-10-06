const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Добавление Режимов сборки проекта
const isProd = process.env.NODE_ENV === 'production' // Системная переменная; Для проверки корректной работы этой системной переменной длбавим пакет cross-env
const isDev = !isProd // npm i -D cross-env ; Эти 2 переменные тепеь отвечают за то в каком режиме разработки мы работаем
// в packge.json изменяем // было "start": "webpack",; в json добавили "start": "cross-env NODE_ENV=development webpack", и 9 ую тоже поменя строку


// console.log('IS PROD', isProd)
// console.log('IS DEV', isDev)

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}` // Для того чтобы убрать bundle.[hash].css например, чтобы без hash было, можно и isProd брать, без разницы

const jsLoaders = () => { // Она ничего не принимает, и возвращает по умолчанию
        const loaders  = [  // Добавили массив из 1 ого обьекта, у него loader и options
          {      
              loader: 'babel-loader', // Заботится о поддержке другими браузерами
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties'], // Это добавили для пооддержки нестандартных имён классов
              } 
            }
          ]

          if (isDev) { // Если щас режим разработки - то добавляем ещё 1 в массив лоадер
              loaders.push('eslint-loader')
          }

          return loaders // Возвращаем весь массив лоадеров, потом он применится в поле Use
}

module.exports = {
    context: path.resolve(__dirname, 'src'), // Webpack будет смотреть теперь  всё в папке src
    mode: 'development',
    entry: ['@babel/polyfill','./index.js'],// Так то тут обьект; Добавили полифилы, теперь должны в браузере работать async, await, bug ушёл, проблеммы со стилями остались
    output: {
        //  было filename: 'bundle.[hash].js', // Файл где находятся все JS скрипты; тут добавляются хеши : 'bundle.[hash].js'
        filename: filename('js'), // Таким образом в строке 14 создав уловие мы пользуемся режимами
        path: path.resolve(__dirname, 'dist') // dist тут уже конечный обьект
    },
    resolve: { // Тут настройки
        extensions: ['.js'], // По умолчанию грузим этот тип файлов
        // import '../../../core/Component' Вот чтобы не писать эти относительные пути, будет юзать alias
        
        alias: { // Тут описали теперь вчемто того что в 17 ой строке, будем писать import '@core/Component'
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    }, // После этого подгрузка лоадеров

    devtool: isDev ? 'source-map' : false, // Добавление 'source-map', как изначально и написали в requirements, смотри, читай документацию на Webpack раздел configuration Devtool
    // source-map добавляет оригинальные исходники чтобы проще было взаимодействовать
    // после выполнения npm run start появляется 2 новых файла: bundle.css.map и bundle.js.map
    // После этого подключения, подключаем npm install webpack-dev-server --save-dev и опять меняем json файл
    devServer: { // Добавили и json поменили webpack-dev-server
      // Для проверки сервака "start": "cross-env NODE_ENV=development webpack-dev-server --open", в json файле флаг --open и
      // Тут же команда в Терминал npm run start
      // Так тут при тесте этого кода вылетает ошибка в консоле в браузере Uncaught ReferenceError: regeneratorRuntime is not defined  Это отсылка к https://babeljs.io/docs/en/babel-polyfill Но впредь такие ошибки надо гуглить и смотреть на github или stackoverflow
      // Babel includes a polyfill that includes a custom regenerator runtime and core-js.
      // Добавляется полифил нетривиально смотри строку 20 entry: './index.js',
      port: 4200, // Как у AngularJS
      hot: isDev // Параметр применяемый в случае Dev режима
    },
    plugins: [ // В процессе разработки в режиме продакшн мода будем добавлять хеши, где избегания проблемм с кешированием
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html', // Настройка, откуда будем брать шаблон для HTML, чтобы плагин его самостоятельно не генерировал
            minify: {
              // removeComments: true, // В HTML удалить коменты
              // collapseWhitespace: true // В HTML удалить пробелы
              removeComments: isProd, // В HTML удалить коменты; в HTML минифицирует код; Так надо делать, быстрее грузится приложение
              collapseWhitespace: isProd // В HTML удалить пробелы
            }
          }), // Папку src не указывает, т.к. есть context: path.resolve(__dirname, 'src'),

        
          new CopyPlugin({ // Ох как я зае...лся когда первый плагин подключал
              patterns: [ // Используем для переноски фавикона
                { 
                  from: path.resolve(__dirname, 'src/favicon.ico'), 
                  to: path.resolve(__dirname, 'dist')  }, // в 'dist' для того чтобы вв процессе разработки тоже присутствовал этот файл
              ],
          }),

          // new CopyPlugin([ 
          //     { 
          //       from: path.resolve(__dirname, 'src/favicon.ico'), 
          //       to: path.resolve(__dirname, 'dist')  
          //     } // в 'dist' для того чтобы вв процессе разработки тоже присутствовал этот файл
          //   ]), // В идеале так должно работать

          new MiniCssExtractPlugin({
              filename: filename('css')
          })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i, // Проверка расширений
            use: [
            // MiniCssExtractPlugin.loader, Устаревшая конструкция, вместо неёё обьект
            {
              loader: MiniCssExtractPlugin.loader, 
              options: { // Добавляем 2 параметра: hot module replacement + reloader
                hmr: isDev, // Скомпоновав так, CSS не падает; ТУТ ES Lint Ещё не работает
                reloadAll: true
              }
            },
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },


          {
            // Было test: /\.m?js$/,
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders() // Тут через функцию получаем лоадеры
            }
          

// Если не заработает выше лоадер для babel то использовать этот для Webpack специально

// module: {
//     rules: [{
//       loader: "babel-loader",
//       options: {
//         rootMode: "upward",
//       }
//     }]
//   }



        ],
      },
    
}

// Так как ESLint не подключен напрямую в скриптах в json файле, то код не тестируется через эти правила, их можно потом подключить и применить вот так:
// В Json файл добавляем в поле "scripts": {
  // "lint": "eslint" Именно так, так как по иерархии файлов .eslint лежит в корне, А это проверка кода и вывод в консоль ошибок ! При подключеннм скрипте и установленных пакетах юзаем npm run lint и по идее он должен поррывать весь код, но не факт
  // "lint-fix": "eslint --fix" Фиксилка кода, npm run lint:fix
