<template>
  <div class="container">
    <div class="login">
      <h2 style="text-align:center;margin-left: 80px;">Login</h2>
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
          <el-button type="primary" @click="login">登陆</el-button>
          <p>
            还没有账号？点击<router-link to="/register">注册</router-link
            >一个吧！
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userInfo: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const params = {
        account: this.userInfo.account,
        password: this.$md5(this.userInfo.password)
      }
      this.$axios.post('/api/login', params).then(res => {
        if (res.data.status == true) {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          localStorage.setItem('username', this.userInfo.account)
          localStorage.setItem('token', res.data.token)
          this.$router.push({ path: '/admin' })
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

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(64,158,255,0.5);
  .login {
    width: 400px;
  }
}
</style>
