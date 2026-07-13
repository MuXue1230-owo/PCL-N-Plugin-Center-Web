<template>
  <EntityTablePage
    eyebrow="Publisher Workspace"
    title="版本"
    description="版本包在发布前依次经过上传、结构扫描、兼容性分析与人工审核。"
    table="plugin_center_plugin_versions"
    select="*, plugin:plugin_center_plugins(plugin_id, display_name)"
    order-by="created_at"
    :columns="columns"
    primary-action="上传 .pnp"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "plugin.display_name", label: "插件", minWidth: 180 },
  { prop: "version", label: "版本" },
  { prop: "channel", label: "通道" },
  { prop: "state", label: "状态", kind: "status" as const },
  { prop: "package_sha256", label: "SHA-256", minWidth: 220 },
  { prop: "created_at", label: "创建时间", kind: "date" as const, minWidth: 180 }
];
</script>
