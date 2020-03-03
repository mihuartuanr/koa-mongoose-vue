<template>
  <el-container class="page-container">
    <el-header class="page-header">
      <div class="page-brand" @click="backToHome">
        <figure class="page-logo-wrap">
          <img class="page-logo" src="../../assets/logo.png" alt="">
        </figure>
        <h2 class="page-title">Vue</h2>
      </div>
      <el-menu :default-active="activeIndex" class="page-menu" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
      <div class="page-controls-wrap">
        <el-dropdown @command="handleDropdown">
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>{{user}}</el-dropdown-item>
            <el-dropdown-item command='backstage'>后台管理</el-dropdown-item>
            <el-dropdown-item command='logout'>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main class="page-main">
      <router-view/>
    </el-main>
  </el-container>
</template>
<script>
export default {
  methods: {
    backToHome () {
      this.$router.push({
        path: '/home'
      })
    },
    async logout () {
      this.$router.push('/')
      await localStorage.clear()
      this.$store.commit('resetVuex')
    },
    navigateToBackstage () {
      this.$router.push({
        path: '/backstage'
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleDropdown (command) {
      this['dropdownStrategies'][command]()
    }
  },
  data () {
    return {
      activeIndex: '1',
      dropdownStrategies: {
        'backstage': this.navigateToBackstage,
        'logout': this.logout
      }
    }
  },
  computed: {
    user () {
      if (this.$store.state.loginer) {
        const { account, alias } = this.$store.state.loginer
        return alias || account
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/stylesheets/layout.scss';

.page-container {
  height: 100%;
}

.page-header {
  @include flex($item: center, $content: space-between);
  background: #fff;
  border-bottom: 1px solid #eaeaea;

  .page-brand {
    @include flex($item: center, $content: space-between);
    cursor: pointer;

    .page-logo-wrap {
      width: 46px;
      height: 46px;

      .page-logo {
        max-width: 100%;
      }
    }
  }

  .page-menu {
    flex: 1;
    background: transparent;
    border: 0;
  }
}
</style>
