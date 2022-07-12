import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from './store'
// import Vant from 'vant' 全部导入
// import 'vant/lib/index.css'
//rem适配
import 'amfe-flexible'
import './styles/index.less'

import './utils/dayjs'
// import store from './store'
// Vue.use(Vant)
//添加vant组件
import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog, Search, Tab, Tabs, List, PullRefresh, Popup } from 'vant';
// import './styles/index.less'


Vue.config.productionTip = false

Vue.use(Button)
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
