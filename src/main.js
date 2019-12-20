import Vue from 'vue'
import App from './App.vue'
import AtComponents from 'at-ui'
import 'at-ui-style' // Import CSS

// const options = {
//   styles: {
//     width: '5px',
//     color: 'blue'
//   }
// }

Vue.use(AtComponents)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
