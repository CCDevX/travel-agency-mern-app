import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Advisor } from "@/types/entities/advisor";
import { contact } from "@/utils/advisor-single-page-data";
import { useLoaderData, useNavigate } from "react-router-dom";

const AdvisorsSinglePage = () => {
  const advisor = useLoaderData() as Advisor;
  console.log(advisor);
  const navigate = useNavigate();
  return (
    <section>
      <div className="h-[30vh]">
        <img src={contact} className="h-full w-full object-cover" />
      </div>
      <div className="my-6 flex justify-center md:justify-start px-4">
        <Button onClick={() => navigate(-1)}>← Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="h-[300px] w-[300px] justify-self-center">
          <img
            crossOrigin="anonymous"
            src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
            alt={advisor.name}
            className="h-full w-full rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 capitalize">
            {advisor.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Agency of <span className="capitalize">{advisor.present}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Member for {advisor.from} year(s)
          </p>
          <p className="mt-8 leading-relaxed text-gray-700">{advisor.desc}</p>

          <p className="mt-8 font-medium text-gray-800">Contact</p>
          <p className="text-gray-700">{advisor.phone}</p>
          <p className="text-gray-700">{advisor.email}</p>

          <div className="mt-8 flex flex-wrap gap-2 mb-12">
            {advisor.tags.map((tag, index) => (
              <Badge
                key={index}
                className="capitalize px-3 py-1 text-xs rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsSinglePage;
