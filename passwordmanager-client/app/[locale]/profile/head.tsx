import { useTranslations } from "next-intl";

export default function Head() {
  const titleText = `${useTranslations("Title")("profile")} | PassStorage`;

  return (
    <>
      <title>{titleText}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="This service designed for storing user's credentials"
      />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  );
}
