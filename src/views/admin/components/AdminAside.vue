<template>
  <div class="admin-aside">
    <el-menu :default-active="currentPath" class="el-menu-vertical-demo" :router="true" background-color="#303133" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="(item, i) in adminMenu">
        <el-menu-item v-if="!item.children" :index="item.name" :key="i">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.navName}}</span>
        </el-menu-item>
        <el-submenu v-if="item.children" :index="item.name" :key="i">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.navName}}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.name"
            :index="child.name"
          >
            <i :class="child.meta.icon"></i>
            <span slot="title">{{child.meta.navName}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminAside',
  props: {
    currentPath: {
      type: String
    }
  },
  data() {
    return {
      adminMenu: JSON.parse(localStorage.getItem('adminMenu'))
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-aside {
  display: flex;
  flex-direction: column;
  .el-menu-vertical-demo {
    border-right: none;
    border-bottom: 1px solid rgb(96, 98, 102) !important;
    .el-submenu__title, .el-menu-item, li{
      border-top: 1px solid rgb(96, 98, 102) !important;
    }
    ul>li:last-child{
      border-bottom: 1px solid rgb(96, 98, 102) !important;
    }
    a {
      color: inherit;
      text-decoration: none;
      // span {
      //   padding-left: 10px;
      // }
    }
  }
}
</style>
