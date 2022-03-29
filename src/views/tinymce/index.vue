<template>
  <div class="tinymce-container-demo">
    <div>
      <tinymce v-model="content" :height="460" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>
.tinymce-container-demo{
  margin: 20px;
}

.editor-content{
  margin-top: 20px;
}
</style>

