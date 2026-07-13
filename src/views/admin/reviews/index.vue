<template>
  <EntityTablePage
    eyebrow="Admin Workspace"
    title="审核队列"
    description="管理员按 RLS 成员身份读取全量提交；审核决定写入只允许受保护 API 执行并记录审计事件。"
    table="plugin_center_review_submissions"
    select="*, version:plugin_center_plugin_versions(version, package_sha256, plugin:plugin_center_plugins(plugin_id, display_name))"
    order-by="submitted_at"
    :columns="columns"
    primary-action="领取下一项"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "version.plugin.plugin_id", label: "插件 ID", minWidth: 220 },
  { prop: "version.version", label: "版本" },
  { prop: "status", label: "状态", kind: "status" as const },
  { prop: "version.package_sha256", label: "包哈希", minWidth: 220 },
  { prop: "submitted_at", label: "提交时间", kind: "date" as const, minWidth: 180 },
  { prop: "assigned_to", label: "审核人", minWidth: 190 }
];
</script>
