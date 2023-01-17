<template>
  <el-config-provider :locale="localeElement">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
  import { computed } from 'vue'
  import { useAppStore } from '@/store/index.js' //store存放语言配置
  import { langElementPlus } from "@/lang";
  const langstore = useAppStore();
  const localeElement = computed(() => langElementPlus(langstore.language))
</script>