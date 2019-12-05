<template>
  <div class="add-post">
    <admin-bread-crumb :pathList="this.$route.matched"></admin-bread-crumb>
    <div class="container">
      <el-form ref="form" :model="post" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="post.abstract"
            maxlength="200"
            autosize
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <admin-editor v-model="post.content" v-if="flag"></admin-editor>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="save">保存</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>离开页面将不会保存修改</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AdminBreadCrumb from '../components/AdminBreadCrumb'
import AdminEditor from '../components/AdminEditor'
export default {
  name: 'AddPost',
  components: {
    AdminBreadCrumb,
    AdminEditor
  },
  data() {
    return {
      post: {
        title: '',
        abstract: '',
        content: ''
      },
      flag: true,
      dialogVisible: false
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.flag = false
      this.getCurrentArticle(this.$route.params.id)
    }
  },
  methods: {
    save() {
      const params = {
        account: localStorage.getItem('username'),
        title: this.post.title,
        content: this.post.content,
        abstract: this.post.abstract,
        id: this.$route.params.id ? this.$route.params.id : ''
      }
      this.$axios.post('/api/saveArticle', params).then(res => {
        if (res.data.status) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.$router.push('postList')
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    getCurrentArticle(id) {
      const account = localStorage.getItem('username')
      const params = {
        account: account,
        id: id
      }
      this.$axios.post('/api/getCurrArticle', params).then(res => {
        if (res.data.status) {
          const data = res.data.data[0]
          this.post.title = data.title
          this.post.abstract = data.abstract
          this.post.content = data.content
          this.flag = true
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    )
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
  margin-right: 40px;
}
</style>
