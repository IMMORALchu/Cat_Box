import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 手动引入element-plus的message组件样式
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      FooterShow: false
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/StatisticsView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/ScheduleView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/About',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/more/NewClothe',
    name: 'newClothe',
    component: () => import('../views/More/NewClotheView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/more/MakingClothe',
    name: 'MakingClotheView',
    component: () => import('../views/More/MakingClotheView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/more/My',
    name: 'MyView',
    component: () => import('../views/More/MyView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
  {
    path: '/more/Blogroll',
    name: 'BlogrollView',
    component: () => import('../views/More/BlogrollView.vue'),
    meta: {
      TabbarShow: true,
      FooterShow: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach( async (to, from, next) => {
  // 检查是否有cookie
  if (!document.cookie && to.path !== '/login') {
    // 没有cookie，跳转到登录页
    ElMessage.error('请先登录')
    next('/login')
  } else {
    // 有cookie，继续
    next()
  }
})


export default router
