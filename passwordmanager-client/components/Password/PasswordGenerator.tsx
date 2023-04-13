"use client";

import { PasswordAddFormData } from "@/components/Password/PasswordAddModal";
import { PasswordEditFormData } from "@/components/Password/PasswordEditModal";
import styles from "@/styles/components/Password/PasswordGenerator.module.scss";
import { generate } from "generate-password";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";

type PasswordGeneratorFormData = {
  passwordLength: string;
  allowNumbers: boolean;
  allowUppercase: boolean;
  allowSymbols: boolean;
};

export default function PasswordGenerator({
  t,
  setShowPasswordGenerator,
  setValue,
}: {
  t: Messages["ProfilePage"]["password"]["passwordGenerator"];
  setShowPasswordGenerator: Dispatch<SetStateAction<boolean>>;
  setValue:
    | UseFormSetValue<PasswordAddFormData>
    | UseFormSetValue<PasswordEditFormData>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordGeneratorFormData>({
    defaultValues: {
      passwordLength: "16",
      allowNumbers: true,
      allowUppercase: true,
      allowSymbols: true,
    },
  });

  const onSubmit = handleSubmit((data) => {
    setValue(
      "password",
      generate({
        length: Number(data.passwordLength),
        numbers: data.allowNumbers,
        symbols: data.allowSymbols,
        uppercase: data.allowUppercase,
      })
    );
  });

  return (
    <div className={styles.main}>
      <form className={styles.edit__form} onSubmit={onSubmit}>
        <div>
          <select
            style={{
              outline: errors.passwordLength ? "3px solid red" : undefined,
            }}
            {...register("passwordLength")}
          >
            {Array(27)
              .fill(0)
              .map((_, l) => (
                <option key={l + 6} value={l + 6}>
                  {l + 6}
                </option>
              ))}
          </select>
          <p>{t.passwordLength}</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowNumbers")} />
          <p>{t.allowNumbers}</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowUppercase")} />
          <p>{t.allowUppercase}</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowSymbols")} />
          <p>{t.allowSymbols}</p>
        </div>

        <div className={styles.main__buttons}>
          <button
            type="submit"
            style={{
              background: "#60d394",
            }}
          >
            {t.generateButton}
          </button>
          <button
            className={styles.modalCancel}
            type="button"
            onClick={() => setShowPasswordGenerator(false)}
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
