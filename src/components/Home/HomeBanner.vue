<template>
<div>
    <!-- banner section start -->
    <div class="banner_section layout_padding">
        <div id="main_slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <swiper class="swiper-container" :modules="modules" :slides-per-view="1" :space-between="50" :loop="true" :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    hideOnClick: false,
                    disabledClass: 'swiper-button-disabled',
                    hiddenClass: 'swiper-button-hidden'
                    }" @swiper="onSwiper" @slideChange="onSlideChange">
                    <swiper-slide v-for="(item, index) in filteredProductDetails" id="1">
                        <div class="carousel-item active">
                            <div class="container" style="display:flex">
                                <div class="col-md-6">
                                    <div class="image_2"><img :src="`${imageUrl}/${item.image[0]}`" :alt="item.image[0]"></div>
                                </div>
                                <div class="col-md-6" style="margin-top:5%">
                                    <h1 class="banner_taital">{{ item.name }}</h1>
                                    <p class="banner_text">{{ item.description }}</p>
                                    <div class="read_bt" @click="viewMore(item.id)">Buy Now</div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <div class="swiper-button-prev carousel-control-prev" role="button" data-slide="prev" @click="onSlideChange" style="font-size:24px; color: #fff;"></div>
                    <div class="swiper-button-next carousel-control-next" role="button" data-slide="next" @click="onSlideChange" style="font-size:24px;  color: #fff;"></div>
                </swiper>
            </div>
        </div>
    </div>
    <!-- banner section end -->
</div>
</template>

<script>
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y
} from 'swiper/modules';

import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {
    useUserStore
} from '@/stores/users';
import {
    onMounted,
    computed,
    ref
} from 'vue';
import router from '@/router';

export default {
    name: 'HomeBanner',
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const store = useUserStore();
        const productDetails = ref([]);
        const imageUrl = import.meta.env.VITE_IMAGE_URL

        const filteredProductDetails = computed(() => {
            // Ensure the productDetails has been populated before filtering
            return productDetails.value.filter(item => item.place === 'Main carousel');
        });

        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };

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
                await store.fetchProducts();
                productDetails.value = store.getProducts;
                console.log("productDetails.value",productDetails.value)
            } catch (error) {
                console.error("There was an error fetching the blogs:", error);
            }
        });

        return {
            filteredProductDetails,
            viewMore,
            onSwiper,
            onSlideChange,
            imageUrl,
            modules: [Navigation, Pagination, Scrollbar, A11y],
        };
    },

}
</script>

<style lang="css">

</style>
