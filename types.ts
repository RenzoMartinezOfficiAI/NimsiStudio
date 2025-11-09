
export interface Service {
  category: string;
  items: {
    name: string;
    price: number;
    popular?: boolean;
  }[];
}

export interface Policy {
  title: string;
  content: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Tip {
  title: string;
  items: string[];
}
