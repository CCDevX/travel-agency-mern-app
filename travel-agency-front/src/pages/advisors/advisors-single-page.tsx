import type { Advisor } from "@/types/entities/advisor";
import { useLoaderData } from "react-router-dom";

const AdvisorsSinglePage = () => {
  const advisor = useLoaderData() as Advisor;
  console.log(advisor);
  return <div>AdvisorsSinglePage</div>;
};

export default AdvisorsSinglePage;
