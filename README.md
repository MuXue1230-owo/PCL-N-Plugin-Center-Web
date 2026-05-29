<p align="center">
  <img src="https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp" width="120" height="120" alt="KOI-UI Logo" />
</p>

<h1 align="center">KOI-UI</h1>

<p align="center">
  <strong>开箱即用的 Vue 3 企业级中后台管理框架</strong><br/>
  简洁 · 现代 · 可扩展 · 纯前端可独立运行
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Element%20Plus-2.13-409EFF?style=flat-square&logo=element" alt="Element Plus" />
  <img src="https://img.shields.io/badge/Pinia-3.x-FFD859?style=flat-square&logo=pinia" alt="Pinia" />
  <img src="https://img.shields.io/badge/UnoCSS-66.x-333333?style=flat-square&logo=unocss" alt="UnoCSS" />
</p>

<p align="center">
  <a href="https://gitee.com/KoiKite/koi-ui">
    <img src="https://gitee.com/KoiKite/koi-ui/badge/star.svg?theme=white" alt="Gitee Star" />
  </a>
  <a href="https://gitee.com/KoiKite/koi-ui">
    <img src="https://gitee.com/KoiKite/koi-ui/badge/fork.svg?theme=white" alt="Gitee Fork" />
  </a>
</p>

<p align="center">
  <a href="http://39.107.143.109/login">在线演示</a> ·
  <a href="https://gitee.com/KoiKite/koi-ui">Gitee 仓库</a> ·
  <a href="https://github.com/KoiKite/koi-ui">GitHub 仓库</a>
</p>


---

## 项目简介

**KOI-UI** 是一款面向企业与个人开发者的 Vue 3 中后台管理模板。基于 **Vite 8 + Vue 3.5 + TypeScript + Element Plus** 构建，内置权限、路由、布局、主题、国际化等完整基建，代码结构清晰、注释完善，适合作为：

- 企业级管理后台脚手架
- 中小型项目快速启动模板
- 毕业设计 / 学习 Vue 3 生态的实战项目
- 前后端分离项目的标准前端层

相较于同类模板，KOI-UI 更强调 **「少递归、少魔法、好对接」**：后端菜单无需树形递归，前端扁平路由即可实现无限层级菜单与页面缓存；主题系统采用 **CSS 变量 + html class** 驱动，切换流畅、易于维护。

---

## 在线体验

| 版本 | 说明 | 地址 |
| --- | --- | --- |
| 纯前端演示 | 开源版，JSON 数据 | [http://39.107.143.109/login](http://39.107.143.109/login) |
| 前后端演示 | SpringBoot4 + Sa-Token 等 | [http://39.107.143.109/login](http://39.107.143.109/login) |
| 博客演示 | 博客 + 管理平台一体化 | [http://39.107.143.109:8188/home/index](http://39.107.143.109:8188/home/index) |
| 大屏案例一 | 数据可视化大屏 | [http://39.107.143.109:8199](http://39.107.143.109:8199) |
| 大屏案例二 | 数据可视化大屏 | [http://39.107.143.109:8111](http://39.107.143.109:8111) |

> 前后端版、博客版、大屏案例为付费授权版本，详情见文末「交流与授权」。

---

## 核心亮点

### 工程化

- **Vite 8 极速构建**：HMR、依赖预构建、Gzip 压缩、图片优化、SVG 雪碧图
- **TypeScript 全链路**：`vue-tsc` 类型检查，开发体验与可维护性兼顾
- **多环境配置**：development / test / production 独立 `.env` 管理
- **规范化提交**：集成 Commitizen + cz-git，统一 Git 提交信息

### 权限与路由

- **扁平化动态路由**：后端返回平铺菜单 JSON，前端自动注册路由，三级及以上页面仍支持 KeepAlive
- **按钮级权限**：`v-auth` 指令控制按钮显隐，对接后端权限码即可
- **路由守卫**：登录校验、白名单、动态路由懒加载、版本更新检测

### 布局与主题

- **9 种布局模式**：纵向、分栏、经典、混合、横向、渐变、毛玻璃等，移动端自适应
- **CSS 优先主题引擎**：布局色通过 `theme-vars.scss` + html class 切换，性能优于 JS 循环 `setProperty`
- **主题色阶自动生成**：基于 Element Plus 混色算法，一键切换品牌色及 light/dark 色阶
- **暗色 / 灰度 / 色弱 / 头部反转 / 侧边栏反转**：开箱即用，首屏无闪烁（localStorage 预恢复）

### 业务组件

- 二次封装 **Dialog / Drawer / Upload / Excel / Search** 等高频组件
- **SSE 实时通知**：消息推送、未读角标、贴边收缩面板
- **锁屏、全屏、多 Tab、面包屑、菜单搜索** 等管理端标配能力
- 集成 **ECharts 6**、**MD Editor**、**Driver.js** 引导、**Sortable** 拖拽

### 开发体验

- **UnoCSS 原子化样式**：与 SCSS 变量体系互补，快速搭建页面
- **Vue I18n 国际化**：中英文切换，菜单标题动态翻译
- **自定义指令**：防抖、节流、水印、复制、拖拽、表格高度自适应等
- **Axios 统一封装**：请求/响应拦截、加密解密可选、错误统一处理

---

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 核心框架 | Vue 3.5、Vue Router 5、Pinia 3 |
| 构建工具 | Vite 8、TypeScript 6、Sass |
| UI 组件 | Element Plus 2.13、@element-plus/icons-vue |
| 样式方案 | UnoCSS、SCSS 全局变量、theme-vars.scss |
| 网络请求 | Axios、SSE（EventSource） |
| 工具库 | VueUse、ECharts、md-editor-v3、crypto-js、sm-crypto |
| 持久化 | pinia-plugin-persistedstate |
| 国际化 | Vue I18n 11 |
| 其他 | animate.css、nprogress、driver.js、sortablejs |

---

## 功能模块

```
系统管理    用户 / 角色 / 菜单 / 部门 / 岗位 / 字典 / 通知 / 文件 / 图片 / 日志
系统监控    在线用户 / 定时任务 / 服务监控 / 缓存 / Redis / 黑名单
博客管理    文章 / 分类 / 标签 / 评论 / 友链 / 说说 / 文库（博客版）
工具模块    代码生成
数据大屏    Dashboard / Console / Analysis 多套可视化布局
其他        首页工作台、个人中心、内链 iframe、多种登录页样式
```

---

## 扁平化动态路由

传统方案中，后端需递归构造树形菜单，前端再二次递归生成路由，开发与联调成本较高。

KOI-UI 采用 **扁平菜单 + 前端组装** 方案：

1. 后端返回 **平铺数组**，每条记录含 `menuId`、`parentId`、`path`、`component` 等字段
2. 前端 `generateFlattenRoutes` 直接注册一级路由，菜单组件按 `parentId` 递归渲染
3. 三级及以上路由仍可通过 `keep-alive` 实现页面缓存

**后端菜单示例（无需递归）：**

```json
{
  "status": 200,
  "msg": "SUCCESS",
  "data": [
    {
      "menuId": 1,
      "menuName": "系统管理",
      "parentId": 0,
      "menuType": "1",
      "path": "/system",
      "name": "systemPage",
      "component": "",
      "icon": "Tools",
      "isVisible": "1",
      "redirect": "/system/user",
      "isKeepAlive": "0",
      "isTag": "1",
      "isAffix": "1"
    },
    {
      "menuId": 11,
      "menuName": "用户管理",
      "parentId": 1,
      "menuType": "2",
      "path": "/system/user",
      "name": "userPage",
      "component": "system/user/index",
      "icon": "UserFilled",
      "isVisible": "1",
      "isKeepAlive": "0",
      "isTag": "1",
      "isAffix": "1"
    }
  ]
}
```

对接后端时，只需保证字段格式一致，即可快速完成权限菜单联调。

---

## 主题与布局

### 布局模式（9 种）

| 布局 | 说明 |
| --- | --- |
| vertical | 经典左侧菜单 |
| columns | 双栏分栏菜单 |
| classic | 顶部 + 左侧组合 |
| optimum | 混合导航 |
| horizontal | 顶部横向菜单 |
| gradation | 渐变背景纵向 |
| gradation-columns | 渐变背景分栏 |
| frosted | 毛玻璃纵向（可换壁纸） |
| frosted-columns | 毛玻璃分栏 |

所有布局均支持 **PC / Pad / 移动端** 自适应，小屏自动切换 `LayoutMobile`。

### 主题能力

- 亮色 / 暗色模式
- 12 种预设主题色 + 自定义取色
- 头部 / 侧边栏颜色反转
- 灰色模式、色弱模式
- 主题配置面板实时预览，持久化至 localStorage

主题架构遵循 **「能 CSS 就不 JS」**：布局变量由 `theme-vars.scss` 管理，仅主题色阶通过 `themeColor.ts` 写入 Element Plus 所需的 `#RRGGBB` 变量。

---

## 项目结构

```
koi-ui/
├── build/                  # 构建插件（版本注入等）
├── public/                 # 静态资源
├── src/
│   ├── api/                # 接口定义
│   ├── assets/             # 图片、SVG 图标
│   ├── components/         # 全局业务组件（KoiDialog、KoiUpload…）
│   ├── config/             # 全局常量配置
│   ├── directives/         # 自定义指令（auth、debounce、waterMarker…）
│   ├── hooks/              # 组合式 Hooks（屏幕、SSE、字典）
│   ├── languages/          # 国际化语言包
│   ├── layouts/            # 布局组件与 ThemeConfig
│   ├── routers/            # 静态/动态路由
│   ├── stores/             # Pinia 状态（user、auth、global、tabs…）
│   ├── styles/             # 全局样式与 theme-vars
│   ├── utils/              # 工具函数（主题、路由、请求封装）
│   └── views/              # 页面视图
├── .env.development        # 开发环境变量
├── .env.test               # 测试环境变量
├── .env.production         # 生产环境变量
├── index.html              # 入口（含首屏主题预恢复脚本）
├── vite.config.ts
└── package.json
```

---

## 快速开始

### 环境要求

- Node.js >= 18
- 推荐使用 **pnpm**

### 安装与启动

```bash
# 全局安装 pnpm（可选）
npm install pnpm -g --registry=https://registry.npmmirror.com

# 克隆项目
git clone https://gitee.com/KoiKite/koi-ui.git
cd koi-ui

# 安装依赖
pnpm install

# 启动开发服务（默认 http://localhost:5730）
pnpm dev
```

### 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建（含类型检查） |
| `pnpm build:test` | 测试环境构建 |
| `pnpm build:prod` | 生产环境构建 |
| `pnpm type:check` | 仅 TypeScript 类型检查 |
| `pnpm preview` | 本地预览构建产物 |

---

## 环境变量

以 `.env.development` 为例：

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `VITE_ENV` | 运行环境标识 | `development` |
| `VITE_WEB_TITLE` | 站点标题 | `KOI-ADMIN` |
| `VITE_WEB_BASE_API` | 接口前缀 | `/dev-api` |
| `VITE_SERVER` | 代理目标地址 | `http://localhost:8088` |
| `VITE_ROUTER_MODE` | 路由模式 | `history` / `hash` |
| `VITE_DROP_CONSOLE` | 生产环境移除 console | `true` / `false` |
| `VITE_RESPONSE_ENCRYPT` | 响应数据加密 | `true` / `false` |
| `VITE_REQUEST_DECRYPT` | 请求数据解密 | `true` / `false` |

---

## 构建发布

```bash
# 开发构建
pnpm build

# 测试环境
pnpm build:test

# 生产环境（移除 console、启用压缩与图片优化）
pnpm build:prod
```

构建产物输出至 `dist/` 目录，可直接部署至 Nginx、OSS 或任意静态托管平台。

---

## 预览截图

<table>
  <tr>
    <td><img src="https://pica.zhimg.com/80/v2-6888b1d2c35f2db3772223ea805fdbde_720w.webp" alt="预览 1" /></td>
    <td><img src="https://pic2.zhimg.com/80/v2-205f28eba8f1c4b76d362e5e3617deed_720w.webp" alt="预览 2" /></td>
  </tr>
  <tr>
    <td><img src="https://gitee.com/KoiKite/koi-photo/raw/master/photos/KOI-ADMIN/KOI-VUE1.png" alt="KOI 1" /></td>
    <td><img src="https://gitee.com/KoiKite/koi-photo/raw/master/photos/KOI-ADMIN/KOI-VUE2.png" alt="KOI 2" /></td>
  </tr>
  <tr>
    <td><img src="https://gitee.com/KoiKite/koi-photo/raw/master/photos/KOI-ADMIN/KOI-VUE3.png" alt="KOI 3" /></td>
    <td><img src="https://gitee.com/KoiKite/koi-photo/raw/master/photos/KOI-ADMIN/KOI-VUE4.png" alt="KOI 4" /></td>
  </tr>
</table>


---

## 源码与支持

| 平台 | 地址 |
| --- | --- |
| Gitee（推荐） | [https://gitee.com/KoiKite/koi-ui](https://gitee.com/KoiKite/koi-ui) |
| GitHub | [https://github.com/KoiKite/koi-ui](https://github.com/KoiKite/koi-ui) |

如果 KOI-UI 对你有帮助，欢迎在 **Gitee** 或 **GitHub** 点个 **Star**，这是对我最大的鼓励。

---

## 交流与授权

| 版本 | 技术栈 / 内容 | 参考价格 |
| --- | --- | --- |
| 前后端版 | SpringBoot 4、JDK 17、Sa-Token 等 | 188 元 |
| 博客版 | 博客前台 + 管理平台 | 388 元 |
| 大屏案例 | 数据可视化大屏模板 | 150 元 / 套 |

> 加微信时请备注：**KOI-UI**。
>
> 作者闲暇时间有限，如有需要，接收个人定制咨询。

<table>
  <tr>
    <td align="center"><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/WeChat.png" alt="微信二维码" width="280" /></td>
    <td align="center"><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/WeChatPay.png" alt="微信支付" width="280" /></td>
  </tr>
</table>

---

<p align="center">
  Made with ❤️ by <a href="https://gitee.com/KoiKite/koi-ui">YuXin</a>
</p>
