import Vue from 'vue'
import App from './App.vue'
import ProgressBar from 'progressbar-vue'
const options = {
  styles: {
    width: '5px',
    color: 'blue'
  }
}
Vue.use(ProgressBar, options)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
