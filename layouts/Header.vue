<script lang="ts" setup>
import NavItem from '@/components/reusable/NavItem.vue';
import { Pages } from '@/typings/index';
</script>

<template>
    <div class="header-layout">
        <div class="top"></div>
        <nav class="navigation">
            <ul class="navigation__wrapper">
                <li><NavItem :to="Pages.Favorite" path="@/assets/svg/favorite.svg" name="Избранное" /></li>
                <li><NavItem :to="Pages.Stock" path="@/assets/svg/stock.svg" name="Склад"/></li>
                <li><NavItem :to="Pages.Deal" path="@/assets/svg/deal.svg" name="Сделки"/></li>
            </ul>
        </nav>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.header-layout {
    .top {
        background: #E0E3EE;
        border-radius: 0px 0px 10px 10px;

        width: 100%;
        height: 40px;
    }
    .navigation {
        margin-top: 20px;
        display: flex;
        flex-flow: row;
        justify-content: flex-end;

        @media only screen and (max-width: 1000px) {
            justify-content: center;
        }
    }
    .navigation__wrapper {
        display: flex;
        flex-flow: row;
        gap: 7px;
    }
}


</style>