export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description: string | null;
  image_uri: string | null;
  created_at: string;
}
