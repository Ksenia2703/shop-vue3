import {createRouter, createWebHistory} from 'vue-router'
import AppCatalog from "./components/AppCatalog";
import AppCart from "./components/AppCart";
import AppHome from "./components/AppHome";
import AppProductInNewWindow from "./components/AppProductInNewWindow";



export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/shop/catalog', component: AppCatalog},
        {path: '/shop/cart', component: AppCart},
        {path: '/shop', component: AppHome},
        {path: '/shop/catalog/:id',
            component: AppProductInNewWindow,}
    ],

    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})