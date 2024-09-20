import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import adminRouter from '@/router/adminRouter'
import clientRoute from '@/router/index'
import { MotionPlugin } from '@vueuse/motion'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { browserLocalPersistence, setPersistence } from 'firebase/auth'
import { projectAuth } from './config/config'


let routes;

const subDomain = window.location.host.split('.')[0]

if(subDomain == 'admin'){
    routes = adminRouter
}
else{
    routes = clientRoute;
}


setPersistence(projectAuth, browserLocalPersistence)
.then(() => {
    createApp(App).use(ElementPlus).use(MotionPlugin).use(routes).mount('#app')

})
.catch(err => {
    console.log(err)
})

