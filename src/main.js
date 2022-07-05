import Vue from 'vue'
import App from './App.vue'
//rem适配
import 'amfe-flexible'
// import router from './router'
// import store from './store'

//添加vant组件
import { Button } from 'vant';
// import './styles/index.less'


Vue.config.productionTip = false

Vue.use(Button)

new Vue({
  render: h => h(App),
}).$mount('#app')
