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
  birthDate?: Date;
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
  address,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
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
      birthDate: address.birthDate,
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
        birthDate: data.birthDate,
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
          notify("Address successfully edited!");
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify("Address edit failed!", true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Editing address</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            Address's title <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="My Address"
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: "Address title is required!",
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            First name <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.firstName ? "3px solid red" : undefined,
            }}
            {...register("firstName", {
              required: "First name field is required!",
            })}
          />
          {errors.firstName && (
            <p className={styles.edit__form__error}>
              {errors.firstName?.message}
            </p>
          )}
        </div>

        <div>
          <p>Middle name</p>
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
          <p>Last name</p>
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
          <p>Username</p>
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
          <p>Gender</p>
          <select
            style={{
              outline: errors.gender ? "3px solid red" : undefined,
            }}
            {...register("gender")}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <p>Birth date</p>
          <Controller
            control={control}
            name="birthDate"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select birth date"
                showYearDropdown
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
          {errors.birthDate && (
            <p className={styles.edit__form__error}>
              {errors.birthDate?.message}
            </p>
          )}
        </div>

        <div>
          <p>Company</p>
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
            Address 1 <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.address1 ? "3px solid red" : undefined,
            }}
            {...register("address1", {
              required: "Address field is required!",
            })}
          />
          {errors.address1 && (
            <p className={styles.edit__form__error}>
              {errors.address1?.message}
            </p>
          )}
        </div>

        <div>
          <p>Address 2</p>
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
          <p>Address 3</p>
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
            City <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.city ? "3px solid red" : undefined,
            }}
            {...register("city", {
              required: "City field is required!",
            })}
          />
          {errors.city && (
            <p className={styles.edit__form__error}>{errors.city?.message}</p>
          )}
        </div>

        <div>
          <p>
            County <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.county ? "3px solid red" : undefined,
            }}
            {...register("county", {
              required: "County field is required!",
            })}
          />
          {errors.county && (
            <p className={styles.edit__form__error}>{errors.county?.message}</p>
          )}
        </div>

        <div>
          <p>
            State <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.state ? "3px solid red" : undefined,
            }}
            {...register("state", {
              required: "State field is required!",
            })}
          />
          {errors.state && (
            <p className={styles.edit__form__error}>{errors.state?.message}</p>
          )}
        </div>

        <div>
          <p>
            Zip code <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.zipCode ? "3px solid red" : undefined,
            }}
            {...register("zipCode", {
              required: "Zip code field is required!",
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
            Country <span style={{ color: "red" }}>*</span>
          </p>
          <input
            style={{
              outline: errors.country ? "3px solid red" : undefined,
            }}
            {...register("country", {
              required: "Country field is required!",
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
          <p>Phone number</p>
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
          <p>Note</p>
          <input
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
            Save Address
          </button>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.modalCancel}
            type="button"
            onClick={() => setEditModalIsOpen(false)}
            style={{
              background: "#ef233c",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
