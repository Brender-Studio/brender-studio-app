import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error-boundary/ErrorFallback";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              window.location.reload();
              window.location.href = '/'; 
            }}
            onError={(error) => {
              // console.log('info', info)
              console.error("Error capturado por ErrorBoundary:", error);
            }}
          >
            <App />
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster />
  </QueryClientProvider>
);
