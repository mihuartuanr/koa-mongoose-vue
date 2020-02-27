import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import HomePage from '@/views/homepage'
import BackStage from '@/views/backstage'
import PersonalPanel from '@/views/personal-panel'
import CompanyPanel from '@/views/company-panel'
import ApprovePanel from '@/views/approve-panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/backstage',
          name: 'BackStage',
          component: BackStage,
          children: [
            {
              path: '',
              name: 'personalPanel',
              component: PersonalPanel
            },
            {
              path: 'person',
              redirect: '/backstage'
            },
            {
              path: 'company',
              name: 'companyPanel',
              component: CompanyPanel
            },
            {
              path: 'approve',
              name: 'approvePanel',
              component: ApprovePanel
            }
          ]
        }
      ]
    }
  ]
})
