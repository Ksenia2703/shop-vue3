import {createRouter, createWebHistory} from 'vue-router'
import AppCatalog from "./components/AppCatalog";
import AppCart from "./components/AppCart";
import AppHome from "./components/AppHome";
import AppProductInNewWindow from "./components/AppProductInNewWindow";



export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/shop/catalog/:id', component: AppProductInNewWindow},
        {path: '/shop/catalog/cart', component: AppCart},
        {path: '/shop/catalog', component: AppCatalog},
        {path: '/shop', component: AppHome},
    ],

    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})