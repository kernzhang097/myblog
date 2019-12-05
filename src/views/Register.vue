<template>
  <div class="container">
    <div class="register">
      <h2 style="text-align:center;margin-left: 80px;">Register</h2>
      <el-form
        :model="userInfo"
        status-icon
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="userInfo.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userInfo.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item> </el-form
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      userInfo: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
        const params = {
          account: this.userInfo.account,
          password: this.$md5(this.userInfo.password)
        }
        this.$axios.post('/api/register', params).then(res => {
            if(res.data.status == true){
                this.$message({
                    message: res.data.message,
                    type: 'success'
                })
                this.$router.push({path: '/login'})
            } else{
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

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(64,158,255,0.5);;
  .register{
      width: 400px;
  }
}
</style>
