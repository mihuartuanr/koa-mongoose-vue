## 任务

* Todo：定义路由
  * 个人设置
  * 公司设置
  * 审批
* Todo：样式技术选型
  * CSS Module
  * Scss
* Todo：个人设置页面布局
* Todo：Vuex
  * 引入Vuex--存储用户信息
  * 持久化

## 路由vue-router

* 路由对应的组件展示位置由 **路由定义的位置** 决定
  * 定义在`children`中，则匹配该路由的组件替换与父级组件同级的`<router-view />`
* 路由的匹配模式是由 **路由配置的`path`属性** 决定，与路由配置所属层级无关
  * `path`为绝对路径：完全匹配该路径即可（与父级路径无关）
  * `path`为相对路径：实际路径要承接父级路径

## NavMenu（element-ui）

* 该组件可以通过属性配置直接进行路由跳转
  * Menu Attribute：`:router="true"`
  * Menu-Item Attribute：`:route="{}"`

## Vuex

* 引入`Vuex`
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
```
* 持久化`vuex-persist`

持久化，页面刷新后仍可以访问vuex，不会丢失

```
import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  ...
  plugins: [vuexLocal.plugin]
})
```

## Message（Element-ui）

* `this.$message.error(res.msg)`在`res`为`undefined`的时候不会报js错误，而报`element-ui`的错误信息干扰调试
* 推荐使用`this.$message({})`
