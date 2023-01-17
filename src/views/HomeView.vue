<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <el-row class="mb-4">
    <el-button @click="handleSetLanguage('zh')">中文</el-button>
    <el-button @click="handleSetLanguage('en')">英文</el-button>
    <el-button @click="handleSetLanguage('th')">泰国</el-button>
    <el-button @click="handleSetLanguage('vi')">越南</el-button>
  </el-row>
</template>

<script setup>
  import Cookies from "js-cookie";
  import { useAppStore } from '@/store/index.js' //store存放语言配置
  import { useI18n } from "vue-i18n";
  
  const { locale } = useI18n();
  const langstore = useAppStore();
  function handleSetLanguage(val) {
    locale.value = val;
    Cookies.set("lang", val);
    langstore.SET_LOCALE(val)
  }
  // 表格数据
  const tableData = []
</script>