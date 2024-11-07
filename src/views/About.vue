<template>
<!-- about section start -->
<div class="about_section layout_padding">
    <div class="container">
        <h1 class="watchs_taital">02<br>About Shop</h1>
        <div class="aboutDetails" v-for="(item, index) in filteredAboutDetails" :key="index">
            <div class="about_section_2">
                <div class="row">
                    <div class="col-md-6">
                        <p class="about_text">{{ item.description }}</p>
                        <!-- <div class="read_btn" @click="viewMore(item.id)">Buy Now</div> -->
                    </div>
                    <div class="col-md-6">
                        <div class="image_2"><img :src="`${imageUrl}/${item.image[0]}`" :alt="item.image[0]"></div>
                    </div>
                </div>
            </div>
            <div class="about_section_3">
                <div class="row">
                    <div class="col-md-3">
                        <div class="border_main">
                            <div class="image_4"><img :src="`${imageUrl}/${item.image[1]}`"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="border_main">
                            <div class="image_4"><img :src="`${imageUrl}/${item.image[2]}`"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="border_main">
                            <div class="image_4"><img :src="`${imageUrl}/${item.image[3]}`"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="border_main">
                            <div class="image_4"><img :src="`${imageUrl}/${item.image[4]}`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- about section end -->
</template>

<script>
// import router from '@/router';
import {
    useUserStore
} from '@/stores/users';
import {
    onMounted,
    computed,
    ref
} from 'vue';

export default {
    name: 'About',
    setup() {
        const store = useUserStore();
        const AboutDetails = ref([]);
        const imageUrl = import.meta.env.VITE_IMAGE_URL

        const filteredAboutDetails = computed(() => {
            return AboutDetails.value.filter(item => item.place === 'About Product');
        });
        
        onMounted(async () => {
            try {
                await store.fetchProducts();
                AboutDetails.value = store.getProducts;
            } catch (error) {
                console.error("There was an error fetching the products:", error);
            }
        });

            // const viewMore = (id) => {
            //     router.push({
            //         name: "SingleProduct",
            //         params: {
            //             id: id,
            //         },
            //     });
            // };

        return {
            filteredAboutDetails,
            imageUrl
            // viewMore
        }
    }

}
</script>

<style lang="css" scoped>

</style>
