import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

createApp(App).use(store).use(router).mount("#app");
// axios({
//  baseURL: "http://123.207.32.32:8000",
//  url: "/home/multidata",
// }).then((res) => {
//  console.log(res);
// });
