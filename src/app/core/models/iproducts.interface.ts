export interface IProducts {

  sold: number;
  images: string[];
   subcategory: { _id: string; name: string; slug: string }[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: { _id: string; name: string; slug: string };
  brand: { _id: string; name: string; slug: string };
  ratingsAverage: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

