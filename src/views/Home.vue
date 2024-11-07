<template>
    <HomeBanner/>
    <HomeProduct/>
</template>
<script>
import router from '@/router';
import HomeBanner from '../components/Home/HomeBanner.vue'
import HomeProduct from '../components/Home/HomeProduct.vue'
import { onMounted } from 'vue';
export default {
    name: 'Home',
    components: {
        HomeBanner,
        HomeProduct        
    },
    setup() {
        onMounted(async () => {
            try {
                window.scrollTo(0, 0)
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
    }
}
</script>
<style lang="css">
    
</style>