import alpes from "../../assets/images/regions-carousel/alpes.jpg";
import occitanie from "../../assets/images/regions-carousel/occitanie.jpg";
import provence from "../../assets/images/regions-carousel/provence.jpg";
import type { RegionsCarouselDataType } from "../ui/regions-carousel-data-type";

const regionsCarouselData: RegionsCarouselDataType[] = [
  { name: "the alps", photo: alpes, region: 1 },
  { name: "occitanie", photo: occitanie, region: 11 },
  { name: "provence", photo: provence, region: 13 },
];

export { regionsCarouselData };
