export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image_uri: string | null;
  created_at: string;
}

export interface NewProduct {
  name: string;
  quantity: number;
  price: number;
  image_uri: string | null;
}

export interface UpdateProduct {
  id: number;
  name?: string;
  quantity?: number;
  price?: number;
  image_uri?: string | null;
}
