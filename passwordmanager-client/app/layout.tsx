import "@/styles/globals.scss";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <div className="wrapper">
            <div className="wrapper__header">
              <Navbar />
            </div>
            <div className="wrapper__content">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
