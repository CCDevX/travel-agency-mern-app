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
import { formatTripDetailsByLocale } from "@/utils/format-duration-by-locale";
import { useConfirm } from "material-ui-confirm";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router-dom";
import i18n from "@/locales/i18n";

const ProfilePage = () => {
  const profile = useLoaderData() as ProfilePageLoaderType;
  const { isLoading } = useAppSelector((state) => state.usersSlice.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { t } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const profileData = Object.fromEntries(formData);
    dispatch(updateUser({ id: profile._id, data: profileData }));
  };
  const handleDelete = async () => {
    try {
      const result = await confirm({
        title: `${t("user-profile.confirmTitle")}`,
        description: `${t("user-profile.confirmDescription")}`,
        confirmationText: `${t("user-profile.confirmYes")}`,
        cancellationText: `${t("user-profile.confirmNo")}`,
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
        <Title text={t("user-profile.title")} />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Summary block */}
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-2 md:col-span-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("user-profile.name")} :</span>{" "}
              {profile?.username}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{t("user-profile.email")} :</span>{" "}
              {profile?.email}
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
                label={t("user-profile.firstname")}
                name="firstname"
                defaultValue={profile.firstname || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label={t("user-profile.familyname")}
                name="familyname"
                defaultValue={profile.familyname || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label={t("user-profile.address")}
                name="address"
                defaultValue={profile.address || ""}
                classname="w-full sm:col-span-2"
              />
              <CustomInput
                type="search"
                label={t("user-profile.town")}
                name="town"
                defaultValue={profile.town || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label={t("user-profile.zip")}
                name="zip"
                defaultValue={profile.zip || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label={t("user-profile.country")}
                name="country"
                defaultValue={profile.country || ""}
                classname="w-full"
              />
              <CustomInput
                type="search"
                label={t("user-profile.phone")}
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
                {isLoading
                  ? `${t("user-profile.updating")}`
                  : `${t("user-profile.update")}`}
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="rounded-full px-6"
                onClick={handleDelete}
              >
                {t("user-profile.delete")}
              </Button>
            </div>
          </form>
        </div>

        {/* Orders */}
        {/* TABLE EN VERSION DESKTOP */}
        <div className="space-y-4">
          <Title text={t("user-profile.ordersTitle")} />

          {profile.orders.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              {t("user-profile.noOrders")}
            </p>
          ) : (
            <>
              {/* TABLE EN VERSION DESKTOP */}
              <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-md responsive-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("user-profile.table.trip")}</TableHead>
                      <TableHead>{t("user-profile.table.email")}</TableHead>
                      <TableHead>{t("user-profile.table.firstname")}</TableHead>
                      <TableHead>
                        {t("user-profile.table.familyname")}
                      </TableHead>
                      <TableHead>{t("user-profile.table.paid")}</TableHead>
                      <TableHead>{t("user-profile.table.details")}</TableHead>
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
                          <TableCell>{title[lang]}</TableCell>
                          <TableCell>{email}</TableCell>
                          <TableCell>{firstname}</TableCell>
                          <TableCell>{familyname}</TableCell>
                          <TableCell>
                            {formatAsEuros(totalPrice + hotelTax)}
                          </TableCell>
                          <TableCell>
                            {formatTripDetailsByLocale(duration, adults, kids)}
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
                        <span>{t("user-profile.card.trip")} :</span>
                        {title[lang]}
                      </p>
                      <p>
                        <span>{t("user-profile.card.email")} :</span>
                        {email}
                      </p>
                      <p>
                        <span>{t("user-profile.card.name")} :</span>
                        {firstname} {familyname}
                      </p>
                      <p>
                        <span>{t("user-profile.card.paid")} :</span>
                        {formatAsEuros(totalPrice + hotelTax)}
                      </p>
                      <p>
                        <span>{t("user-profile.card.details")} :</span>
                        {formatTripDetailsByLocale(duration, adults, kids)}
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
