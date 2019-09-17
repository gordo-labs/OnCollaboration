import Vue from 'vue';
// import AudioVisual from 'vue-audio-visual';

import Wavesurfer from "wavesurfer.js/dist/wavesurfer";

import Plyr from 'plyr';

// Vue.use(AudioVisual);

Vue.prototype.$wavesurfer = Wavesurfer;
Vue.prototype.$plyr = Plyr;

Vue.prototype.$ua = window.navigator.userAgent;
Vue.prototype.$navigator = window.navigator;
