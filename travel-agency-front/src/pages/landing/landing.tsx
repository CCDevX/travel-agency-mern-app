import Advisors from "./components/advisors";
import BestsellersCarousel from "./components/bestsellers-carousel";
import Gallery from "./components/gallery";
import RegionsCarousel from "./components/regions-carousel";
import TagsCarousel from "./components/tags-carousel";
import WhyUs from "./components/why-us";
import WhyUsText from "./components/why-us-text";

const Landing = () => {
  return (
    <>
      <RegionsCarousel></RegionsCarousel>
      <BestsellersCarousel></BestsellersCarousel>
      <TagsCarousel></TagsCarousel>
      <WhyUs></WhyUs>
      <WhyUsText></WhyUsText>
      <Gallery></Gallery>
      <Advisors></Advisors>
    </>
  );
};

export default Landing;
