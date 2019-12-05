<template>
  <div class="admin-header">
    <el-row :gutter="20">
      <el-col :span="21">
        <div style="display:flex;">
          <div style="width: 300px;text-align: center;">
            <img src="@/assets/images/logo.jpg" alt="">
          </div>
          <div></div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-dropdown>
          <span style="color: #fff;"><i class="el-icon-setting" style="margin-right: 15px;color: #fff;"></i>{{ userName }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><span @click="logout">退出</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {
      userName: localStorage.getItem('username')
    }
  },
  methods: {
    logout() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
