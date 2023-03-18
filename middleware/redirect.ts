import { Pages } from "@/typings";

export default defineNuxtRouteMiddleware((to, from) => {
    if(!Object.values(Pages).includes(to.path.slice(1) as Pages)) {
        return navigateTo("/stock")
    }
    if(to.path === "/") {
        return navigateTo("/stock")
    }
});