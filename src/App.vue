<template>
  <div id="app">
    <router-view />
    <router-view name="a" />
  </div>
</template>

<style lang="scss">
#app, body, html{
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
