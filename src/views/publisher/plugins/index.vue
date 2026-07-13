<template>
  <EntityTablePage
    eyebrow="Publisher Workspace"
    title="插件"
    description="查看当前发布者组织下的插件元数据、生命周期状态与当前公开版本。"
    table="plugin_center_plugins"
    order-by="updated_at"
    :columns="columns"
    primary-action="创建插件"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "plugin_id", label: "插件 ID", minWidth: 220 },
  { prop: "display_name", label: "名称", minWidth: 180 },
  { prop: "status", label: "状态", kind: "status" as const },
  { prop: "visibility", label: "可见性" },
  { prop: "current_version", label: "当前版本" },
  { prop: "updated_at", label: "更新时间", kind: "date" as const, minWidth: 180 }
];
</script>
