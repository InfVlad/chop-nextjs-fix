"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";
import { DatePicker } from "../../../../components/date-picker";
import { GenderRadioGroup } from "../../../../components/gender-radio-group";

import axios from "axios";
import { type ProfileFormData, profileSchema } from "../../../../zod/validation-schema";
import { Logger } from "../../../../lib/logger";
import { getData } from "../../../../lib/utils";
import Loading from "../../loading";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {children}
  </div>
);

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [profile_picture, setProfilePicture] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [targetUser, setTargetUser] = useState<any>(undefined);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const t = useTranslations("");
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = methods;

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Assuming getData returns an object with an accessToken.
        const getUsername = await axios.get(
          `${baseUrl}/api/user/search-by-username/${params["user"]}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { id: user_id } = getUsername.data;
        const response = await axios.get(
          `${baseUrl}/api/user/profile-user/me?user_id=${user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const profileData = response.data;
        setProfilePicture(profileData.profile_picture);
        setTargetUser(profileData);
        reset({
          name: profileData.name ?? "",
          bio: profileData.bio ?? "",
          username: profileData.username ?? "",
          location: profileData.location ?? "",
          birthday: profileData.birthday
            ? new Date(profileData.birthday)
            : undefined,
          gender: profileData.gender ?? "",
          phone: profileData.phone_number ?? "",
        });
        if (user?.sub != targetUser?.id) {
          // Request to see if the user already follow the target user
          const relationshipUser = await axios.get(
            `${baseUrl}/api/contacts/users/${user?.sub}/relationship/${user_id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (relationshipUser.data) {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (isLoading) return <Loading />;

  const followUser = async (currentUser: string, targetUser: string) => {
    await axios.post(
      `${baseUrl}/api/contacts/users/${targetUser}/follow?user_id=${currentUser}`
    );

    setIsFollowed(true);
  };

  const unfollowUser = async (currentUser: string, targetUser: string) => {
    await axios.delete(
      `${baseUrl}/api/contacts/users/${targetUser}/unfollow?user_id=${currentUser}`
    );

    setIsFollowed(false);
  };
  return (
    user && (
      <FormProvider {...methods}>
        <form>
          <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col flex-1 w-full max-w-md justify-center space-y-4 p-4 md:p-6">
              <h1 className="text-2xl">Profile</h1>
              <div className="flex items-center">
                <Avatar className="h-20 w-20 cursor-pointer items-center justify-center">
                  <AvatarImage
                    src={profile_picture}
                    alt={getValues("username")}
                  />
                  <AvatarFallback>
                    {user.name ? user.name.substring(0, 2).toUpperCase() : "NA"}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
              <FormField label={t("Name")} id="name">
                <Input
                  disabled
                  id="name"
                  placeholder={t("Enter_your_name")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Username")} id="username">
                <Input
                  id="username"
                  disabled
                  placeholder={t("Enter_your_username")}
                  {...register("username")}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Bio")} id="bio">
                <Textarea
                  id="bio"
                  disabled
                  placeholder={t("Enter_your_bio")}
                  className="min-h-[100px]"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bio.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Location")} id="location">
                <Input
                  disabled
                  id="location"
                  placeholder={t("Enter_your_location")}
                  {...register("location")}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Birthday")} id="birthday">
                <DatePicker name="birthday" />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.birthday.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Phone")} id="phone">
                <Input
                  disabled
                  id="phone"
                  placeholder={t("Enter_your_phone_number")}
                  type="tel"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </FormField>

              <FormField label={t("Gender")} id="gender">
                <GenderRadioGroup name="gender" />
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </FormField>
            </div>
          </div>
        </form>
        {user.sub != targetUser?.id && (
          <div className="flex justify-center items-center ">
            {isFollowed ? (
              <Button
                onClick={async () => {
                  await unfollowUser(user?.sub ?? "", targetUser?.id);
                }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  await followUser(user?.sub ?? "", targetUser?.id);
                }}
              >
                Follow
              </Button>
            )}
          </div>
        )}
      </FormProvider>
    )
  );
}
