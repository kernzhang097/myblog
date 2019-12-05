<template>
  <div class="admin">
    <el-container>
      <el-header>
          <admin-header></admin-header>
      </el-header>
      <el-container style="height: calc(100vh - 120px);">
        <el-aside>
          <admin-aside :current-path="currentPath"></admin-aside>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
      <el-footer>
        <div style="text-align:center;">&copy;Copyright 2019</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from './components/AdminHeader'
import AdminAside from './components/AdminAside'
export default {
  name: 'Admin',
  components: {
      AdminHeader,
      AdminAside
  },
  data(){
    return{
      currentPath: ''
    }
  },
  mounted(){
    this.currentPath = this.$route.name
  },
  updated(){
    this.currentPath = this.$route.name
  }
}
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #303133;
  color: #fff;
  // text-align: center;
  line-height: 60px;
  padding: 0 !important;
}

.el-aside {
  background-color: #303133;
  color: #333;
  border-right: 1px solid #ccc;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
