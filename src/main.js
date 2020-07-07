import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

// router and routes
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

// cookies support
import VueCookies from "vue-cookies"
Vue.use(VueCookies)

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  BadgePlugin,
  InputGroupPlugin,
  FormInputPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  VBTooltipPlugin,
  ImagePlugin,
  AvatarPlugin,
  OverlayPlugin,
} from "bootstrap-vue";
[
  FormPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  IconsPlugin,
  BadgePlugin,
  InputGroupPlugin,
  FormInputPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  VBTooltipPlugin,
  ImagePlugin,
  AvatarPlugin,
  OverlayPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  image: localStorage.image,
  login(username, image) {
    localStorage.setItem("username", username);
    localStorage.setItem("image", image);
    this.username = username;
    this.image = image;
  },
  async logout() {
    try{
      // const response = await axios(
      //   "http://localhost:5001/logout",
      //   {withCredentials: true}
      // );

      const response = await axios.get(
        "https://famrecipe-backend.herokuapp.com/logout",
        {withCredentials: true}
      );

      if (response.status==200){
        localStorage.removeItem("username");
        localStorage.removeItem("image");
        this.username = undefined;
        this.image = undefined;
      }
    } catch(error){
      localStorage.removeItem("username");
      localStorage.removeItem("image");
      this.username = undefined;
      this.image = undefined;
    }
  },
  last_search: ""
};

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
