"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import {
  editPaymentCard,
  EditPaymentCardData,
  PaymentCardData,
} from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardEditModal.module.scss";
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

type PaymentCardEditFormData = {
  title?: string;
  number?: string;
  securityCode?: string;
  expirationDate?: Date;
  note?: string;
};

export default function PaymentCardEditModal({
  paymentCard,
  setEditModalIsOpen,
  notify,
  refetch,
}: {
  paymentCard: PaymentCardData;
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
    setValue,
    formState: { errors },
  } = useForm<PaymentCardEditFormData>({
    defaultValues: {
      title: paymentCard.title,
      number: paymentCard.number,
      securityCode: paymentCard.securityCode,
      note: paymentCard.note,
    },
  });

  const mutation = useMutation((credentials: EditPaymentCardData) =>
    editPaymentCard(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        id: paymentCard.id,
        title: data.title,
        number: data.number,
        securityCode: data.securityCode,
        expirationDate: data.expirationDate?.toISOString(),
        note: data.note,
      },
      {
        onSuccess: () => {
          setEditModalIsOpen(false);
          notify("Payment card successfully edited!");
          refetch();
        },
        onError: () => {
          setEditModalIsOpen(false);
          notify("Payment card edit failed!", true);
        },
      }
    );
  });

  return (
    <div className={styles.main}>
      <h1>Editing payment card</h1>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <p>
            Payment card's title <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="My payment card"
            style={{
              outline: errors.title ? "3px solid red" : undefined,
            }}
            {...register("title", {
              required: "Payment card title is required!",
            })}
          />
          {errors.title && (
            <p className={styles.edit__form__error}>{errors.title?.message}</p>
          )}
        </div>

        <div>
          <p>
            Card number <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="4210 2489 5875 5593"
            type="text"
            maxLength={19}
            style={{
              outline: errors.number ? "3px solid red" : undefined,
            }}
            {...register("number", {
              required: "Card number is required!",
              maxLength: {
                value: 19,
                message: "Card number should have only 16 digits!",
              },
              minLength: {
                value: 19,
                message: "Card number should have only 16 digits!",
              },
              pattern: {
                value: /^(?=.*\d)[\d ]+$/,
                message: "Card number should have only digits!",
              },
            })}
            onKeyDown={(e) => {
              const backspacePressed = e.key !== "Backspace";
              const currentValue = e.currentTarget.value;
              if (backspacePressed) {
                const lengthNoSpaces = currentValue.replace(/ /g, "").length;
                if (
                  lengthNoSpaces !== 0 &&
                  lengthNoSpaces % 4 === 0 &&
                  currentValue.length < 17
                ) {
                  setValue("number", currentValue + " ");
                }
              } else {
                if (currentValue[currentValue.length - 2] === " ") {
                  setValue(
                    "number",
                    currentValue.slice(0, currentValue.length - 1)
                  );
                }
              }
            }}
          />
          {errors.number && (
            <p className={styles.edit__form__error}>{errors.number?.message}</p>
          )}
        </div>

        <div>
          <p>
            Expiration date <span style={{ color: "red" }}>*</span>
          </p>
          <Controller
            control={control}
            name="expirationDate"
            rules={{ required: "Card expiration date is required!" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select card expiration date"
                dateFormat="MM/yy"
                showMonthYearPicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
          {errors.expirationDate && (
            <p className={styles.edit__form__error}>
              {errors.expirationDate?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            Security code <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="024"
            type="password"
            maxLength={4}
            style={{
              outline: errors.securityCode ? "3px solid red" : undefined,
            }}
            {...register("securityCode", {
              required: "Security code is required!",
              maxLength: {
                value: 4,
                message: "Card security code should have only 3 or 4 digits!",
              },
              minLength: {
                value: 3,
                message: "Card security code should have only 3 or 4 digits!",
              },
              pattern: {
                value: /^(?=.*\d)[\d ]+$/,
                message: "Card security code should have only digits!",
              },
            })}
          />
          {errors.securityCode && (
            <p className={styles.edit__form__error}>
              {errors.securityCode?.message}
            </p>
          )}
        </div>

        <div>
          <p>Note</p>
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
            Add payment card
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
