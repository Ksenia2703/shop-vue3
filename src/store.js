import { createStore } from 'vuex'
import axios from "axios";


export default createStore({
    state: {
        //все товары из каталога
        products: [],
        //товары в корзине
        productsInCart: [],
        //индекс продукта (для поиска нужного товара)
        indexProductInArray: Number,
        //итоговое кол-во товаров в корзине
        totalCountProductInCart: Number,
        //состояние видимости модального окна после формы
        orderProcessed: false,
        //состояние видимости кнопки на модалке с формой
        sendFormData: false,
        //артикл по которому будем открывать карточку товара в новом окне
        articleForNewWindow: '',
        //объект который мы будем отрисовывать в новом окне
        productInNewWindow: {},
        //размер выбранного товара
        sizeSelectedProduct: '',
        //фильтрация по скидке (размер выбранной скидки)
        sizeSelectedDiscount: 0,
        //фильтрация по срокам доставки (выбранный срок доставки)
        selectedDeliveryTime: 5,
        // список продуктов подходящих по размеру выбранной скидки
        productsSuitableDiscount: [],
        //список товаров подходящих по сроку доставки
        productsSuitableDeliveryTime: [],
        // флаг который изменяется при выборе скидки
        filter: {},
        // opacity под модальными окнами
        opacity: false
    },
    getters: {
        getProducts: (state) => state.products,
        getProductsInCart: (state) => state.productsInCart,
        getProductsSuitableDiscount: (state) => state.productsSuitableDiscount,
        getProductInNewWindow: (state) => state.productInNewWindow,
        getSizeSelectedProduct: (state) => state.sizeSelectedProduct,
        getOrderProcessed: (state) => state.orderProcessed,
        getSendFormData: (state) => state.sendFormData,
        getArticleForNewWindow: (state) => state.articleForNewWindow,
        getProductByArticle: (state) => (article) => {
            return state.products.find(e => e.article === article)
        },
        getProductsByIndex: (state) => (article) => {
            return state.productsInCart.findIndex(e => e.article === article)
        },
        getProductsInCartSplice: (state) => (index) => {
            return state.productsInCart.splice(index, 1, )
        },
        getSizeSelectedDiscount: (state) => state.sizeSelectedDiscount,
        getSelectedDeliveryTime: (state) => state.selectedDeliveryTime,
        getProductsSuitableDeliveryTime: (state) => state.productsSuitableDeliveryTime,
        getIndexProductInArray: (state) => state.indexProductInArray
    },
    actions: {
        async fetchProducts({ commit }) {
            try {
                const data = await axios.get(
                    "https://shop-3f05d-default-rtdb.firebaseio.com/products.json"
                );
                commit("SET_PRODUCTS", data.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    mutations: {
        SET_PRODUCTS(state, users) {
            state.products = users;
        },

        SET_SEND_FORM_DATA(state, isSent) {
            state.sendFormData = isSent;
        },

        SET_ORDER_PROCESSED(state, isProcessed) {
            state.orderProcessed = isProcessed;
        },

        SET_OPACITY(state, opacity) {
            state.opacity = opacity;
        },

        SET_PRODUCTS_IN_CART(state, productsInCart) {
            state.productsInCart = productsInCart;
        },

        SET_ARTICLE_FOR_NEW_WINDOW(state, articleForNewWindow) {
            state.articleForNewWindow = articleForNewWindow;
        },

        SET_PRODUCT_IN_NEW_WINDOW(state, productInNewWindow) {
            state.productInNewWindow = productInNewWindow;
        },

        SET_SIZE_SELECTED_DISCOUNT(state, sizeSelectedDiscount) {
            state.sizeSelectedDiscount = sizeSelectedDiscount;
        },

        SET_SELECTED_DELIVERY_TIME(state, selectedDeliveryTime) {
            state.selectedDeliveryTime = selectedDeliveryTime;
        },

        SET_INDEX_PRODUCT_IN_ARRAY(state, indexProductInArray) {
            state.indexProductInArray = indexProductInArray;
        },

        DELETE_PRODUCT_FROM_CART(state, index) {
            state.productsInCart.splice(index, 1, );
        },

        SET_SIZE_SELECTED_DISCOUNT_OBJ(state, obj) {
            state.productsInCart.push(obj)
        },

        SET_SIZE_SELECTED_PRODUCT(state, sizeSelectedProduct) {
            state.sizeSelectedProduct = sizeSelectedProduct;
        },
    },
});