<template>
  <div class="approve-module">
    <div class="btns-wrap">
      <el-button type="primary" @click="handleApprove('increase')">新建</el-button>
    </div>
    <el-table
      :data="table.tableBody"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <template v-for="header in table.tableHeader">
        <el-table-column
          v-if="header.key === 'selection'"
          :key="header.key"
          v-bind="Object.assign({}, header.options, header.layout)"
        >
        </el-table-column>
        <el-table-column
          v-else
          :key="header.key"
          :label="header.metas.label"
          v-bind="Object.assign({}, header.options, header.layout)">
          <template slot-scope="scope">
            <span v-if="header.metas.type === 'text'">{{scope.row[header.key]}}</span>
            <el-button-group v-else-if="header.metas.type === 'button'">
              <template v-for="btn in header.metas.value">
                <el-button :class="`btn-${btn.key}`" @click="handleApprove(btn.key, scope.row)" v-if="btn.attributes.visible" size="small" type="text" :key="btn.key" v-bind="btn.attributes">{{btn.label}}</el-button>
              </template>
            </el-button-group>
            <span v-else>{{header.metas.formatter(scope.row[header.key])}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-dialog :title="dialogForm.title" :visible.sync="dialogForm.visible">
      <el-form :inline="false" :ref="dialogForm.formRef" :model="dialogForm.form" :rules="dialogForm.rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="dialogForm.form.category" placeholder="请选择分类">
            <el-option label="年假" value="1"></el-option>
            <el-option label="病假" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="dialogForm.form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import http from '@/utils/http'

export default {
  INITFORMDATA: {
    name: '',
    category: '',
    description: '',
    status: false,
    latesttime: 0,
    createtime: 0,
    creator: {},
    modifier: {}
  },
  methods: {
    async init () {
      const res = await http.get('/approves')
      if (res.code === '200') {
        this.$set(this.table, 'tableBody', res.data)
      }
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    handleClick (row) {
      console.log(row)
    },
    handleApprove (type, initData) {
      this[`${type}Handle`](initData)
    },
    cancelOperate () {
      this.dialogForm = Object.assign(
        {},
        this.dialogForm,
        {
          visible: false,
          formRef: '',
          form: this.$options.INITFORMDATA
        }
      )
    },
    increaseHandle (initData = {}) {
      this.dialogForm = Object.assign(
        this.dialogForm,
        {
          visible: true,
          title: '新建',
          formRef: 'increaseForm'
        }
      )
    },
    editHandle (initData = {}) {
      this.dialogForm = Object.assign(
        this.dialogForm,
        {
          visible: true,
          title: '编辑',
          formRef: 'editForm',
          form: {
            ...initData
          }
        }
      )
    },
    dropHandle (initData = {}) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await http.delete(`/approves/${initData._id}`)
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.init()
        } else {
          throw(new Error('发生错误'))
        }
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: err.message || '已取消删除'
        });
      });
    },
    async submitForm () {
      try {
        const valid = this.$refs[this.dialogForm.formRef].validate()
        if (this.dialogForm.formRef === 'increaseForm') {
          const res = await http.post(
            '/approves',
            {
              ...this.dialogForm.form
            }
          )
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        } else {
          const { _id, name, category, description, status} = this.dialogForm.form
          const res = await http.patch(
            `/approves/${_id}`,
            {
              name,
              category,
              description,
              status
            }
          )
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }
        this.cancelOperate()
        this.init()
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      table: {
        tableHeader: [
          {
            key: 'selection',
            metas: {
            },
            options: {
              type: 'selection'
            },
            layout: {
            }
          },
          {
            key: 'name',
            metas: {
              label: '名称',
              type: 'text'
            },
            options: {
              'show-overflow-tooltip': true
            },
            layout: {
              width: 200
            }
          },
          {
            key: 'category',
            metas: {
              label: '类别',
              type: 'text'
            },
            layout: {
              width: 60
            }
          },
          {
            key: 'description',
            metas: {
              label: '描述',
              type: 'text'
            },
            options: {
              'show-overflow-tooltip': true
            },
            layout: {
            }
          },
          {
            key: 'creator',
            metas: {
              label: '创建人',
              type: 'object',
              formatter (val) {
                return val.alias || val.account
              }
            },
            layout: {
              width: 80
            }
          },
          {
            key: 'modifier',
            metas: {
              label: '更新人',
              type: 'object',
              formatter (val) {
                return val.alias || val.account
              }
            },
            layout: {
              width: 80
            }
          },
          {
            key: 'createtime',
            metas: {
              label: '创建时间',
              type: 'timestamp',
              formatter (val) {
                return moment(val).format('YYYY-MM-DD hh:mm')
              }
            },
            layout: {
              width: 150
            }
          },
          {
            key: 'latesttime',
            metas: {
              label: '更新时间',
              type: 'timestamp',
              formatter (val) {
                return moment(val).format('YYYY-MM-DD HH:mm')
              }
            },
            layout: {
              width: 150
            }
          },
          {
            key: 'operate',
            metas: {
              label: '操作',
              type: 'button',
              value: [
                {
                  key: 'edit',
                  label: '编辑',
                  attributes: {
                    visible: true,
                    disabled: false
                  }
                },
                {
                  key: 'drop',
                  label: '删除',
                  attributes: {
                    visible: true,
                    disabled: false
                  }
                }
              ]
            },
            layout: {
              fixed: 'right',
              width: 100
            }
          }
        ],
        tableBody: []
      },
      dialogForm: {
        visible: false,
        title: '',
        formRef: '',
        form: {
          name: '',
          category: '',
          description: '',
          status: false
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          description: []
        }
      }
    }
  },
  async created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
@import '~@/stylesheets/layout.scss';
@import './index.scss';
</style>
