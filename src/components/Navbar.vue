<template>
<!-- header section start -->
<div class="header_section">
    <div class="header_main">
        <div class="mobile_menu">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="logo_mobile">
                    <a href="index.html"><img src="../assets/images/logo.png" alt="Logo"></a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <!-- <li class="nav-item" active> -->
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/">HomeComp</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/about">About</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/product">Watches</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/testimonial">Testimonial</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/contact">Contact Us</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/search"><img src="../assets/images/search-icon.png" alt="Search"></RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/cart">
                                <i class="bi bi-cart3"></i>
                                <span class="badgebtn badge badge-dark">{{ cartLength }}</span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="container-fluid">
            <div class="logo">
                <a href="index.html"><img src="../assets/images/logo.png" alt="Logo"></a>
            </div>
            <div class="menu_main">
                <ul>
                    <!-- <li class="active"> -->
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/product">Watches</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/testimonial">Testimonial</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/contact">Contact Us</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/register">Register</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/login">Login</RouterLink>
                    </li>
                    <!-- <li>
                        <RouterLink to="/search"><img src="../assets/images/search-icon.png" alt="Search"></RouterLink>
                    </li> -->
                    <li>
                        <RouterLink to="/cart">
                            <i class="bi bi-cart3"></i>
                            <span class="badgebtn badge badge-dark">{{ cartLength }}</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- header section end -->
</template>

<script>
import {
    ref,
    watch,
    onMounted
} from 'vue';

export default {
    name: 'Navbar',
    setup() {
        const cartLength = ref(0);
        const cart = ref(sessionStorage.getItem('cart'));

        // Watch the cart ref for changes
        watch(cart, (newCart) => {
            if (newCart) {
                cartLength.value = JSON.parse(newCart).length;
            } else {
                cartLength.value = 0;
            }
        }, {
            immediate: true
        });

        onMounted(() => {
            console.log('Initial cartLength:', cartLength.value);
        });

        return {
            cartLength
        };
    }
}
</script>

<style scoped>
.bi-cart3 {
    font-size: x-large;
}

.badgebtn {
    position: absolute;
    border-radius: 50%;
    top: 82px;
    right: 308px;
    /* padding: 0.5em; */
}

.badgebtn:hover {
    background-color: white !important;
    color: black !important;
}
</style>
