import { IUtils } from '../utils/interfaces';

export interface IProduct {
  color: string;
  currency: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: string;
  quantity?: number;
};

export interface ICartProduct {
  id: string;
  quantity: number;
}

export interface ICart {
  utils: IUtils;
  products: IProduct[];
  cartElements: ICartProduct[];
  updateProducts: (products: IProduct[]) => void;
  addToCart: (event: Event, id: string) => void;
  substactFromCart: (event: Event, id: string) => void;
  deleteFromCart: (event: Event, id: string) => void;
  updateCart: (event: Event, action: () => any) => void;
  productExits: (id: string) => boolean;
  updateAllItemsCartQuantity: () => void;
  updateCartItem: (id: string, type: string) => void;
  addNewItemToCart: (id: string) => void;
  updateCartSummary: () => void;
  getCartProduct: (product: ICartProduct) => IProduct
}
