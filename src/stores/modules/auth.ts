import { defineStore } from "pinia";
import { staticRouter } from "@/routers/modules/staticRouter";
import authMenu from "@/assets/json/authMenu.json";
import { generateRoutes, generateFlattenRoutes } from "@/utils/filterRoute.ts";
import { getShowStaticAndDynamicMenuList, getAllBreadcrumbList } from "@/utils/index.ts";
import { supabase } from "@/lib/supabase";

const authStore = defineStore("auth", {
  state: (): any => ({
    menuList: [],
    recursiveMenuList: [],
    breadcrumbList: [],
    roleList: [],
    buttonList: [],
    isAdmin: false,
    loginUser: {
      userId: "",
      loginName: "",
      email: "",
      avatar: ""
    }
  }),
  actions: {
    async resolveIdentity() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) throw error ?? new Error("Supabase session is unavailable.");

      const user = data.user;
      const { data: adminMembership, error: adminError } = await supabase
        .from("plugin_center_admin_members")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      if (adminError) throw adminError;

      this.isAdmin = Boolean(adminMembership);
      this.roleList = adminMembership ? ["publisher", adminMembership.role] : ["publisher"];
      this.buttonList = [];
      this.loginUser = {
        userId: user.id,
        loginName: user.user_metadata?.user_name ?? user.user_metadata?.name ?? user.email ?? "PCL.N 用户",
        email: user.email ?? "",
        avatar: user.user_metadata?.avatar_url ?? ""
      };
    },
    async listRouters() {
      await this.resolveIdentity();
      const visibleMenu = (authMenu.data as any[]).filter(
        item => item.workspace !== "admin" || this.isAdmin
      );
      this.menuList = generateFlattenRoutes(visibleMenu);
      this.recursiveMenuList = getShowStaticAndDynamicMenuList(staticRouter).concat(
        generateRoutes(getShowStaticAndDynamicMenuList(visibleMenu), 0)
      );
      this.breadcrumbList = staticRouter.concat(generateRoutes(visibleMenu, 0));
    },
    async getLoginUserInfo() {
      if (!this.loginUser.userId) await this.resolveIdentity();
    }
  },
  getters: {
    getButtonList: state => state.buttonList,
    getMenuList: state => state.menuList,
    showMenuList: state => state.recursiveMenuList,
    getBreadcrumbList: state => getAllBreadcrumbList(state.breadcrumbList)
  }
});

export default authStore;
