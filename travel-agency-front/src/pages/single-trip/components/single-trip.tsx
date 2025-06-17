import { apiUrl } from "@/axios/axios-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { cleanCheckout, setCheckout } from "@/features/checkout/checkout-slice";
import { useAppDispatch } from "@/hooks";
import type { Trip } from "@/types/entities/trip";
import { getCategoryColor } from "@/types/utils/category-colors-data";
import { rangeDateFormatter } from "@/types/utils/single-trip-data";
import type { StringMapCodes } from "@/types/utils/string-map-codes";
import { regionsCodes } from "@/utils/filters-data";
import { formatAsEuros } from "@/utils/format-as-euros";
import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const SingleTrip = () => {
  const navigate = useNavigate();
  const trip = useLoaderData() as Trip;
  const {
    tags,
    title,
    summary,
    region,
    town,
    desc,
    category,
    images,
    duration,
    adultPrice,
    youngPrice,
    _id,
  } = trip;
  const initCalendarValue: DateRange = { from: undefined, to: undefined };
  const [date, setDate] = useState<DateRange | undefined>(initCalendarValue);
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanCheckout());
  }, [dispatch]);

  const handleGoToCheckout = () => {
    const payload = {
      trip: _id,
      from: date?.from?.toString(),
      to: date?.to?.toString(),
      adults,
      kids,
    };
    console.log(payload);
    dispatch(setCheckout(payload));
  };
  return (
    <section className="px-4 ">
      <div className="align-center my-6">
        <Button onClick={() => navigate(-1)}>← Back</Button>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-4">
          <p className="text-sm text-gray-500 mb-1">
            {
              (regionsCodes as StringMapCodes).find(
                (reg) => reg.code === region
              )?.name
            }
            {town && <span> – {town}</span>}
          </p>
          <h1 className="text-4xl font-special text-black mb-4">{title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              style={{ backgroundColor: getCategoryColor(category) }}
              className="text-white px-3 py-1 text-xs capitalize"
            >
              {category}
            </Badge>
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-sky-50 p-4 rounded-2xl">
          <img
            crossOrigin="anonymous"
            src={`${apiUrl}/images/trips/${_id}/${images[photoIndex]}`}
            alt="main image"
            className="h-[60vh] w-full object-cover rounded-3xl shadow-xl mb-4"
          />

          <div className="w-full flex flex-wrap justify-between gap-y-2 px-2 py-2 bg-sky-50">
            {images.map((img, index) => (
              <img
                key={index}
                src={`${apiUrl}/images/trips/${_id}/${img}`}
                crossOrigin="anonymous"
                onClick={() => setPhotoIndex(index)}
                className={`aspect-square mb-2 h-16 object-cover rounded-xl cursor-pointer transition 
                ${
                  index === photoIndex
                    ? "ring-2 ring-[#c99628]"
                    : "hover:opacity-80"
                }`}
              />
            ))}
          </div>
          <div className="mt-8 bg-white/80 p-6 rounded-xl shadow-sm text-gray-700 leading-relaxed text-justify">
            <p>{summary}</p>
            {desc && <p className="mt-4">{desc}</p>}
          </div>
        </div>
        <div className="lg:col-span-1 px-2">
          <div className="space-y-6">
            {/* BLOC 1 - Info tarifaire */}
            <div className="bg-sky-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Duration: </span>
                {duration} day(s) / {duration - 1} night(s)
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">
                  Price/pers:{" "}
                </span>
                {formatAsEuros(adultPrice)}
              </p>
            </div>

            {/* BLOC 2 - Calendrier */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm">
              <Calendar
                mode="range"
                min={duration - 1}
                max={duration - 1}
                selected={date}
                onSelect={(selectedDate: DateRange | undefined) =>
                  setDate(selectedDate || initCalendarValue)
                }
                className="rounded-xl w-full flex justify-center"
                disabled={{ before: date?.from || new Date() }}
              />
              <Button
                className="mx-auto w-full mt-4"
                onClick={() => setDate(initCalendarValue)}
              >
                Reset
              </Button>
              {date?.from && date?.to && (
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-semibold">Selected Dates:</p>
                  <p>From: {rangeDateFormatter(date).from}</p>
                  <p>To: {rangeDateFormatter(date).to}</p>
                </div>
              )}
            </div>

            {/* BLOC 3 - Sélection nombre */}
            <div className="grid grid-cols-2 gap-4 bg-sky-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="col-span-1">
                <p className="text-sm text-gray-600 mb-1">Adults:</p>
                <Select
                  name="adults"
                  onValueChange={(value) => setAdults(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-white text-black rounded-md shadow-inner">
                    <SelectValue placeholder={adults} />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-white text-black">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {index}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-600 mb-1">Kids:</p>
                <Select
                  name="kids"
                  onValueChange={(value) => setKids(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-white text-black rounded-md shadow-inner">
                    <SelectValue placeholder={kids} />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-white text-black">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {index}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 mt-2">
                <p className="text-sm text-gray-700">
                  Price for {adults} adults and {kids} kids:
                </p>
                <p className="font-bold text-lg">
                  {formatAsEuros(adults * adultPrice + kids * youngPrice)}
                </p>
              </div>
            </div>

            {/* BLOC 4 - Résumé */}
            {date?.from && date?.to && (
              <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm p-4 text-sm text-gray-700">
                <p className="font-semibold text-sky-800 mb-2 underline text-base">
                  Summary
                </p>
                <p>
                  {adults} adult(s) and {kids} kid(s)
                </p>
                <p>From: {rangeDateFormatter(date).from}</p>
                <p>To: {rangeDateFormatter(date).to}</p>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-600">Total:</p>
                  <p className="text-lg font-bold text-sky-700">
                    {formatAsEuros(adults * adultPrice + kids * youngPrice)}
                  </p>
                </div>

                <Link to="/checkout" className="mt-4">
                  <Button onClick={handleGoToCheckout} className="w-full">
                    Book
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleTrip;
