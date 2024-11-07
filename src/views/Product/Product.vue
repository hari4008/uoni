<template>
<!-- background bg start -->
<div class="background_bg">
    <!-- watchs section start -->
    <div class="watchs_section layout_padding">
        <div class="container">
            <h1 class="watchs_taital">03<br>Our Watchs</h1>
            <div class="ProductDetails" v-for="(item, index) in filteredProductDetails" :key="index">
                <div v-if="index % 2 === 0">
                    <div class="watchs_section_2">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="image_2">
                                    <img :src="`${imageUrl}/${item.image[0]}`" :alt="item.image[0]">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h4 class="uni_text">{{ item.name }}</h4>
                                <p class="watchs_text">{{ item.description }}</p>
                                <h4 class="rate_text"><span style="color: #b60213;">₹ </span>{{ item.price }}</h4>
                                <div class="read_btn" @click="viewMore(item.id)">Buy Now</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="watchs_section_3">
                        <div class="row">
                            <div class="col-md-6">
                                <h4 class="uni_text">{{ item.name }}</h4>
                                <p class="watchs_text">{{ item.description }}</p>
                                <h4 class="rate_text"><span style="color: #b60213;">₹ </span>{{ item.price }}</h4>
                                <div class="read_btn" @click="viewMore(item.id)">Buy Now</div>
                            </div>
                            <div class="col-md-6">
                                <div class="image_2">
                                    <img :src="`${imageUrl}/${item.image[0]}`" :alt="item.image[0]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="seemore_bt"><a href="#">See More</a></div> -->
        </div>
    </div>
    <!-- watchs section end -->

</div>
<!-- background bg end -->
</template>

<script>
import router from '@/router';
import {
    useUserStore
} from '@/stores/users';
import {
    onMounted,
    computed
} from 'vue';
// import {
//     useRouter
// } from 'vue-router';

export default {
    name: 'Product',
    setup() {
        // const productDetails = ref([]);
        // const router = useRouter();
        const store = useUserStore();
        const imageUrl = import.meta.env.VITE_IMAGE_URL

        const productDetails = computed(() => store.getProducts);

        const categoriesToFilter = ['Main carousel', 'Regular', 'Hot deal', 'Week deal'];

        const filteredProductDetails = computed(() => {
            // Ensure the productDetails has been populated before filtering
            return productDetails.value.filter(item => categoriesToFilter.includes(item.place));
        });

        const viewMore = (id) => {
            router.push({
                name: "SingleProduct",
                params: {
                    id: id,
                },
            });
        };

        onMounted(async () => {
            try {
                store.fetchProducts();
                window.scrollTo(0, 0);
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push({
                        name: 'Login'
                    });
                }
            } catch (error) {
                console.error(error);
            }
        });

        return {
            productDetails,
            filteredProductDetails,
            imageUrl,
            viewMore
        }
    }
}
</script>

<style lang="css" scoped>

</style>
