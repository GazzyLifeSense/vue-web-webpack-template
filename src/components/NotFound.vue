<template>
  <div id="404DIV" style="min-width: 100vw !important; font-size: 0"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"

const Remote404ScriptUrl = "https://volunteer.cdn-go.cn/404/latest/404.js"
onMounted(() => {
  let s = document.createElement("script")
  s.src = Remote404ScriptUrl
  s.setAttribute("rendertarget", "404DIV")
  document.head.appendChild(s)
})
</script>
