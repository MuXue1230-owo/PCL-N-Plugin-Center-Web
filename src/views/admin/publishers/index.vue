<template>
  <EntityTablePage
    eyebrow="Admin Workspace"
    title="发布者组织"
    description="查看组织状态、标识与创建时间。停用、恢复和成员管理将通过管理 API 完成。"
    table="plugin_center_publisher_organizations"
    order-by="created_at"
    :columns="columns"
    primary-action="创建组织"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "display_name", label: "组织", minWidth: 200 },
  { prop: "slug", label: "Slug", minWidth: 180 },
  { prop: "status", label: "状态", kind: "status" as const },
  { prop: "created_by", label: "创建人", minWidth: 190 },
  { prop: "created_at", label: "创建时间", kind: "date" as const, minWidth: 180 }
];
</script>
