<template>
    <div class="MaskLayer" v-if="props.isMaskLayerVisible">

    </div>
</template>

<script setup lang="ts">
import {  } from 'vue';

const props = defineProps(['isMaskLayerVisible']);



</script>

<style lang="scss" scoped>
.MaskLayer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
