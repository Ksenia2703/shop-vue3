/** @type {import('tailwindcss').Config} */
module.exports = {
    content:
        ["./src/App.vue",
            "./src/components/AppCatalog.vue",
            "./src/components/AppTotalPriceInCart.vue",
            "./src/components/AppCartItem.vue",
            "./src/components/AppProductInCart.vue",
            "./src/components/AppFilterProducts.vue",
            "./src/components/AppFormModal.vue",
            "./src/components/AppBuyModalWindow.vue",
            "./src/components/AppCart.vue",
            "./src/components/AppProductInNewWindow.vue",
            "./src/components/AppHome.vue",
            "./src/components/TheNavbar.vue"],
    theme: {
        extend: {
            boxShadow: {
                "custom": '0px 0px 50px 1px rgb(0 0 0 / 40%)'
            }
        },
    },
    plugins: [],
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
}
