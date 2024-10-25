import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { HttpError } from './api/HttpError'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, instance, info) => {
    console.error(err, instance, info); // log elsewhere in production
    if (err instanceof HttpError) { // generally - check if Error is appropriate for user's eyes
        alert(err.message);
    }
};

app.mount('#app')
