import { apiUrl } from "@/axios/axios-helper";
import Title from "@/components/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Agency } from "@/types/entities/agency";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import { useLoaderData } from "react-router-dom";

const AgenciesPage = () => {
  const agencies = useLoaderData() as Agency[];

  return (
    <section className="bg-gray-100 my-8 px-4 lg:px-16">
      <Title text="Agencies" />
      <div className="mt-6 flex flex-col gap-8">
        {agencies.map((agency, idx) => (
          <Card
            key={idx}
            className="p-0 flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg transition-transform duration-200 hover:scale-[1.01]"
          >
            {/* IMAGE */}
            <CardHeader className="p-0 md:w-1/2 h-64 md:h-auto relative">
              <img
                crossOrigin="anonymous"
                src={`${apiUrl}/images/agencies/${agency._id}/${agency.photo}`}
                alt={agency.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </CardHeader>

            {/* CONTENU */}
            <CardContent className="p-6 flex flex-col justify-center md:w-1/2">
              <div>
                <h4 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  {agency.title}
                </h4>
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  <MapPinHouse size={20} />
                  <p className="text-sm">{agency.address}</p>
                </div>
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  <Phone size={20} />
                  <p className="text-sm">{agency.phone}</p>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <Mail size={20} />
                  <p className="text-sm">{agency.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Our agencies are open from 9AM to 6PM (French time) from Monday
                to Friday, and Saturday from 9AM to 12PM.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AgenciesPage;
