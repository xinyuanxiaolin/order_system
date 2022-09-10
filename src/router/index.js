import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import Header from "@/pages/Header";
import Home from "@/pages/Home";
import ShowDishDetail from "@/pages/ShowDishDetail";
import ShoppingCart from "@/pages/ShoppingCart";
import MyOrder from "@/pages/MyOrder";
import OwnInfo from "@/pages/OwnInfo";
import Login from "@/components/Login";
import BmsHome from "@/pages/BMS/BmsHome";
import ShowAdmin from "@/pages/BMS/ShowAdmin";
import ShowDish from "@/pages/BMS/ShowDish";
import ShowCategory from "@/pages/BMS/ShowDishCategory";
import ShowOrder from "@/pages/BMS/ShowOrder";

const router = new VueRouter({
  
  routes: [
    {
      path: "/index",
      component: Header,
      children: [
        {
          path: "home",
          component: Home,
        },
        {
          name:'detail',
          path: "detail/:dish",
          component: ShowDishDetail,
          props(route) {
            return {
              dish:route.params.dish
            }
          }
        },
        {
          path: "cart",
          component: ShoppingCart,
        },
        {
          path: "order",
          component: MyOrder,
        },
        {
          path: "info",
          component: OwnInfo,
        },
        {
          path: "/index",
          redirect: "home",
        },
      ],
    },

    {
      path: "/login",
      component: Login,
    },
    {
      path: "/bms",
      component: BmsHome,
      children: [
        {
          path: "admin",
          component: ShowAdmin,
        },
        {
          path: "dish",
          component: ShowDish,
        },
        {
          path: "category",
          component: ShowCategory,
        },
        {
          path: "order",
          component: ShowOrder,
        },
      ],
    },

    // 重定向,设置刚来的页面是主页
    {
      path: "/",
      redirect: "/index",
    },
  ],
});

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();

  const local_token = localStorage.token;
  if (!local_token) return next("/login");
  if (to.path === "/bms" && localStorage.admin === "0") {
    alert('您无权访问!')
    return next("/index");
  }
  

  next();
});

export default router;
