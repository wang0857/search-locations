import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './scss/style.scss'
import App from './App.vue'

let l // Fixed the error of undefined 'l' in console log

createApp(App).mount('#app')
