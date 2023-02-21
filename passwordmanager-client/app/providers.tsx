"use client";

import { ReactNode } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

type ProviderProps = {
  children?: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
