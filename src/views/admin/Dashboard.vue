<template>
  <div class="dashboard">
    <admin-bread-crumb :pathList="this.$route.matched"></admin-bread-crumb>
  </div>
</template>

<script>
import AdminBreadCrumb from './components/AdminBreadCrumb'
export default {
  name: 'Dashboard',
  components: {
    AdminBreadCrumb
  }
}
</script>
