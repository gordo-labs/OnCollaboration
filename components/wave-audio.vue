<template>
  <div id="waveform"></div>
</template>

<script>
    export default {
        name: "wave-audio",
        props:{
            input: ''
        },
        data: () => ({
            wavesurfer: WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple'
            })
        }),
        created() {
            this.wavesurfer.load(this.input);
        }
    }
</script>

<style scoped>

</style>
