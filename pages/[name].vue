<script lang="ts" setup>
import Filter from '@/components/singular/filter.vue';
import Search from '@/components/singular/search.vue';
import Card from '@/components/reusable/Card.vue';
import { useBaseStore } from "@/store/base";
import { useRoute } from 'vue-router';
import { Pages } from '@/typings';

const baseStore = useBaseStore();

const route = useRoute();

onMounted(() => {
    baseStore.setActivePage(route.params.name as Pages);
    baseStore.getGoodsList();
});

definePageMeta({
    middleware: 'redirect',
});
</script>

<template>
    <div class="main">
        <div class="actions">
            <div class="filter">
                <Filter />
            </div>
            <div class="search">
                <Search />
            </div>
        </div>
        <ul class="list">
            <li class="item" v-for="item in baseStore.filteredItems?.data">
                <Card :data="item" :rights="baseStore.filteredItems?.allowedRight"/>
            </li> 
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.main {
    .actions {
        margin-top: 77px;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;

        @media only screen and (max-width: 1000px) {
            flex-flow: column;
            gap: 20px;
        }
    }

    .list {
        margin-top: 40px;
        display: flex;
        flex-flow: column;
        gap: 40px;
    }
}
</style>