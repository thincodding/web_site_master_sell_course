import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '@/admin/AdminHome.vue'
import LoginView from '@/admin/LoginView.vue'
import SignupView from '@/admin/SignupView.vue'
import { projectAuth } from '@/config/config'
import DashbordView from '@/admin/DashbordView.vue'
import CategoryCourse from '@/admin/CategoryCourse.vue'
import ProductView from '@/admin/ProductView.vue'
import CategoryView from '@/admin/CategoryView.vue'
import AddCategory from '@/components/admin/AddCategory.vue'
import LessionView from '@/admin/LessionView.vue'

import MessageComponent from '@/components/admin/MessageComponent.vue'
import TestVue from '@/admin/TestVue.vue'
import PartnerView from '@/admin/PartnerView.vue'
import StudentRegiseterView from '@/admin/StudentRegiseterView.vue'
import BannerView from '@/admin/BannerView.vue'

const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  if(user){
    next();
  }
  else{
    next({name: 'login'})
  }
}

const checkIfUserAlreadyLogin = (to, from, next) => {
  const user = projectAuth.currentUser;

  if(user){
    next("/admin")
  }
  else{
    next();
  }
}
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: checkIfUserAlreadyLogin
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHome,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'dash',
        component: DashbordView
      },
      {
        path: 'category',
        name: 'category',
        component: CategoryCourse
      },
      {
        path: 'product',
        name: 'product',
        component: ProductView
      },
      {
        path: 'categoryList',
        name: 'categoryList',
        component: CategoryView
      },
      {
        path: 'addcategory',
        name: 'addcategory',
        component: AddCategory
      },
      {
        path: 'lession',
        name: 'lession',
        component: LessionView
      },
      {
        path: 'msg',
        name: 'msg',
        component: MessageComponent
      },
      {
        path: 'test',
        name: 'test',
        component: TestVue
      },
      {
        path: 'partner',
        name: 'partner',
        component: PartnerView
      },
      {
        path: 'student_register',
        name: 'student_register',
        component: StudentRegiseterView
      },
      {
        path: "banner",
        name: 'banner',
        component: BannerView,
      }
    ]
  },
 
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
  
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'bg-background text-white h-12 hover:text-white ',

})

export default router
