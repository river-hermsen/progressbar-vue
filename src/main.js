import Vue from 'vue'
import App from './App.vue'
import ProgressBar from 'progressbar-vue'

Vue.use(ProgressBar)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
