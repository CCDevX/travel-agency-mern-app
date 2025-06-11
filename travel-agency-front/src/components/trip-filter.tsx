import { CustomInput, CustomRange, CustomSelect } from "@/components";
import { Button } from "@/components/ui/button";
import type { ResearchLoaderType } from "@/types/dtos/research-loader-type";
import {
  regionsCodes,
  categories,
  durations,
  tags,
} from "@/utils/filters-data";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";

const TripFilter = () => {
  const { params } = useLoaderData() as ResearchLoaderType;
  const [trigger, setTrigger] = useState(0);

  const {
    region: urlRegion,
    town: urlTown,
    category: urlCategory,
    duration: urlDuration,
    price: urlPrice,
    tags: urlTags,
  } = params;
  useEffect(() => {
    setTrigger((oldState) => oldState + 1);
  }, [urlRegion, urlTown, urlCategory, urlDuration, urlPrice, urlTags]);

  return (
    <section key={trigger} className="py-12 bg-slate-100 shadow-inner">
      {/* Titre principal */}
      <div className="mb-10 text-center px-4">
        <h2 className="text-4xl lg:text-5xl font-special text-blue-900">
          What kind of trip to France...
        </h2>
      </div>

      {/* Formulaire de recherche */}
      <Form
        method="get"
        action="/research"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto"
      >
        <CustomSelect
          label="Region"
          name="region"
          options={regionsCodes}
          defaultValue={urlRegion || "0"}
        />

        <CustomInput
          label="Town"
          name="town"
          type="search"
          defaultValue={urlTown}
        />

        <CustomSelect
          label="Type"
          name="category"
          options={categories}
          defaultValue={urlCategory || "0"}
        />

        <CustomSelect
          label="Duration"
          name="duration"
          options={durations}
          defaultValue={urlDuration || "0"}
        />

        <CustomSelect
          label="Tags"
          name="tags"
          options={tags}
          defaultValue={urlTags || "0"}
        />

        {/* Prix (texte + slider) */}
        <div className="col-span-full flex flex-col items-center gap-2 mt-2">
          <CustomRange name="price" defaultValue={urlPrice} />
        </div>

        {/* Boutons */}
        <div className="col-span-full flex justify-center gap-4 mt-6">
          <Button
            type="submit"
            size="lg"
            className="text-xl px-6 py-3 rounded-xl shadow-md hover:bg-black/90 transition-transform hover:scale-[1.03]"
          >
            Search
          </Button>

          <Link to="/research">
            <Button
              variant="ghost"
              aria-label="Reset filters"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="text-lg">Reset</span>
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default TripFilter;
