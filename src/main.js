import { createApp } from 'vue'
import './styles.scss'
import App from './App.vue'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

createApp(App).use(Vue3ColorPicker).mount('#app')
