<template>
  <div class="admin-editor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'AdminEditor',
  props: {
    value: {
      type: String
    }
  },
  data(){
      return{
          editor: null
      }
  },
  mounted(){
      this.editor = new E(this.$refs.editorElem)
      this.editor.customConfig.onchange = html => {
        this.$emit('input', html)
        };
      this.editor.create()
      this.editor.txt.html(this.value)
  },
  methods:{}
}
</script>

<style lang="scss" scoped></style>
