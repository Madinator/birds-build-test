<script lang="ts" setup>
import { useBaseStore } from "@/store/base";
import { SellingTypes } from '@/typings/index';

const baseStore = useBaseStore();

const activeFilter = ref<SellingTypes>(baseStore.getActiveFilter);

const setActiveFilter = (filter: SellingTypes):void => {
    baseStore.setActiveFilter(filter);
    activeFilter.value = filter;
};

watchEffect(() => {
    activeFilter.value = baseStore.getActiveFilter;
})
</script>

<template>
    <ul class="filter-component">
        <li 
            class="filter-value" 
            v-for="filter in SellingTypes" 
            :class="{'filter-value--active': filter === activeFilter}">
            <button @click="setActiveFilter(filter)">{{ filter }}</button>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.filter-component {
    padding: 12px;
    background: var(--color-background);
    border: 1px solid #E0E3EE;
    border-radius: var(--border-radius-small);

    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 12px;

    width: fit-content;

    .filter-value {
        color: var(--color-secondary);
        font-size: var(--font-size-medium);
        line-height: 100%;
    }
    .filter-value:hover {
        filter: brightness(55%)
    }
    .filter-value--active {
        color: var(--color-primary);
    }
}
</style>