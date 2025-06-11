import { Advisors, BreadCrumbs, TripFilter } from "@/components";
import ResearchContent from "./components/research-content";

const ResearchPage = () => {
  return (
    <>
      <BreadCrumbs></BreadCrumbs>
      <TripFilter></TripFilter>
      <ResearchContent></ResearchContent>
      <Advisors></Advisors>
    </>
  );
};

export default ResearchPage;
