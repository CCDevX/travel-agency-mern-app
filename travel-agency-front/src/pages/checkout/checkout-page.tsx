import { apiUrl } from "@/axios/axios-helper";
import CustomInput from "@/components/input/custom-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/hooks";
import type { Trip } from "@/types/entities/trip";
import { singleDateFormatter } from "@/types/utils/single-trip-data";
import { regionsCodes } from "@/utils/filters-data";
import { formatAsEuros, hotelTax } from "@/utils/format-as-euros";
import { Form, useLoaderData } from "react-router-dom";

const CheckoutPage = () => {
  const selectedTrip = useLoaderData() as Trip;
  const checkout = useAppSelector((state) => state.checkoutSlice);
  const user = useAppSelector((state) => state.usersSlice.user);

  const { adults, from, to, kids } = checkout;
  const { _id, images, adultPrice, duration, region, title, town, youngPrice } =
    selectedTrip;

  const apiImageUrl = apiUrl + "/images/trips/" + _id + "/" + images[0];
  const totalPrice = adults * adultPrice + kids * youngPrice;
  return (
    <section className="align-center grid md:grid-cols-10 gap-x-8 justify-center items-start">
      {/* FORM FOR BUYER */}
      <Form
        method="POST"
        className="md:col-span-6 md:my-8 order-last md:order-first"
      >
        <div className="bg-muted rounded-xl shadow-2xl p-8">
          <p className="text-4xl mb-4">Required Informations Before Purchase</p>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                label="first name"
                name="firstname"
                type="search"
                defaultValue={user?.firstname || ""}
                classname="w-full"
                required
              />
              <CustomInput
                label="family name"
                name="familyname"
                type="search"
                defaultValue={user?.familyname || ""}
                classname="w-full"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                label="email"
                name="email"
                type="search"
                defaultValue={user?.email || ""}
                classname="w-full"
                required
              />
              <CustomInput
                label="telephone"
                name="phone"
                type="search"
                defaultValue={user?.phone || ""}
                classname="w-full"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <CustomInput
                label="address"
                name="address"
                type="search"
                defaultValue={user?.address || ""}
                classname="w-full"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <CustomInput
                label="zip"
                name="zip"
                type="search"
                defaultValue={user?.zip || ""}
                classname="w-full"
                required
              />
              <CustomInput
                label="town"
                name="town"
                type="search"
                defaultValue={user?.town || ""}
                classname="w-full"
                required
              />
              <CustomInput
                label="country"
                name="country"
                type="search"
                defaultValue={user?.country || ""}
                classname="w-full"
                required
              />
            </div>
          </div>
        </div>
        <div className="my-8 w-full">
          <Button className="rounded-xl shadow-2xl p-8 w-full" type="submit">
            Pay
          </Button>
        </div>
      </Form>
      {/* RECALL OF BOUGHT PRODUCT */}
      <div className="md:col-span-4 md:my-8">
        <Card className="bg-muted overflow-hidden rounded-xl shadow-2xl p-0">
          <CardHeader className="w-full p-0">
            <img
              src={apiImageUrl}
              alt="main-photo"
              className="h-full aspect-[2/1] object-cover"
            />
          </CardHeader>
          <CardContent className="my-4">
            <CardTitle>
              <p className="font-special font-bold text-4xl my-2">{title}</p>
              <p className="mb-3">
                {regionsCodes.find((reg) => reg.code === region)?.name}, {town}
              </p>
            </CardTitle>
            <CardDescription>
              <Table>
                <TableBody className="text-black">
                  <TableRow>
                    <TableCell className="font-bold">From</TableCell>
                    <TableCell>{singleDateFormatter(new Date(from))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">To</TableCell>
                    <TableCell>{singleDateFormatter(new Date(to))}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Duration</TableCell>
                    <TableCell>
                      {duration} day(s) / {duration - 1} night(s)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">People</TableCell>
                    <TableCell>
                      {adults} adult(s) and {kids} kid(s)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-muted my-4 rounded-xl shadow-2xl">
          <CardContent>
            <p className="mt-2">Price</p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold text-black">Tax</TableCell>
                  <TableCell className="">{formatAsEuros(hotelTax)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-black">Total</TableCell>
                  <TableCell className="">
                    {formatAsEuros(totalPrice + hotelTax)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CheckoutPage;
