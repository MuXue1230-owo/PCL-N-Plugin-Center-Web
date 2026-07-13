<template>
  <EntityTablePage
    eyebrow="Admin Workspace"
    title="用户"
    description="用户身份来自 Supabase Auth；此处只展示独立 profile，权限不读取可修改的 user_metadata。"
    table="plugin_center_profiles"
    order-by="created_at"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "display_name", label: "显示名称", minWidth: 180 },
  { prop: "github_login", label: "GitHub", minWidth: 160 },
  { prop: "user_id", label: "用户 UUID", minWidth: 260 },
  { prop: "created_at", label: "首次登录", kind: "date" as const, minWidth: 180 }
];
</script>
