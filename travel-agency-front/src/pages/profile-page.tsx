import { CustomInput } from "@/components";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteUser,
  logoutUser,
  updateUser,
} from "@/features/users/users-slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { ProfilePageLoaderType } from "@/types/dtos/profile-page-loader-type";
import { formatAsEuros, hotelTax } from "@/utils/format-as-euros";
import { useConfirm } from "material-ui-confirm";
import type { FormEvent } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const profile = useLoaderData() as ProfilePageLoaderType;
  const { isLoading } = useAppSelector((state) => state.usersSlice.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileData = Object.fromEntries(formData);
    dispatch(updateUser({ id: profile._id, data: profileData }));
  };
  const handleDelete = async () => {
    try {
      const result = await confirm({
        title: "Are you sure you want to delete your account?",
        description:
          "You'll be redirected to the main page. Your account data will be lost.",
        confirmationText: "Proceed",
        cancellationText: "Cancel",
      });
      if (result.confirmed) {
        await dispatch(deleteUser({ id: profile._id })).unwrap();
        dispatch(logoutUser());
        navigate("/");
      }
    } catch (error) {
      console.log("Canceled", error);
    }
  };
  return (
    <section className="bg-[var(--color-background)] py-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        <Title text="Profile" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Summary block */}
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-2 md:col-span-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Name:</span> {profile?.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {profile?.email}
            </p>
          </div>

          {/* Form */}
          <form
            method="POST"
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-2xl shadow-md md:col-span-2 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                type="search"
                label="Firstname"
                name="firstname"
                defaultValue={profile.firstname || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label="Familyname"
                name="familyname"
                defaultValue={profile.familyname || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label="Address"
                name="address"
                defaultValue={profile.address || ""}
                classname="w-full sm:col-span-2"
              />
              <CustomInput
                type="search"
                label="Town"
                name="town"
                defaultValue={profile.town || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label="Zip"
                name="zip"
                defaultValue={profile.zip || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label="Country"
                name="country"
                defaultValue={profile.country || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label="Phone"
                name="phone"
                defaultValue={profile.phone || ""}
                classname="w-full sm:col-span-2"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-4 pt-4">
              <Button
                type="submit"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-full px-6"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="rounded-full px-6"
                onClick={handleDelete}
              >
                Delete Account
              </Button>
            </div>
          </form>
        </div>

        {/* Orders */}
        {/* TABLE EN VERSION DESKTOP */}
        <div className="space-y-4">
          <Title text="Orders" />

          {profile.orders.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              You haven't made any reservations yet.
            </p>
          ) : (
            <>
              {/* TABLE EN VERSION DESKTOP */}
              <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-md responsive-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trip Title</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Firstname</TableHead>
                      <TableHead>Familyname</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.orders.map((order, index) => {
                      const {
                        trip,
                        email,
                        familyname,
                        firstname,
                        adults,
                        kids,
                      } = order;
                      const { title, adultPrice, youngPrice, duration } = trip;
                      const totalPrice =
                        adultPrice * adults + youngPrice * kids;
                      return (
                        <TableRow key={index}>
                          <TableCell>{title}</TableCell>
                          <TableCell>{email}</TableCell>
                          <TableCell>{firstname}</TableCell>
                          <TableCell>{familyname}</TableCell>
                          <TableCell>
                            {formatAsEuros(totalPrice + hotelTax)}
                          </TableCell>
                          <TableCell>
                            {duration} day{duration > 1 && "s"}/{duration - 1}{" "}
                            night
                            {duration - 1 > 1 && "s"} with {adults} adult
                            {adults > 1 && "s"} and {kids} kid{kids > 1 && "s"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* CARDS EN VERSION MOBILE */}
              <div className="responsive-orders">
                {profile.orders.map((order, index) => {
                  const { trip, email, familyname, firstname, adults, kids } =
                    order;
                  const { title, adultPrice, youngPrice, duration } = trip;
                  const totalPrice = adultPrice * adults + youngPrice * kids;
                  return (
                    <div key={index} className="order-card">
                      <p>
                        <span>Trip:</span> {title}
                      </p>
                      <p>
                        <span>Email:</span> {email}
                      </p>
                      <p>
                        <span>Name:</span> {firstname} {familyname}
                      </p>
                      <p>
                        <span>Paid:</span>{" "}
                        {formatAsEuros(totalPrice + hotelTax)}
                      </p>
                      <p>
                        <span>Details:</span> {duration} day
                        {duration > 1 && "s"}/{duration - 1} night
                        {duration - 1 > 1 && "s"} with {adults} adult
                        {adults > 1 && "s"} and {kids} kid{kids > 1 && "s"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
