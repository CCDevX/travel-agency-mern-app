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
    <section className="px-4">
      <div className="align-center my-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-white border border-[var(--color-border)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
        >
          ← Back
        </Button>
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
          <h1 className="text-4xl font-special text-[var(--color-primary)] mb-4">
            {title}
          </h1>
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
                className="text-xs capitalize border-[var(--color-border)] text-[var(--color-primary)]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-[var(--color-background)] p-4 rounded-2xl">
          <img
            crossOrigin="anonymous"
            src={`${apiUrl}/images/trips/${_id}/${images[photoIndex]}`}
            alt="main image"
            className="h-[60vh] w-full object-cover rounded-3xl shadow-xl mb-4"
          />

          <div className="flex flex-wrap justify-between gap-y-2 px-2 py-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={`${apiUrl}/images/trips/${_id}/${img}`}
                crossOrigin="anonymous"
                onClick={() => setPhotoIndex(index)}
                className={`aspect-square h-16 object-cover rounded-xl cursor-pointer transition ${
                  index === photoIndex
                    ? "ring-2 ring-[var(--color-accent)]"
                    : "hover:opacity-80"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm text-gray-700 leading-relaxed text-justify">
            <p>{summary}</p>
            {desc && <p className="mt-4">{desc}</p>}
          </div>
        </div>

        <div className="lg:col-span-1 px-2">
          <div className="space-y-6">
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Duration:</span> {duration} day
                {duration > 1 ? "s" : ""} / {duration - 1} night
                {duration - 1 > 1 ? "s" : ""}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Price/pers</span>
                <br /> Adults: {formatAsEuros(adultPrice)}
                <br /> Kids: {formatAsEuros(youngPrice)}
              </p>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-sm">
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
                className="w-full mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                onClick={() => setDate(initCalendarValue)}
              >
                Reset
              </Button>
              {date?.from && date?.to && (
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-semibold">Selected Dates</p>
                  <p>From: {rangeDateFormatter(date).from}</p>
                  <p>To: {rangeDateFormatter(date).to}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-sm">
              <div>
                <p className="text-sm text-gray-600 mb-1">Adults:</p>
                <Select
                  name="adults"
                  onValueChange={(v) => setAdults(parseInt(v))}
                >
                  <SelectTrigger className="w-full bg-white text-black rounded-md shadow-inner">
                    <SelectValue placeholder={adults} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Kids:</p>
                <Select name="kids" onValueChange={(v) => setKids(parseInt(v))}>
                  <SelectTrigger className="w-full bg-white text-black rounded-md shadow-inner">
                    <SelectValue placeholder={kids} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 mt-2">
                <p className="text-sm text-gray-700">
                  Price for {adults} adults and {kids} kids:
                </p>
                <p className="font-bold text-lg text-[var(--color-primary)]">
                  {formatAsEuros(adults * adultPrice + kids * youngPrice)}
                </p>
              </div>
            </div>

            {date?.from && date?.to && (
              <div className="flex flex-col bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-4 text-sm text-gray-700">
                <p className="font-semibold text-[var(--color-primary)] mb-2 underline text-base">
                  Summary
                </p>
                <p>
                  {adults} adult(s) and {kids} kid(s)
                </p>
                <p>From: {rangeDateFormatter(date).from}</p>
                <p>To: {rangeDateFormatter(date).to}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-600">Total:</p>
                  <p className="text-lg font-bold text-[var(--color-secondary)]">
                    {formatAsEuros(adults * adultPrice + kids * youngPrice)}
                  </p>
                </div>
                <Link to="/checkout" className="mt-4">
                  <Button
                    onClick={handleGoToCheckout}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                  >
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
