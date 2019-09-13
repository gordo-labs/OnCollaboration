import Vue from 'vue';
import AudioVisual from 'vue-audio-visual';

import Wavesurfer from "wavesurfer.js/dist/wavesurfer";

Vue.use(AudioVisual);

Vue.prototype.$wavesurfer = Wavesurfer;
