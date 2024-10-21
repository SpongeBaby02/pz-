import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import api from './api'

const app = createApp(App)

//在实例上绑定属性
app.config.globalProperties.$api = api 

router.beforeEach((to, from) => {

    //非登录页面token不存在     ======    没有注册保存过的账号和密码进入了后台，跳回登录页面
    if (to.path !== '/login'){
      if(!localStorage.getItem('h5_token')){
        return '/login'
      }
    }
  })
//路由挂载
app.use(router)
app.mount('#app')
