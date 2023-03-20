<script lang="ts" setup>
import { Product, Rights } from "@/typings/index";
import ButtonWithIcon from "@/components/reusable/base/ButtonWithIcon.vue";
import { useBaseStore } from "@/store/base";

const baseStore = useBaseStore();

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    required: false
  },
  rights: {
    type: Object as PropType<Rights[]>,
      required: false
  }
});

const Cost = computed(() => {
  return Number(props.data?.price) * Number(props.data?.number);
});

const addCurrency = (number: number | undefined) => {
  return number + " " + props.data?.currency;
};

const toggleFavorite = () => {
  if(!props.data || !props.rights) return;
  baseStore.setFavorites(props.data.id, props.rights);
};

const toggleDeals = () => {
  if(!props.data) return;
  baseStore.setDeals(props.data.id);
};

const pay = () => {
  if(!props.data) return;
  baseStore.pay(props.data.id);
}
</script>

<template>
  <div class="card-component">
    <div class="base-info">
      <img class="image" src="@/assets/img/Image.png" alt="" />
      <div class="text">
          <h6 class="type">{{ data?.selling_type }}</h6>
          <h2 class="name">{{ data?.name }}</h2>
          <div class="location">
            <img class="geo" src="@/assets/svg/geo.svg" alt="" />
            <span class="city">{{ data?.location }}</span>
          </div>
          <div class="seller">
            <span class="seller-name">Продавец </span>
            <span class="company">{{ data?.seller }}</span>
          </div>
          <div class="product">
            <span class="product-type">Вид товара</span>
            <span class="product-name">{{ data?.type }}</span>
          </div>
          <p class="description">{{ data?.description }}</p>
      </div>
    </div>
    <div class="additional-info">
      <strong class="price">{{ addCurrency(Cost) }}</strong>
      <ul class="property-list">
        <li class="property-item">
          <span class="property-name">Количество</span>
          <span class="property-value">{{ data?.number }} шт.</span>
        </li>
        <li class="property-item">
          <span class="property-name">Стоимость за штуку</span>
          <span class="property-value">{{ addCurrency(data?.price)}} </span>
        </li>
      </ul>
      <div class="actions">
        <button 
          class="button button-base"
          v-if="rights?.includes(Rights.CanAddToDeals)"
          @click="toggleDeals">
          Добавить в сделки
        </button>
        <button 
          class="button button-secondary"
          v-if="rights?.includes(Rights.CanPay)"
          @click="pay"
          :disabled="data?.paid">
          {{ data?.paid ? "Оплачено" : "Оплатить" }}
        </button>
        <div class="button-wrapper">
          <ButtonWithIcon @click="toggleFavorite" image="/_nuxt/assets/svg/favorite.svg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-component {
  border: 1px solid #E0E3EE;
  border-radius: 20px;
  display: flex;
  flex-flow: row;
  @media only screen and (max-width: 1200px) {
    flex-flow: column;
  }
  .base-info {
    flex-basis: 70%;
    padding: 20px 20px 80px;
    display: flex;
    flex-flow: row;
    gap: 20px;

    @media only screen and (max-width: 800px) {
      flex-flow: column;
    }
  }
  .additional-info {
    flex-basis: 30%;
    padding: 20px;
    border: 1px solid #E0E3EE;
    border-radius: 20px;
    display: flex;
    flex-flow: column;
  }
  .image {
    border-radius: var(--border-radius-small);
    object-fit: cover;
    @media only screen and (max-width: 800px) {
      max-height: 200px;
      aspect-ratio: 1/1;
    }
  }
  .text {
    display: flex;
    flex-flow: column;
  }
  .type {
    color: var(--color-secondary);
    font-size: 13px;
  }
  .name {
    margin-top: 15.5px;
    height: 38px;
    font-weight: 500;
    font-size: var(--font-size-medium);
    line-height: 125%;
    color: var(--color-primary);
  }
  .location {
    margin-top: 12px;

    display: flex;
    flex-flow: row;
    gap: 4.5px;
    align-items: center;
    padding: 4.5px 8px 4.5px 10.5px;
    background: var(--color-background);
    border-radius: 5px;
  }
  .city {
    color: var(--color-tertiary);
    font-size: 13px;
  }
  .seller {
    margin-top: 12px;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 4px;
  }
  .seller-name {
    font-size: 13px;
    color: var(--color-secondary);
  }
  .company {
    color: var(--color-primary);
    font-size: 13px;
  }
  .product {
    margin-top: 12px;
    background: var(--color-background);
    border-radius: var(--border-radius-small);
    display: flex;
    flex-flow: column;
    gap: 6px;
    width: fit-content;
    padding: 8px;
  }
  .product-type {
    font-size: 13px;
    color: var(--color-secondary);
  }
  .product-name {
    font-size: 13px;
    color: var(--color-tertiary);
  }
  .description {
    margin-top: 12px;
    color: var(--color-primary);
    font-size: 13px;
    line-height: 150%;
    overflow: hidden;
    width:100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .price {
    font-weight: 500;
    font-size: 20px;
    color: var(--color-primary);
    white-space: nowrap;
  }
  .property-list {
    margin-top: 13.5px;
    display: flex;
    flex-flow: column;
    gap: 11px;
  }
  .property-item {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
  .property-name {
    color: var(--color-secondary);
    font-size: 13px;
  }
  .property-value {
    color: var(--color-primary);
    font-size: 13px;
  }
  .actions {
    margin-top: auto;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    @media only screen and (max-width: 800px) {
      margin-top: 20px;
    }
  }
  .button-wrapper {
    background-color: var(--color-background);
  }
}
</style>