import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


// import primevue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
// import Badge from 'primevue/badge';
// import OverlayBadge from 'primevue/overlaybadge';
// import Dialog from 'primevue/dialog';
// import Button from 'primevue/button';
// import InputText from 'primevue/inputtext';
// import Avatar from 'primevue/avatar';


app.use(PrimeVue,
    {
    theme: {
        preset: Aura
    }
}
);  
// app.component('Badge', Badge);
// app.component('OverlayBadge', OverlayBadge);
// app.component('Dialog', Dialog);
// app.component('Button', Button);
// app.component('InputText', InputText);
// app.component('Avatar', Avatar);

