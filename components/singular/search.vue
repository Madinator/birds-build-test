<script lang="ts" setup>
import { useBaseStore } from "@/store/base";
import ButtonWithIcon from "../reusable/base/ButtonWithIcon.vue";

const baseStore = useBaseStore();

const text = ref(baseStore.getSearchText);

const setSearchText = ():void => {
    baseStore.setSearchText(text.value);
};
</script>

<template>
    <div class="search-component">
        <input class="input" v-model="text" @input="setSearchText"/>
        <div class="button-wrapper">
            <ButtonWithIcon 
                image="/_nuxt/assets/svg/search.svg"  
                @click="setSearchText"
            />
        </div>
    </div> 
</template>

<style lang="scss" scoped>
.search-component {
    border: 1px solid #E0E3EE;
    border-radius: var(--border-radius-small);
    display: flex;
    align-items: center;
    padding: 4px;
    .input {
        height: 100%;
        width: 100%;
        padding: 0 20px;
        color: var(--color-primary);
        font-size: var(--font-size-medium);
    }
    .button-wrapper {
        background-color: var(--color-primary);
        border-radius: var(--border-radius-small);
    }
}
</style>