import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/Index'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        component: Home,
        children: [
          {
            name: 'posts',
            path: '/',
            component: () => import('@/views/Home/Posts')
          },
          {
            name: 'post',
            path: '/post/:id',
            component: () => import('@/views/Home/Post')
          },
          {
            name: 'archives',
            path: '/archives',
            component: () => import('@/views/Home/Archives')
          },
          {
            name: 'tags',
            path: '/tags',
            component: () => import('@/views/Home/Tags')
          },
          {
            name: 'tag',
            path: '/tag/:tag',
            component: () => import('@/views/Home/Tag')
          },
          {
            name: 'about',
            path: '/about',
            component: () => import('@/views/home/About')
          }
        ]
      },
      {
        name: '404',
        path: '/404',
        component: () => import('@/views/404')
      },
      { path: '*', redirect: '/404' }
    ]
  })

  return router
}
