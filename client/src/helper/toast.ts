import { toast, ToastOptions } from "react-toastify";
import { ReactNode } from "react";

const toastStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.55)",
  boxShadow: "0 4px 30px #4747470b",
  borderRadius: 16,
  backdropFilter: "blur(3.1px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

export const successToast = (message: string): ReactNode =>
  toast.success(message, { style: toastStyle } as ToastOptions);

export const errorToast = (message: string): ReactNode =>
  toast.error(message, { style: toastStyle } as ToastOptions);


