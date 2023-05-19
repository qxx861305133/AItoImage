<template>
  <div id="app">
    <v-index msg="欢迎来到AI智能生成图片"/>
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    'v-index': Index
  }
}
</script>

<style>
</style>
