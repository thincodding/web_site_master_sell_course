import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/productdetail/:id",
    name: "productdetail",
    component: () => import('../views/ProductDetailView.vue')
  },
  {
    path: "/test/:id",
    name: "test",
    component: () => import('@/components/client/TestClient.vue')
  },
  {
    path: "/courseDetail/:id",
    name: "courseDetail",
    component: () => import('@/views/CourseDetailView.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import('@/views/SignupView.vue')
  },
  {
    path: "/verify",
    name: "verify",
    component: () => import('@/views/VerifySuccess.vue')
  },
  {
    path: "/selectionCourse",
    name: "selectionCourse",
    component: () => import('@/components/client/SelectionCourse.vue')
  },
  {
    path: "/searchProduct/:id",
    name: "searchProduct",
    component: () => import('@/views/SearchProductDetail.vue')
  },
  {
    path: "/advisorRegister",
    name: "advisorRegister",
    component: () => import('@/views/AdvisorRegister.vue')
  }
]


const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
