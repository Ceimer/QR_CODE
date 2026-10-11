import { useContext } from "react";
import { QRConfigContext } from "./context";
import type { QRConfigContextValue } from "./context";

export function useQRConfig(): QRConfigContextValue {
  const context = useContext(QRConfigContext);
  if (!context) {
    throw new Error("useQRConfig debe usarse dentro de un QRConfigProvider.");
  }
  return context;
}
