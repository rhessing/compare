import Vue from 'vue';
import App from '@/views/App.vue';
import { DefaultMapConfig } from './map-config';

new Vue({
  render: (h) => h(App, {
    props: {
      mapConfig: DefaultMapConfig,
    },
  }),
}).$mount('#app');
