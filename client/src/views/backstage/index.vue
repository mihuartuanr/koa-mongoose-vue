<template>
  <el-container>
    <el-aside>
      <el-menu
        default-active="1"
        class="backstage-menu"
        :router="true"
        :unique-opened="true">
        <el-menu-item index="1" :route="{
          path: '/backstage/person'
        }">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人设置</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2" :route="{
          path: '/backstage/company'
        }">
          <i class="el-icon-menu"></i>
          <span slot="title">企业信息</span>
        </el-menu-item>
        <el-menu-item index="3" :route="{
          path: '/backstage/approve'
        }">
          <i class="el-icon-document"></i>
          <span slot="title">审批</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
