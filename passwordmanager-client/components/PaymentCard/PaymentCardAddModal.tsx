"use client";

import { selectAuthToken } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/hooks";
import { addNewPaymentCard, NewPaymentCardData } from "@/services/paymentCards";
import styles from "@/styles/components/PaymentCard/PaymentCardAddModal.module.scss";
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

type PaymentCardAddFormData = {
  title: string;
  number: string;
  securityCode: string;
  expirationDate: Date;
  note?: string;
};

export default function PaymentCardAddModal({
  t,
  setAddModalIsOpen,
  notify,
  refetch,
}: {
  t: Messages["ProfilePage"]["paymentCard"]["addModal"];
  setAddModalIsOpen: Dispatch<SetStateAction<boolean>>;
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
  } = useForm<PaymentCardAddFormData>();

  const mutation = useMutation((credentials: NewPaymentCardData) =>
    addNewPaymentCard(credentials)
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        token: authToken?.token || "",
        title: data.title,
        number: data.number,
        securityCode: data.securityCode,
        expirationDate: data.expirationDate.toISOString(),
        note: data.note,
      },
      {
        onSuccess: () => {
          setAddModalIsOpen(false);
          notify(t.addedNotify);
          refetch();
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
            {t.cardNumber} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="4210 2489 5875 5593"
            type="text"
            maxLength={19}
            style={{
              outline: errors.number ? "3px solid red" : undefined,
            }}
            {...register("number", {
              required: t.cardNumberRequired,
              maxLength: {
                value: 19,
                message: t.cardNumberLength,
              },
              minLength: {
                value: 19,
                message: t.cardNumberLength,
              },
              pattern: {
                value: /^(?=.*\d)[\d ]+$/,
                message: t.cardNumberDigits,
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
            {t.expirationDate} <span style={{ color: "red" }}>*</span>
          </p>
          <Controller
            control={control}
            name="expirationDate"
            rules={{ required: t.expirationDateRequired }}
            render={({ field }) => (
              <DatePicker
                placeholderText={t.expirationDatePlaceholder}
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
            {t.securityCode} <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="024"
            type="password"
            maxLength={4}
            style={{
              outline: errors.securityCode ? "3px solid red" : undefined,
            }}
            {...register("securityCode", {
              required: t.securityCodeRequired,
              maxLength: {
                value: 4,
                message: t.securityCodeLength,
              },
              minLength: {
                value: 3,
                message: t.securityCodeLength,
              },
              pattern: {
                value: /^(?=.*\d)[\d ]+$/,
                message: t.securityCodeDigits,
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
            {t.addButton}
          </button>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.modalCancel}
            type="button"
            onClick={() => setAddModalIsOpen(false)}
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
