<template>
  <EntityTablePage
    eyebrow="Publisher Workspace"
    title="审核记录"
    description="跟踪版本提交、审核分配、修改要求和最终决定。发布者只能读取自己组织的数据。"
    table="plugin_center_review_submissions"
    select="*, version:plugin_center_plugin_versions(version, plugin:plugin_center_plugins(plugin_id, display_name))"
    order-by="submitted_at"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "version.plugin.display_name", label: "插件", minWidth: 180 },
  { prop: "version.version", label: "版本" },
  { prop: "status", label: "审核状态", kind: "status" as const },
  { prop: "publisher_notes", label: "提交说明", minWidth: 240 },
  { prop: "decision_reason", label: "审核意见", minWidth: 240 },
  { prop: "submitted_at", label: "提交时间", kind: "date" as const, minWidth: 180 }
];
</script>
