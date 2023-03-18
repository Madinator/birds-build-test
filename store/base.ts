import { defineStore } from 'pinia';
import { ProductWithRights, Rights, SellingTypes, Pages, Product } from "@/typings/index";
import { storageService } from "@/services/storage";
import { goodsApiService } from "@/services/api";
import { TypedResponse } from "@/typings/global";


interface State {
  favorites: ProductWithRights,
  stocks: ProductWithRights,
  deals: ProductWithRights,
  activePage: Pages,
  activeFilter: SellingTypes,
  searchText: string,
}

export const useBaseStore = defineStore({
  id: 'baseStore',  

  state: (): State => ({
    favorites: {
      data: [],
      allowedRight: [Rights.CanAddToDeals, Rights.RemoveFromFavorite]
    },
    stocks: {
      data: [],
      allowedRight: [Rights.CanAddToDeals, Rights.AddToFavorite, Rights.RemoveFromFavorite]
    },
    deals:{
      data: [],
      allowedRight: [Rights.CanPay, Rights.AddToFavorite]
    },
    activePage: Pages.Stock,
    activeFilter: SellingTypes.All,
    searchText: "",
  }),
  actions: {
    setActivePage(page: Pages): void {
      this.$state.activePage = page;
    },
    setActiveFilter(filterValue: SellingTypes): void {
      storageService.setItem(`${this.$state.activePage}_filter`, filterValue);
      this.$state.activeFilter = filterValue;
    },
    setSearchText(text: string): void {
      storageService.setItem(`${this.$state.activePage}_text`, text);
      this.$state.searchText = text;
    },
    setFavorites(id: number, rights: Rights[]): void {
      const itemToAdd = this.$state.stocks.data.find(item => item.id === id);
      
      if (!itemToAdd) return;
  
      const existsInFavorites = this.$state.favorites.data.findIndex(item => item.id === id);

      if (existsInFavorites !== -1 && rights.includes(Rights.RemoveFromFavorite)) {
        const indexToRemove = this.$state.favorites.data.findIndex(item => item.id === id);
        this.$state.favorites.data.splice(indexToRemove, 1);
        return;
      }

      if (existsInFavorites === -1 && rights.includes(Rights.AddToFavorite)) {
        this.$state.favorites.data.push(itemToAdd);
        return;
      };
    },
    setDeals(id: number): void {
      const itemToAdd = this.$state.stocks.data.find(item => item.id === id);
      
      if (!itemToAdd) return;

      const existInDeals = this.$state.deals.data.find(item => item.id === id);

      if(existInDeals) return;

      this.$state.deals.data.push(itemToAdd);
    },
    pay(id: number): void {
      const item = this.$state.deals.data.find(item => item.id === id);
      if(!item) return;

      item.paid = true;
    },
    async getGoodsList() {
      await goodsApiService.getGoodsList()
      .then((response: TypedResponse<Product[]>) => {
        if(response.status === 200) {
          this.$state.stocks.data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },
  getters: {
    filteredItems(state): ProductWithRights {
      function filterByActivePage(): ProductWithRights{
        switch (state.activePage) {
          case Pages.Favorite:
            return { data: state.favorites.data, allowedRight: state.favorites.allowedRight };
          case Pages.Stock:
            return { data: state.stocks.data, allowedRight: state.stocks.allowedRight };
          case Pages.Deal:
            return { data: state.deals.data, allowedRight: state.deals.allowedRight };
          default:
            throw new Error("Unexpected page");
        }
      }
      function filterByActiveFilter(data: ProductWithRights): ProductWithRights {
        return state.activeFilter === SellingTypes.All
      ? data
      : {
          data: data.data.filter(
            (item) => item.selling_type === state.activeFilter
          ),
          allowedRight: data.allowedRight,
        };
      }
      function filterBySearchText(data: ProductWithRights): ProductWithRights {
        return {
          data: data.data.filter(
            (item) => item.name.toLowerCase().includes(state.searchText.toLowerCase())
          ),
          allowedRight: data.allowedRight,
        };
      }
      return filterBySearchText(filterByActiveFilter(filterByActivePage()));
    },
    getActiveFilter(state): SellingTypes {
      const value: SellingTypes | null = storageService.getItem(
        `${state.activePage}_filter`
      ) as SellingTypes;
      state.activeFilter = value;
      return value ? value : SellingTypes.All;
    },
    getSearchText(state): string {
      const value: string | null = storageService.getItem(`${state.activePage}_text`);
      return value ? value : "";
    },
  }
});
