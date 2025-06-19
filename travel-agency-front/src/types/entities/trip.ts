export type Trip = {
  _id: string;
  title: {
    en: string;
    fr: string;
  };
  summary: {
    en: string;
    fr: string;
  };
  region: number;
  town: string;
  desc: {
    en: string;
    fr: string;
  };
  category: string;
  images: string[];
  duration: number;
  adultPrice: number;
  youngPrice: number;
  createdAt: string;
  updateddAt: string;
  tags: string[];
};
