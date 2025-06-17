import { axiosHelper } from "@/axios/axios-helper";
import type { ProfileFormData } from "@/types/dtos/profile-form-data";
import type { Profile } from "@/types/entities/profile";

export const updateUserThunk = async ({
  data,
  id,
}: {
  data: ProfileFormData;
  id: string;
}): Promise<Profile | null> => {
  try {
    const response = await axiosHelper.patch<Profile>(`/profile/${id}`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserThunk = async ({
  id,
}: {
  id: string;
}): Promise<string | null> => {
  try {
    const response = await axiosHelper.delete<string>(`/profile/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
