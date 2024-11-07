<template>
<!-- background bg start -->
<div class="background_bg">
    <!-- single watchs section start -->
    <div class="watchs_section layout_padding">
        <div class="container">
            <h1 class="watchs_taital">Watch</h1>
            <div class="watchs_section_2">
                <div class="row">
                    <div class="col-md-6">
                        <div class="image_2">
                            <img :src="`${imageUrl}/${productDetails.image[0]}`" :alt="productDetails.image[0]" v-if="productDetails.image && productDetails.image.length > 0">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="uni_text">{{ productDetails.name }}</h4>
                        <p class="watchs_text">{{ productDetails.description }}</p>
                        <br>
                        <p class="watchs_text mt-2"><b style="color: #b60213;">Category :</b>{{ getCateName }}</p>
                        <h4 class="rate_text"><span style="color: #b60213;">₹ </span>{{ productDetails.price }}</h4>
                        <div class="card-input-count">
                            <button @click="decrement" class="increase items-count readCount_btn" type="button">
                                <i class="bi bi-dash"></i>
                            </button>
                            <input type="text" name="qty" id="sst" title="Quantity" class="input-text qty" v-model="quantity" readonly />
                            <button @click="increment" class="reduced items-count readCount_btn" type="button">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <button class="read_btn" @click="addToCart(productDetails.id,quantity, productDetails.price)">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- single watchs section end -->
</div>
<!-- background bg end -->
</template>

<script>
import router from '@/router';
import {
    useUserStore
} from '@/stores/users';
import Swal from 'sweetalert2';
import {
    onMounted,
    computed,
    ref
} from 'vue';
import {
    useRoute
} from 'vue-router';

export default {
    name: 'SingleProduct',
    setup() {
        const store = useUserStore();
        const route = useRoute();
        const productId = route.params.id;
        const quantity = ref(1);
        const imageUrl = import.meta.env.VITE_IMAGE_URL

        const productDetails = computed(() => store.getSingleProduct);
        const cateDetails = computed(() => store.getCategory)

        const increment = () => {
            quantity.value++;
        };
        const decrement = () => {
            if (quantity.value > 1) {
                quantity.value--;
            }
        };

        const addToCart = (id, quantity, price) => {
            console.log("addToCart", id, quantity, price);

            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === id);

            if (existingProductIndex === -1) {
                cart.push({
                    id,
                    qnty: quantity,
                    price
                });
                sessionStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            } else {
                // alert('Product is already in the cart!');
                Swal.fire("Product is already added in the cart!");
            }
        };

        // Use computed property for category name
        const getCateName = computed(() => {
            return cateDetails.value[0]?.category_name || 'Unknown';
        });

        onMounted(async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push({
                        name: 'Login'
                    });
                } else {
                    if (productId) {
                        console.log("000", productId);
                        console.log("22", productDetails.value.categ);
                        await store.fetchSingleProduct(productId);
                        await store.fetchCategorieById(productDetails.value.categ);
                        window.scrollTo(0, 0);
                    }
                }
            } catch (error) {
                console.error("There was an error fetching the product details:", error);
            }
        });

        return {
            productDetails,
            quantity,
            getCateName,
            increment,
            decrement,
            addToCart,
            imageUrl
        };
    }
}
</script>

<style lang="css" scoped>
.card-input-count {
    align-items: center;
}

.card-input-count button:hover {
    background-color: #ffffff;
    color: #000;
}

.card-input-count button:disabled {
    cursor: not-allowed;
}

.card-input-count input {
    width: 3rem;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem;
    margin: 0.5rem 0.5rem;
}

.card-input-count .bi {
    font-size: 1.2rem;
}
</style>
