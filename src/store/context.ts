import { createContext } from "react";
import type {
  ErrorCorrectionLevel,
  Gradient,
  Palette,
  QRColors,
  QRConfig,
  QRLogo,
  QRStyle,
} from "../shared/types";

export interface QRConfigActions {
  setContent: (content: string) => void;
  setColors: (patch: Partial<QRColors>) => void;
  setCornerColor: (color: string) => void;
  setGradient: (patch: Partial<Gradient>) => void;
  setStyle: (patch: Partial<QRStyle>) => void;
  setLogo: (patch: Partial<QRLogo>) => void;
  setSize: (size: number) => void;
  setErrorCorrection: (level: ErrorCorrectionLevel) => void;
  applyPalette: (palette: Palette) => void;
  reset: () => void;
}

export interface QRConfigContextValue extends QRConfigActions {
  config: QRConfig;
}

export const QRConfigContext = createContext<QRConfigContextValue | null>(null);
