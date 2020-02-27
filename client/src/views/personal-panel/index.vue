<template>
  <div class="panel-container">
    <div class="panel-avatar">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <ul class="panel-main">
      <li class="panel-item">
        <label class="panel-item-lanel">帐号：</label>
        <span class="panel-item-value">{{loginer.account}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">昵称：</label>
        <span class="panel-item-value">{{loginer.alias}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">邮箱：</label>
        <span class="panel-item-value">{{loginer.email}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">电话：</label>
        <span class="panel-item-value">{{loginer.telephone}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">部门：</label>
        <span class="panel-item-value">{{JSON.stringify(loginer.department)}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">职位：</label>
        <span class="panel-item-value">{{loginer.job}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">所属角色：</label>
        <span class="panel-item-value">{{loginer.role}}</span>
      </li>
      <li class="panel-item">
        <label class="panel-item-lanel">帐号：</label>
        <span class="panel-item-value">{{loginer.account}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import http from '@/utils/http'

export default {
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = /^image\//.test(file.type)
      const isLt2M = file.size / 1024 / 1024 / 10 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    }
  },
  data () {
    return {
      imageUrl: '',
      loginer: {}
    }
  },
  async created () {
    const { id } = this.$store.state.loginer
    const res = await http.get(`/users/${id}`)
    if (res.code === '200') {
      this.loginer = res.data
    } else {
      this.$message({
        type: 'error',
        message: '获取用户信息失败'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
