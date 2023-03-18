export enum Rights{
    CanAddToDeals,
    CanPay,
    AddToFavorite,
    RemoveFromFavorite
}

export type Product = {
    id: number,
    img: string,
    selling_type: SellingTypes,
    name: string,
    location: string,
    seller: string,
    type: string,
    description: string,
    number: number,
    price: number,
    currency: Currency,
    paid: boolean
}

export enum SellingTypes {
    All = "Все типы",
    Auction = "Аукцион",
    DirectSales = "Прямые продажи"
}

export type ProductWithRights  = {
    data: Product[],
    allowedRight: Rights[]
}

export enum Currency {
    ruble = "₽"
}

export enum Pages {
    Stock = "stock",
    Favorite = "favorite",
    Deal = "deal"
}