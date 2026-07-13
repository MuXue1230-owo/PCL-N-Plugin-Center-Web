<template>
  <div class="center-page">
    <header class="page-heading">
      <div>
        <el-tag v-if="eyebrow" size="small" effect="plain" round>{{ eyebrow }}</el-tag>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <div class="heading-actions">
        <el-button :loading="loading" @click="loadRows">刷新</el-button>
        <el-tooltip v-if="primaryAction" content="写入操作将在受保护 API 接入后开放" placement="bottom">
          <el-button type="primary" disabled>{{ primaryAction }}</el-button>
        </el-tooltip>
      </div>
    </header>

    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      :closable="false"
      class="data-alert"
    />

    <el-card shadow="never" class="table-card">
      <el-table v-loading="loading" :data="rows" stripe>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :label="column.label"
          :min-width="column.minWidth ?? 140"
        >
          <template #default="scope">
            <el-tag v-if="column.kind === 'status'" :type="statusType(valueAt(scope.row, column.prop))" effect="light" round>
              {{ statusLabel(valueAt(scope.row, column.prop)) }}
            </el-tag>
            <span v-else-if="column.kind === 'date'">{{ formatDate(valueAt(scope.row, column.prop)) }}</span>
            <span v-else class="cell-text">{{ valueAt(scope.row, column.prop) || "—" }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="当前权限范围内暂无数据" />
        </template>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "@/lib/supabase";

interface TableColumn {
  prop: string;
  label: string;
  minWidth?: number;
  kind?: "status" | "date";
}

const props = withDefaults(defineProps<{
  title: string;
  description: string;
  eyebrow?: string;
  table: string;
  select?: string;
  orderBy?: string;
  columns: TableColumn[];
  primaryAction?: string;
}>(), {
  select: "*",
  orderBy: "created_at",
  eyebrow: "",
  primaryAction: ""
});

const loading = ref(false);
const rows = ref<Record<string, any>[]>([]);
const errorMessage = ref("");

const loadRows = async () => {
  loading.value = true;
  errorMessage.value = "";
  const query = (supabase.from(props.table) as any)
    .select(props.select)
    .order(props.orderBy, { ascending: false })
    .limit(100);
  const { data, error } = await query;
  if (error) errorMessage.value = error.message;
  rows.value = data ?? [];
  loading.value = false;
};

const valueAt = (row: Record<string, any>, path: string) =>
  path.split(".").reduce((value, key) => value?.[key], row);

const formatDate = (value: unknown) => value
  ? new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(String(value)))
  : "—";

const statusLabel = (value: unknown) => ({
  draft: "草稿",
  uploaded: "已上传",
  scanning: "扫描中",
  needs_review: "待审核",
  pending: "待处理",
  in_review: "审核中",
  changes_requested: "需修改",
  approved: "已通过",
  rejected: "已拒绝",
  published: "已发布",
  suspended: "已停用",
  archived: "已归档",
  yanked: "已撤回",
  active: "正常"
})[String(value)] ?? String(value ?? "未知");

const statusType = (value: unknown): "success" | "warning" | "danger" | "info" | "primary" => {
  if (["approved", "published", "active"].includes(String(value))) return "success";
  if (["rejected", "suspended", "yanked"].includes(String(value))) return "danger";
  if (["pending", "in_review", "scanning", "needs_review", "changes_requested"].includes(String(value))) return "warning";
  return "info";
};

onMounted(loadRows);
</script>

<style scoped lang="scss">
.center-page { padding: 4px; }
.page-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 22px; }
.page-heading h1 { margin: 10px 0 8px; font-size: 26px; letter-spacing: -.02em; }
.page-heading p { max-width: 720px; margin: 0; line-height: 1.7; color: var(--el-text-color-secondary); }
.heading-actions { display: flex; gap: 10px; flex-shrink: 0; }
.data-alert { margin-bottom: 16px; }
.table-card { border-radius: 14px; }
.cell-text { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 760px) {
  .page-heading { flex-direction: column; }
  .heading-actions { width: 100%; }
}
</style>
