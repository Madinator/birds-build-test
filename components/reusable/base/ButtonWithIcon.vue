<script lang="ts" setup>
const props = defineProps({
    image: {
        type: String,
        required: true
    },
})
</script>

<template>
    <button class="button-with-icon">
        <img :src="image" alt="" />
    </button>
</template>

<style lang="scss" scoped>
.button-with-icon {
    background-color: inherit;
    padding: 12.5px;
    width: fit-content;
    border-radius: var(--border-radius-small);    
}
</style>