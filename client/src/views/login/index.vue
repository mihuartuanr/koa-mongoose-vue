<template>
  <div class="page-login">
    <el-form :ref="formName" class="form-login" :model="form" :rules="rules">
      <el-form-item label="帐号" prop="account">
        <el-input v-model="form.account" placeholder="请输出帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输出密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin">登陆</el-button>
        <el-button type="primary" @click="onRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'
import http from '@/utils/http'

export default {
  name: 'Login',
  data () {
    return {
      formName: 'LoginForm',
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 5, message: '长度至少5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '长度至少3个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        const valid = await this.$refs[this.formName].validate()
        if (valid) {
          const { account, password } = this.form
          const res = await http.post(
            '/users?action=login',
            {
              account,
              password: md5(password).toString()
            }
          )
          if (res.data && res.data.code === '200') {
            this.$router.replace('/home')
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    async onRegister () {
      try {
        const valid = await this.$refs[this.formName].validate()
        if (valid) {
          const { account, password } = this.form
          const res = await http.post(
            '/users?action=register',
            {
              account,
              password: md5(password).toString()
            }
          )
          if (res.data.code === '200') {
            this.$refs[this.formName].resetFields()
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
