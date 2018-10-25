// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

//1.導入組件(定義路由組件)
// 可以從其他文件 import 進來
import Goods from "./components/Goods/Goods"
import Ratings from "./components/Ratings/Ratings"
import Seller from "./components/Seller/Seller"


Vue.config.productionTip = false

//安裝vue-router插件
Vue.use(VueRouter);

//2.定義路由
// 每個路由應該映射一個組件。 其中"component" 可以是
// 通過 Vue.extend() 創建的組件構造器，
// 或者，只是一個組件配置對象。
// 我們晚點再討論嵌套路由。
const routes = [
	{
		path: '/',
		//重定向
		redirect: '/goods'
	},
	{
		path:'/goods',
		component: Goods
	},
	{
		path:'/ratings',
		component: Ratings
	},
	{
		path:'/seller',
		component: Seller
	}
]

// 3. 創建 router 實例，然後傳 `routes` 配置
// 你還可以傳別的配置參數
const router = new VueRouter({
	routes
})





/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4. 創建和掛載根實例
  router	//於3.已創建
})
