import Vue from 'vue';
// import AudioVisual from 'vue-audio-visual';

import Plyr from 'plyr';

// Vue.use(AudioVisual);

Vue.prototype.$plyr = Plyr;

Vue.prototype.$ua = window.navigator.userAgent;
Vue.prototype.$navigator = window.navigator;
