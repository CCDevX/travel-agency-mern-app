import { Form, Link } from "react-router-dom";
import { Button } from "./ui/button";
import CustomInput from "./custom-input";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const FilterAdvisors = () => {
  const [trigger, setTrigger] = useState(0);

  const handleReset = () => {
    setTrigger((oldState) => oldState + 1);
  };
  return (
    <section className="py-8 bg-slate-100 min-h-[30vh] place-content-center">
      <div className="align-center flex flex-col gap-2">
        <div className="flex justify-between mb-4">
          <p className="text-4xl">Contacts our advisors</p>
        </div>
        <p>
          Enter a place and contact one of our advisor. They are all english
          speakers!
        </p>
        <Form action="/advisors" className="flex gap-4 items-center">
          <CustomInput
            label="town"
            name="town"
            type="search"
            required
            classname="w-full"
            placeholder="'Lyon', 'Paris'..."
            nolabel
            key={trigger}
          />
          <Button type="submit" size="lg" className="text-xl py-4">
            Search
          </Button>
          {/* Reset button */}
          <Link
            to="/advisors"
            className="flex justify-center items-center cursor-pointer"
          >
            <Button variant="ghost" onClick={handleReset}>
              <RotateCcw className="h-full w-full"></RotateCcw>
              <p className="text-xl font-extralight">Reset</p>
            </Button>
          </Link>
        </Form>
      </div>
    </section>
  );
};

export default FilterAdvisors;
