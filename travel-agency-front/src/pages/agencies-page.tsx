import { apiUrl } from "@/axios/axios-helper";
import Title from "@/components/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Agency } from "@/types/entities/agency";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";

const AgenciesPage = () => {
  const agencies = useLoaderData() as Agency[];
  const { t } = useTranslation();

  return (
    <section className="bg-[color:var(--color-background)] py-10 px-4 lg:px-16">
      <Title text={t("agencies.title")} />
      <div className="mt-8 flex flex-col gap-10">
        {agencies.map((agency, idx) => (
          <Card
            key={idx}
            className="p-0 flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.01] bg-white"
          >
            {/* IMAGE */}
            <CardHeader className="p-0 md:w-1/2 h-64 md:h-auto relative">
              <img
                crossOrigin="anonymous"
                src={`${apiUrl}/images/agencies/${agency._id}/${agency.photo}`}
                alt={agency.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="p-6 flex flex-col justify-center md:w-1/2">
              <h4 className="text-2xl font-semibold text-[color:var(--color-primary)] mb-4 text-center md:text-left font-special">
                {agency.title}
              </h4>

              <div className="flex items-start gap-3 mb-2 text-[color:var(--color-muted-text)]">
                <MapPinHouse size={18} />
                <p className="text-sm">{agency.address}</p>
              </div>
              <div className="flex items-start gap-3 mb-2 text-[color:var(--color-muted-text)]">
                <Phone size={18} />
                <p className="text-sm">{agency.phone}</p>
              </div>
              <div className="flex items-start gap-3 mb-2 text-[color:var(--color-muted-text)]">
                <Mail size={18} />
                <p className="text-sm break-all">{agency.email}</p>
              </div>

              <p className="text-sm text-[color:var(--color-muted-text)] mt-4">
                {t("agencies.schedule")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AgenciesPage;
