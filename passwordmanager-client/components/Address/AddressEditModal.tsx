"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  AddressData,
  editAddress,
  EditAddressData,
  Gender,
} from "@/services/addresses";
import styles from "@/styles/components/Address/AddressEditModal.module.scss";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type AddressEditFormData = {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  gender?: Gender;
  birthdate?: Date;
  company?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  phone?: string;
  note?: string;
};

export default function AddressEditModal({
  t,
  address,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["address"]["editModal"];
  address: AddressData;
  setEditModalIsOpen: Dispatch<SetStateAction<boolean>>;
  notify: (text: string, error?: boolean) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressEditFormData>({
    defaultValues: {
      title: address.title,
      firstName: address.firstName,
      middleName: address.middleName,
      lastName: address.lastName,
      username: address.username,
      gender: address.gender,
      birthdate: address.birthdate,
      company: address.company,
      address1: address.address1,
      address2: address.address2,
      address3: address.address3,
      city: address.city,
      county: address.county,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      email: address.email,
      phone: address.phone,
      note: address.note,
    },
  });

  const mutation = useMutation((credentials: EditAddressData) =>
    editAddress(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        id: address.id,
        title: data.title,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        username: data.username,
        gender: data.gender,
        birthdate: data.birthdate,
        company: data.company,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        city: data.city,
        county: data.county,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        email: data.email,
        phone: data.phone,
        note: data.note,
      },
      {
        onSuccess: () => {
          setEditModalIsOpen(false);
          notify(t.editedNotify);
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify(t.editFailedNotify, true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>{t.header}</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            {t.title} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder={t.titlePlaceholder}
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: t.titleRequired,
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.firstName} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.firstName ? "3px solid red" : undefined,
            }}
            {...register("firstName", {
              required: t.firstNameRequired,
            })}
          />
          {errors.firstName && (
            <p className={styles.edit__form__error}>
              {errors.firstName?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.middleName}</p>
          <input
            style={{
              outline: errors.middleName ? "3px solid red" : undefined,
            }}
            {...register("middleName")}
          />
          {errors.middleName && (
            <p className={styles.edit__form__error}>
              {errors.middleName?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.lastName}</p>
          <input
            style={{
              outline: errors.lastName ? "3px solid red" : undefined,
            }}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={styles.edit__form__error}>
              {errors.lastName?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.username}</p>
          <input
            style={{
              outline: errors.username ? "3px solid red" : undefined,
            }}
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.edit__form__error}>
              {errors.username?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.gender.text}</p>
          <select
            style={{
              outline: errors.gender ? "3px solid red" : undefined,
            }}
            {...register("gender")}
          >
            <option value="MALE">{t.gender.male}</option>
            <option value="FEMALE">{t.gender.female}</option>
            <option value="OTHER">{t.gender.other}</option>
          </select>
          {errors.gender && (
            <p className={styles.edit__form__error}>{errors.gender?.message}</p>
          )}
        </div>

        <div>
          <p>{t.birthdate}</p>
          <Controller
            control={control}
            name="birthdate"
            render={({ field }) => (
              <DatePicker
                placeholderText={t.birthdatePlaceholder}
                showYearDropdown
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
          {errors.birthdate && (
            <p className={styles.edit__form__error}>
              {errors.birthdate?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.company}</p>
          <input
            style={{
              outline: errors.company ? "3px solid red" : undefined,
            }}
            {...register("company")}
          />
          {errors.company && (
            <p className={styles.edit__form__error}>
              {errors.company?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            {t.address1} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.address1 ? "3px solid red" : undefined,
            }}
            {...register("address1", {
              required: t.address1Required,
            })}
          />
          {errors.address1 && (
            <p className={styles.edit__form__error}>
              {errors.address1?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.address2}</p>
          <input
            style={{
              outline: errors.address2 ? "3px solid red" : undefined,
            }}
            {...register("address2")}
          />
          {errors.address2 && (
            <p className={styles.edit__form__error}>
              {errors.address2?.message}
            </p>
          )}
        </div>

        <div>
          <p>{t.address3}</p>
          <input
            style={{
              outline: errors.address3 ? "3px solid red" : undefined,
            }}
            {...register("address3")}
          />
          {errors.address3 && (
            <p className={styles.edit__form__error}>
              {errors.address3?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            {t.city} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.city ? "3px solid red" : undefined,
            }}
            {...register("city", {
              required: t.cityRequired,
            })}
          />
          {errors.city && (
            <p className={styles.edit__form__error}>{errors.city?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.county} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.county ? "3px solid red" : undefined,
            }}
            {...register("county", {
              required: t.countyRequired,
            })}
          />
          {errors.county && (
            <p className={styles.edit__form__error}>{errors.county?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.state} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.state ? "3px solid red" : undefined,
            }}
            {...register("state", {
              required: t.stateRequired,
            })}
          />
          {errors.state && (
            <p className={styles.edit__form__error}>{errors.state?.message}</p>
          )}
        </div>

        <div>
          <p>
            {t.zipCode} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.zipCode ? "3px solid red" : undefined,
            }}
            {...register("zipCode", {
              required: t.zipCodeRequired,
            })}
          />
          {errors.zipCode && (
            <p className={styles.edit__form__error}>
              {errors.zipCode?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            {t.country} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.country ? "3px solid red" : undefined,
            }}
            {...register("country", {
              required: t.countryRequired,
            })}
          />
          {errors.country && (
            <p className={styles.edit__form__error}>
              {errors.country?.message}
            </p>
          )}
        </div>

        <div>
          <p>Email</p>
          <input
            style={{
              outline: errors.email ? "3px solid red" : undefined,
            }}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.edit__form__error}>{errors.email?.message}</p>
          )}
        </div>

        <div>
          <p>{t.phone}</p>
          <input
            style={{
              outline: errors.phone ? "3px solid red" : undefined,
            }}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={styles.edit__form__error}>{errors.phone?.message}</p>
          )}
        </div>

        <div>
          <p>{t.note}</p>
          <textarea
            style={{
              outline: errors.note ? "3px solid red" : undefined,
            }}
            {...register("note")}
          />
          {errors.note && (
            <p className={styles.edit__form__error}>{errors.note?.message}</p>
          )}
        </div>

        <div className={styles.buttons}>
          <button
            type="submit"
            style={{
              background: "#60d394",
            }}
          >
            {t.saveButton}
          </button>
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => setEditModalIsOpen(false)}
            style={{
              background: "#ef233c",
            }}
          >
            {t.cancelButton}
          </button>
        </div>
      </form>
    </div>
  );
}
