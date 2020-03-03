<template>
  <div class="panel-container">
    <div class="panel-avatar">
      <el-upload
        class="avatar-uploader"
        v-bind="uploadForm">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-user"></i>
      </el-upload>
    </div>
    <div class="panel-main">
      <h3 class="panel-title">{{loginer.alias || loginer.account}}</h3>
      <ul class="panel-content">
        <li class="panel-item">
          <label class="panel-item-lanel">帐号：</label>
          <span class="panel-item-value">{{loginer.account}}</span>
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
      </ul>
      <div class="panel-controls">
        <el-button class="btn-edit" type="default" @click="openFormDialog">编辑</el-button>
      </div>
    </div>
    <el-dialog :title="dialogForm.title" :visible.sync="dialogForm.visible">
      <el-form :ref="dialogForm.formRef" :model="dialogForm.form" :rules="dialogForm.rules">
        <el-form-item label="帐号" prop="account">
          <el-input v-model="dialogForm.form.account"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="alias">
          <el-input v-model="dialogForm.form.alias"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="dialogForm.form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input type="telephone" v-model="dialogForm.form.telephone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门" prop="department">
          <el-input v-model="dialogForm.form.department"></el-input>
        </el-form-item> -->
        <el-form-item label="职位" prop="job">
          <el-input v-model="dialogForm.form.job"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属角色" prop="job">
          <el-input v-model="dialogForm.form.job"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
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
    },
    openFormDialog () {
      this.dialogForm.visible = true
    },
    async submitForm () {
      try {
        const valid = await this.$refs[this.dialogForm.formRef].validate()
        if (valid) {
          const res = await http.patch(
            `/users/${this.userId}`,
            {
              ...this.dialogForm.form
            }
          )
          if (res.code === '200') {
            const { account, alias } = res.data
            this.$store.commit(
              'putLoginer',
              {
                account,
                alias
              }
            )
            this.loginer = Object.assign(
              {},
              this.loginer,
              {
                ...res.data
              }
            )
            this.$set(this.dialogForm, 'form', Object.assign(
              {},
              this.dialogForm.form,
              {
                ...res.data
              }
            ))
            this.dialogForm.visible = false
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  },
  data () {
    return {
      uploadForm: {
        action: `//localhost:3000/assets/avatars/${this.$store.state.loginer.id}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        multiple: false,
        'show-file-list': false,
        'on-success': this.handleAvatarSuccess,
        'before-upload': this.beforeAvatarUpload
      },
      imageUrl: '',
      loginer: {},
      dialogForm: {
        visible: false,
        title: '编辑',
        formRef: 'dialogForm',
        form: {
          account: '',
          alias: '',
          email: '',
          telephone: '',
          department: [],
          job: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 5, message: '长度至少5个字符', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度不能超过十五个字符', trigger: 'blur'}
          ],
          email: [
            { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {
              validator: (rule, value, cb) => {
                if (/^1[0-9]{10}$/.test(value)) {
                  cb()
                } else {
                  cb(new Error('手机号码格式错误'))
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  computed: {
    userId () {
      return this.$store.state.loginer.id
    }
  },
  async created () {
    const res = await http.get(`/users/${this.userId}`)
    if (res.code === '200') {
      this.loginer = res.data
      this.dialogForm.form = {...res.data}
      this.imageUrl = res.data.avatar;
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
@import '~@/stylesheets/layout.scss';
@import './index.scss';
</style>
