import Vue from 'vue'

import App from './App.vue'
// Main Style
import './assets/style/style.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
