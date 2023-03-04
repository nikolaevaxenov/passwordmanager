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
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

type PaymentCardEditFormData = {
  title?: string;
  cardBrand?: string;
  number?: string;
  securityCode?: string;
  expirationDate?: string;
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentCardEditFormData>({
    defaultValues: {
      title: paymentCard.title,
      cardBrand: paymentCard.cardBrand,
      number: paymentCard.number,
      securityCode: paymentCard.securityCode,
      expirationDate: paymentCard.expirationDate,
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
        cardBrand: data.cardBrand,
        number: data.number,
        securityCode: data.securityCode,
        expirationDate: data.expirationDate,
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
            Card brand <span style={{ color: "red" }}>*</span>
          </p>
          <select
            style={{
              outline: errors.cardBrand ? "3px solid red" : undefined,
            }}
            {...register("cardBrand", {
              required: "Card brand is required!",
            })}
          >
            <option value="VISA">Visa</option>
            <option value="MASTERCARD">Master card</option>
            <option value="AMERICAN_EXPRESS">American Express</option>
            <option value="DISCOVER">Discover</option>
            <option value="UNION_PAY">Union Pay</option>
            <option value="JCB">JCB</option>
            <option value="MIR">MIR</option>
          </select>
          {errors.cardBrand && (
            <p className={styles.edit__form__error}>
              {errors.cardBrand?.message}
            </p>
          )}
        </div>

        <div>
          <p>
            Card number <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="4210 2489 5875 5593"
            type="text"
            style={{
              outline: errors.number ? "3px solid red" : undefined,
            }}
            {...register("number", {
              required: "Card number is required!",
            })}
          />
          {errors.number && (
            <p className={styles.edit__form__error}>{errors.number?.message}</p>
          )}
        </div>

        <div>
          <p>
            Expiration date <span style={{ color: "red" }}>*</span>
          </p>
          <input
            placeholder="01/24"
            style={{
              outline: errors.expirationDate ? "3px solid red" : undefined,
            }}
            {...register("expirationDate", {
              required: "Expiration date is required!",
            })}
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
            style={{
              outline: errors.securityCode ? "3px solid red" : undefined,
            }}
            {...register("securityCode", {
              required: "Security code is required!",
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

        <button
          type="submit"
          style={{
            background: "#60d394",
          }}
        >
          Save payment card
        </button>
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
      </form>
    </div>
  );
}
