import kids from "../assets/images/tags-carousel/kids.jpg";
import families from "../assets/images/tags-carousel/families.jpg";
import couples from "../assets/images/tags-carousel/couples.jpg";
import mountains from "../assets/images/tags-carousel/montains.jpg";
import beach from "../assets/images/tags-carousel/beach.jpg";
import type { TagsCarouselDataType } from "@/types/ui/tags-carousel-data-type";

const tagsCarouselData: TagsCarouselDataType[] = [
  {
    code: "1",
    photo: kids,
  },
  {
    code: "3",
    photo: families,
  },
  {
    code: "2",
    photo: couples,
  },
  {
    code: "5",
    photo: mountains,
  },
  {
    code: "6",
    photo: beach,
  },
];

export { tagsCarouselData };
