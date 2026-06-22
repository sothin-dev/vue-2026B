import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import BaseInput from './components/bases/BaseInput.vue'
import BaseRadio from './components/bases/BaseRadio.vue'
import BaseCheckBox from './components/bases/BaseCheckBox.vue'

const app = createApp(App)

app.use(router)
app.component('base-input', BaseInput);
app.component('base-radio', BaseRadio);
app.component('base-checkbox', BaseCheckBox);

app.mount('#app')
