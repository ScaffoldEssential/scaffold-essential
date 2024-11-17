"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavbarComponent } from "./navbar";
import { Toaster } from "./ui/toaster";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const ScaffoldEssentialAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarComponent />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
