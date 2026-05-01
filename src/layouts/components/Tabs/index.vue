<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    class="layout-tabs layout-tabs--glass-cards"
    @tab-remove="removeTab"
    @tab-click="handleTabClick"
    @contextmenu.prevent="handleTabsMenuParent($event)"
  >
    <!-- :closable="true" 显示关闭图标 -->
    <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="getClosable(item)">
      <!-- 加载图标 -->
      <template #label>
        <div
          class="tab-label-inner flex flex-justify-center flex-items-center select-none"
          @contextmenu.prevent="handleTabsMenuChildren(item.path, $event)"
        >
          <KoiGlobalIcon class="m-r-6px" v-show="item.icon" :name="item.icon" size="16"></KoiGlobalIcon>
          <div>{{ getMenuLanguage(item?.title) }}</div>
          <KoiSvgIcon v-if="item.isAffix === '1'" name="koi-affixed" width="16" height="16" class="m-l-4px"></KoiSvgIcon>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>

  <div>
    <TabMenu ref="tabMenuRef"></TabMenu>
  </div>
</template>

<script setup lang="ts">
import TabMenu from "@/layouts/components/Tabs/components/TabMenu.vue";
import Sortable from "sortablejs";
import { koiMsgWarning, koiMsgError } from "@/utils/koi.ts";
import { TabsPaneContext } from "element-plus";
import { nextTick, ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config/index.ts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
import useTabsStore from "@/stores/modules/tabs.ts";
import useAuthStore from "@/stores/modules/auth.ts";
import { getMenuLanguage } from "@/utils/index.ts";

// 获取当前路由
const route = useRoute();
// 路由跳转
const router = useRouter();
// 获取选项卡仓库
const tabsStore = useTabsStore();
// 获取权限仓库
const authStore = useAuthStore();

/** 页面创建后，立即初始化选项卡 AND 拖拽函数 */
onMounted(() => {
  addTab(); // 添加选项卡[进入根页面，立即添加首页]
  setActiveTab(); // 设置激活选项卡[进入根页面，立即激活首页]
  initTabs(); // 进入根页面，初始化需要固定的页面
  // 使用 nextTick 等待 DOM 渲染完成
  nextTick(() => {
    // 初始化拖拽功能
    tabsDrop();
  });
});

/** 监听当前路由，路由path发生变化添加选项卡数据 */
watch(
  () => route.fullPath,
  () => {
    // if (route.meta.isFull == "0") return;
    // 2、激活选择的选项卡
    setActiveTab();
    // 3、添加选项卡
    addTab();
  }
);

/** 1、初始化需要固定的 tabs[isAffix[配置固定tabs项]，在进入系统的时候，获取对应权限菜单数据，如果里面有固定tabs配置项，则进行添加] */
const initTabs = () => {
  authStore.menuList.forEach((item: any) => {
    if (item.meta.isAffix == "1" && item.meta.isVisible == "1") {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        isKeepAlive: item.meta.isKeepAlive,
        isAffix: "1" // 标记为固定
      };
      tabsStore.addTab(tabsParams);
    }
  });
};

/** 获取选项卡数据 */
const tabList = computed(() => {
  return tabsStore.getTabs;
});

/** 根据 isAffix 计算 closable 值 */
const getClosable = (item: any) => {
  // isAffix === "1" 时，closable = false（固定，不可关闭）
  // isAffix === "0" 时，closable = true（未固定，可关闭）
  return item.isAffix === "1" ? false : true;
};

/** 2、添加后激活选项卡 */
const activeTab = ref(route.fullPath);
const setActiveTab = () => {
  activeTab.value = route.fullPath;
};

/** 3、添加选项卡 */
const addTab = () => {
  // 解构路由数据
  const { meta, fullPath } = route;
  
  // 检查是否已存在该标签，如果已存在且已固定，保持固定状态
  const existingTab = tabsStore.tabList.find((item: any) => item.path === fullPath);
  const isAffixed = existingTab && existingTab.isAffix === "1";
  
  // 构造选项卡数据
  const tab = {
    icon: meta.icon,
    title: meta.title as string,
    path: fullPath,
    name: route.name as string,
    isKeepAlive: route.meta.isKeepAlive,
    isAffix: isAffixed ? "1" : (route.meta.isAffix || "0") // 保存固定状态
  };
  if (fullPath == HOME_URL) {
    // 如果是首页的话，就固定不可关闭。
    tab.isAffix = "1";
  }
  // 添加到选项卡仓库里面
  tabsStore.addTab(tab);
};

/** 4、移除选项卡 */
const removeTab = (fullPath: any) => {
  // 最后一个选项卡不被允许关闭
  const tabNumber = tabsStore.tabList.filter((item: any) => typeof item === "object").length;
  if (tabNumber === 1) {
    koiMsgWarning("到我的底线了，哼");
    return;
  }
  tabsStore.removeTab(fullPath as string, fullPath == route.fullPath, route.fullPath);
};

/** 5、点击切换选项卡 */
const handleTabClick = (tab: TabsPaneContext) => {
  const { props } = tab;
  // console.log(props.name); // 打印路由path
  // 将切换的选项卡进行添加路由操作
  router.push({ path: props.name as string });
};

/** 6、tabs 拖拽排序 */
const tabsDrop = () => {
  const el = document.querySelector(".el-tabs__nav");
  if (!el) {
    console.warn("Sortable 元素未找到，可能未渲染完成");
    return;
  }

  Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
    draggable: ".el-tabs__item",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabsStore.tabList];
      // 获取当前移动的索引的数据
      const currentRow = tabsList.splice(oldIndex as number, 1)[0];
      // 将 currentRow 元素插入到 tabsList 数组的指定位置 newIndex。0 是删除的元素数量，这里不需要删除任何元素
      tabsList.splice(newIndex as number, 0, currentRow);
      // 更新排序后的tabs仓库数据
      tabsStore.setTab(tabsList);
    }
  });
};

/** 7、右键菜单 */
const tabMenuRef = ref();
const handleTabsMenuParent = (value: any) => {
  if (tabMenuRef.value) {
    tabMenuRef.value.handleKoiMenuParent(value);
  } else {
    koiMsgError(t("msg.fail"));
  }
};

const handleTabsMenuChildren = (path: any, value: any) => {
  if (tabMenuRef.value) {
    tabMenuRef.value.handleKoiMenuChildren(path, value);
  } else {
    koiMsgError(t("msg.fail"));
  }
};
</script>

<style lang="scss" scoped>
.layout-tabs--glass-cards {
  /** 卡片头高度；须与下列 height:auto + min-height 配合，否则会与 header padding 抢空间导致标签不靠中 */
  --el-tabs-header-height: 42px;
  border-top: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-bg-color);

  :deep(.el-tabs__header) {
    margin: 0;
    height: auto !important;
    min-height: var(--el-tabs-header-height);
    padding: 0 6px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

  :deep(.el-tabs__nav-wrap) {
    display: flex;
    align-items: center;
    min-height: var(--el-tabs-header-height);
  }

  :deep(.el-tabs__nav-scroll) {
    display: flex;
    align-items: center;
  }

  :deep(.el-tabs__nav) {
    border: none !important;
    align-items: center;
  }

  :deep(.el-tabs__item) {
    height: 32px;
    margin: 0 5px !important;
    margin-top: 0 !important;
    padding: 0 12px !important;
    font-family: var(--el-font-family);
    font-size: var(--el-font-size-base);
    font-weight: 500;
    line-height: 32px;
    color: var(--el-text-color-primary);
    border: 1px solid var(--el-border-color) !important;
    border-radius: 8px !important;
    user-select: none;
    outline: none !important;
    box-shadow: none !important;
    box-sizing: border-box;
    background-color: transparent;

    .tab-label-inner {
      gap: 2px;
    }

    &.is-active {
      color: var(--el-color-primary);
      font-weight: 500;
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary) !important;
    }
  }

  :deep(.el-tabs__item:first-child) {
    margin-left: 2px !important;
  }

  /** 可滚动时仅保留略大于按钮宽度的内边距，避免标签被挡 */
  :deep(.el-tabs__nav-wrap.is-scrollable) {
    padding: 0 34px !important;
  }

  :deep(.el-tabs__nav-prev),
  :deep(.el-tabs__nav-next) {
    z-index: 2;
    width: 32px !important;
    height: 32px !important;
    border-radius: 8px !important;
    border: 1px solid var(--el-border-color) !important;
    box-sizing: border-box;
    background-color: var(--el-bg-color) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: var(--el-font-family);
    font-size: var(--el-font-size-base);
    line-height: 1 !important;
    color: var(--el-text-color-secondary);
    top: 50% !important;
    transform: translateY(-50%) !important;
    transition:
      color 0.15s ease,
      border-color 0.15s ease,
      background-color 0.15s ease;
  }

  :deep(.el-tabs__nav-prev) {
    left: 0 !important;
  }

  :deep(.el-tabs__nav-next) {
    right: 0 !important;
  }

  :deep(.el-tabs__nav-prev:not(.is-disabled):hover),
  :deep(.el-tabs__nav-next:not(.is-disabled):hover) {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary) !important;
    background-color: var(--el-fill-color-light);
  }

  :deep(.el-tabs__nav-prev.is-disabled),
  :deep(.el-tabs__nav-next.is-disabled) {
    opacity: 0.35;
    cursor: not-allowed;
  }

  :deep(.el-tabs__item:focus),
  :deep(.el-tabs__item:focus-visible),
  :deep(.el-tabs__item:focus-within) {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid var(--el-border-color) !important;
  }

  :deep(.el-tabs__item[aria-selected="true"]:focus),
  :deep(.el-tabs__item[aria-selected="false"]:focus) {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid var(--el-border-color) !important;
  }

  :deep(.el-tabs__item.is-active:focus) {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid var(--el-color-primary) !important;
  }
}
</style>
