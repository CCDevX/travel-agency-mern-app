export type Advisor = {
  _id: string;
  name: string;
  tags: string[];
  image: string;
  present: string;
  from: string;
  desc: {
    en: string;
    fr: string;
  };
  phone: string;
  email: string;
};
