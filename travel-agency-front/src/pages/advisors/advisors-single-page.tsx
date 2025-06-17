import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Advisor } from "@/types/entities/advisor";
import { useLoaderData, useNavigate } from "react-router-dom";

const AdvisorsSinglePage = () => {
  const advisor = useLoaderData() as Advisor;
  const navigate = useNavigate();

  return (
    <section>
      {/* Back button */}
      <div className="align-center my-6 mt-8">
        <Button
          onClick={() => navigate(-1)}
          className="rounded-full bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-hover)]"
        >
          ← Back
        </Button>
      </div>

      {/* Advisor details */}
      <div className="align-center grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
        {/* Profile image */}
        <div className="w-[250px] h-[250px] mx-auto rounded-full overflow-hidden shadow-lg">
          <img
            crossOrigin="anonymous"
            src={`${apiUrl}/images/advisers/${advisor._id}/${advisor.image}`}
            alt={advisor.name}
            className="h-full w-full object-cover transition-all mix-blend-luminosity hover:mix-blend-normal"
          />
        </div>

        {/* Info */}
        <div className="text-left">
          <h2 className="text-3xl font-bold text-[color:var(--color-primary)] capitalize mb-1">
            {advisor.name}
          </h2>
          <p className="text-sm text-[color:var(--color-muted-text)]">
            Agency of <span className="capitalize">{advisor.present}</span>
          </p>
          <p className="text-sm text-[color:var(--color-muted-text)]">
            Member for {advisor.from} year(s)
          </p>

          <p className="mt-6 text-base leading-relaxed text-[color:var(--color-muted-text)]">
            {advisor.desc}
          </p>

          <div className="mt-6">
            <p className="font-semibold text-[color:var(--color-primary)] mb-1">
              Contact
            </p>
            <p className="text-[color:var(--color-muted-text)]">
              {advisor.phone}
            </p>
            <p className="text-[color:var(--color-muted-text)]">
              {advisor.email}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {advisor.tags.map((tag, index) => (
              <Badge
                key={index}
                className="capitalize px-3 py-1 text-xs rounded-full border border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-white"
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
