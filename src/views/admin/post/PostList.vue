<template>
  <div class="post-list">
    <admin-bread-crumb :pathList="this.$route.matched"></admin-bread-crumb>
    <div class="container">
      <el-table :data="postList" style="width: 100%" height="400">
        <el-table-column fixed prop="create_time" label="日期" min-width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="250">
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button @click="editPost(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deletePost(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import AdminBreadCrumb from '../components/AdminBreadCrumb'
export default {
  name: 'PostList',
  components: {
    AdminBreadCrumb
  },
  data() {
    return {
      postList: []
    }
  },
  mounted(){
    this.getArticle()
  },
  methods:{
    editPost(row){
      this.$router.push({name: 'editPost', params: {id: row.id}})
    },
    deletePost(row){
      const params = {
        id: row.id
      }
      this.$axios.post('/api/deleteArticle', params).then(res => {
        if(res.data.status){
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.getArticle()
        } else{
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    },
    getArticle(){
      this.postList = []
      const account = localStorage.getItem('username')
      this.$axios.get('/api/getArticle?account=' + account).then(res => {
        if(res.data.status){
          this.postList = res.data.data
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
