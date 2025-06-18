import { apiUrl } from "@/axios/axios-helper";
import CustomInput from "@/components/input/custom-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/hooks";
import type { Trip } from "@/types/entities/trip";
import { singleDateFormatter } from "@/types/utils/single-trip-data";
import { regionsCodes } from "@/utils/filters-data";
import { formatAsEuros, hotelTax } from "@/utils/format-as-euros";
import { Form, Navigate, useLoaderData } from "react-router-dom";

const CheckoutPage = () => {
  const selectedTrip = useLoaderData() as Trip;
  const checkout = useAppSelector((state) => state.checkoutSlice);
  const user = useAppSelector((state) => state.usersSlice.user);

  const { adults, from, to, kids } = checkout;
  const { _id, images, adultPrice, duration, region, title, town, youngPrice } =
    selectedTrip;

  // Redirect if data is missing
  if (!from || !to || adults === undefined || kids === undefined) {
    return <Navigate to="/" />;
  }

  const apiImageUrl = `${apiUrl}/images/trips/${_id}/${images[0]}`;
  const totalPrice = adults * adultPrice + kids * youngPrice;

  return (
    <section className="px-4 py-10 bg-[var(--color-background)]">
      <h1 className="sr-only">Checkout Page - Confirm Your Booking</h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start">
        {/* FORM */}
        <Form
          method="POST"
          className="md:col-span-7 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
            Required Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              type="search"
              label="First Name"
              name="firstname"
              defaultValue={user?.firstname || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Family Name"
              name="familyname"
              defaultValue={user?.familyname || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Email"
              name="email"
              defaultValue={user?.email || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Telephone"
              name="phone"
              defaultValue={user?.phone || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Address"
              name="address"
              defaultValue={user?.address || ""}
              required
              classname="w-full md:col-span-2"
            />
            <CustomInput
              type="search"
              label="Zip"
              name="zip"
              defaultValue={user?.zip || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Town"
              name="town"
              defaultValue={user?.town || ""}
              required
              classname="w-full"
            />
            <CustomInput
              type="search"
              label="Country"
              name="country"
              defaultValue={user?.country || ""}
              required
              classname="w-full md:col-span-2"
            />
          </div>
          <Button
            type="submit"
            className="mt-6 w-full rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:scale-[1.02] text-white"
          >
            Pay
          </Button>
        </Form>

        {/* RECAP */}
        <div className="md:col-span-5 space-y-6 md:sticky md:top-24">
          <Card className="overflow-hidden rounded-2xl shadow-md p-0">
            <CardHeader className="p-0">
              <img
                src={apiImageUrl}
                alt={title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-5">
              <CardTitle className="text-xl font-special text-[var(--color-primary)] mb-2">
                {title}
              </CardTitle>
              <p className="text-sm text-gray-600 mb-4">
                {regionsCodes.find((reg) => reg.code === region)?.name}
                {town ? `, ${town}` : ""}
              </p>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">From</TableCell>
                    <TableCell>{singleDateFormatter(new Date(from))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">To</TableCell>
                    <TableCell>{singleDateFormatter(new Date(to))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Duration</TableCell>
                    <TableCell>
                      {duration} day{duration > 1 ? "s" : ""} / {duration - 1}{" "}
                      night{duration - 1 > 1 ? "s" : ""}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">People</TableCell>
                    <TableCell>
                      {adults} adult{adults > 1 ? "s" : ""} and {kids} kid
                      {kids > 1 ? "s" : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-5">
              <h3 className="text-md font-semibold mb-2 text-[var(--color-primary)]">
                Price Summary
              </h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tax</TableCell>
                    <TableCell>{formatAsEuros(hotelTax)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell>
                      {formatAsEuros(totalPrice + hotelTax)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
