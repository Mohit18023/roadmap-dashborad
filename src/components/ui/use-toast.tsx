// hooks/use-toast.tsx
import { useCallback, useState } from "react";

export type ToastType = "success" | "error" | "warning";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000); // auto-dismiss in 4s
  }, []);

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(({ id, type, message }) => (
        <div
          key={id}
          className={`flex items-center w-full max-w-xs p-4 mb-2 text-sm rounded-lg shadow-sm dark:bg-gray-800 ${
            type === "success"
              ? "text-green-500 bg-white dark:text-green-200 dark:bg-green-800"
              : type === "error"
              ? "text-red-500 bg-white dark:text-red-200 dark:bg-red-800"
              : "text-orange-500 bg-white dark:text-orange-200 dark:bg-orange-700"
          }`}
          role="alert"
        >
          <div className="inline-flex items-center justify-center w-8 h-8 bg-opacity-10 rounded-lg">
            {type === "success" && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            )}
            {type === "error" && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
            )}
            {type === "warning" && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
            )}
          </div>
          <div className="ms-3 text-sm font-normal">{message}</div>
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
}
