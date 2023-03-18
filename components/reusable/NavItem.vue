<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const active = computed(() => {
    return route.params.name === props.to;
})
</script>

<template>
    <RouterLink class="nav-item" :class="{'nav-item--active': active}" :to="to">
        <img class="img" :src="path" alt="" />
        <text class="name">{{ name }}</text>
    </RouterLink>
</template>

<style lang="scss" scoped>
.nav-item {
    display: flex;
    flex-flow: column;
    align-items: center;
    text-decoration: none;
    gap: 7px;
    padding: 7px 23px;
    border-radius: var(--border-radius-small);
    transition: 0.3s;
    .name {
        color: var(--color-primary);
        font-weight: 500;
        font-size: 13px;
        line-height: 100%;
        margin-top: auto;
    }
    &:hover {
        background-color: var(--color-background);
    }
    &--active {
        background-color: var(--color-background);
    }
}
</style>