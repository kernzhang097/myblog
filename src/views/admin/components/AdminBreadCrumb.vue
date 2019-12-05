<template>
  <div class="admin-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in list"
        :key="index"
        :to="
          item.isView || index == list.length - 1 ? false : { path: item.path }
        "
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'AdminBreadCrumb',
  props: {
    pathList: {
      type: Array
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.list = this.pathList.map(v => {
      return {
        name: v.meta.navName,
        path: v.path,
        isView: v.meta.isView || false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.admin-breadcrumb{
  margin-bottom: 20px;
}
</style>
