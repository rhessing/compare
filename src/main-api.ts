import Vue from 'vue';
import App from '@/views/App.vue';
import { getMapConfig } from './map-config';

async function startApp() {
  const mapConfig = await getMapConfig();

  new Vue({
    render: (h) => h(App, {
      props: {
        isBuiltForApi: true,
        mapConfig,
      },
    }),
  }).$mount('#app');
}

startApp();
