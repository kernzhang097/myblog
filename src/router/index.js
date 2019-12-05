import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/admin/Dashboard'
import Admin from '../views/admin/Admin'
import Post from '../views/admin/post/Post'
import EditPost from '../views/admin/post/EditPost'
import PostList from '../views/admin/post/PostList'

Vue.use(VueRouter)

export const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: '/admin/dashboard',
    meta: {
      navName: '首页'
    },
    children: [{
        path: '/admin/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          navName: '仪表盘',
          icon: 'el-icon-s-platform'
        }
      },
      {
        path: '/admin/post',
        name: 'post',
        component: Post,
        meta: {
          navName: '文章',
          icon: 'el-icon-document',
          isView: true
        },
        children: [{
          path: '/admin/postList',
          name: 'postList',
          component: PostList,
          meta: {
            navName: '文章列表',
            icon: 'el-icon-document'
          }
        },
        {
          path: '/admin/editPost',
          name: 'editPost',
          component: EditPost,
          meta: {
            navName: '编辑文章',
            icon: 'el-icon-document-add'
          }
        }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router