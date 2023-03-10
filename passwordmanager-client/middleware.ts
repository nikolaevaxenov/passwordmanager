import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: ["en", "ru"],

  defaultLocale: "ru",
});

export const config = {
  matcher: ["/((?!api|_next|favicon.png|assets).*)"],
};
