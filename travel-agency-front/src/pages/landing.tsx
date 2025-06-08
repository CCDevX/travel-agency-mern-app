import { RegionsCarousel, TagsCarousel, WhyUs, WhyUsText } from "@/components";
import Gallery from "@/components/gallery";

const Landing = () => {
  return (
    <>
      <RegionsCarousel></RegionsCarousel>
      <TagsCarousel></TagsCarousel>
      <WhyUs></WhyUs>
      <WhyUsText></WhyUsText>
      <Gallery></Gallery>
    </>
  );
};

export default Landing;
