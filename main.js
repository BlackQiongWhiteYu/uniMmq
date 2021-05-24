import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
App.mpType = 'app'

import globol from "./utils/methods.js"
Vue.prototype.routerDefend = globol.routerDefend

import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
