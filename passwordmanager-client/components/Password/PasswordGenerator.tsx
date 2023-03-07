"use client";

import styles from "@/styles/components/Password/PasswordGenerator.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { generate } from "generate-password";
import { PasswordAddFormData } from "@/components/Password/PasswordAddModal";
import { PasswordEditFormData } from "@/components/Password/PasswordEditModal";

type PasswordGeneratorFormData = {
  passwordLength: string;
  allowNumbers: boolean;
  allowUppercase: boolean;
  allowSymbols: boolean;
};

export default function PasswordGenerator({
  setShowPasswordGenerator,
  setValue,
}: {
  setShowPasswordGenerator: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<PasswordAddFormData | PasswordEditFormData>;
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
          <p>Password length</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowNumbers")} />
          <p>Allow numbers (0-9)</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowUppercase")} />
          <p>Allow uppercase (A-Z)</p>
        </div>

        <div>
          <input type="checkbox" {...register("allowSymbols")} />
          <p>Allow symbols (!@#$%^&*()+)</p>
        </div>

        <div className={styles.main__buttons}>
          <button
            type="submit"
            style={{
              background: "#60d394",
            }}
          >
            Generate
          </button>
          <button
            className={styles.modalCancel}
            type="button"
            onClick={() => setShowPasswordGenerator(false)}
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
