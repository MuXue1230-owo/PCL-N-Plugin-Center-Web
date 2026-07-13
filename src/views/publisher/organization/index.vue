<template>
  <EntityTablePage
    eyebrow="Publisher Workspace"
    title="组织与命名空间"
    description="组织成员关系决定插件写入范围；命名空间验证后才可用于插件 ID。"
    table="plugin_center_publisher_members"
    select="role, created_at, organization:plugin_center_publisher_organizations(id, slug, display_name, status)"
    order-by="created_at"
    :columns="columns"
    primary-action="申请命名空间"
  />
</template>

<script setup lang="ts">
import EntityTablePage from "@/components/PluginCenter/EntityTablePage.vue";

const columns = [
  { prop: "organization.display_name", label: "组织", minWidth: 200 },
  { prop: "organization.slug", label: "Slug", minWidth: 180 },
  { prop: "role", label: "成员角色" },
  { prop: "organization.status", label: "组织状态", kind: "status" as const },
  { prop: "created_at", label: "加入时间", kind: "date" as const, minWidth: 180 }
];
</script>
