import { useEffect, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_QR_CONFIG,
  MAX_QR_SIZE,
  MIN_QR_SIZE,
  QR_STORAGE_KEY,
} from "../shared/constants";
import type {
  ErrorCorrectionLevel,
  Gradient,
  Palette,
  QRColors,
  QRConfig,
  QRLogo,
  QRStyle,
} from "../shared/types";
import { QRConfigContext } from "./context";
import type { QRConfigContextValue } from "./context";

type Action =
  | { type: "setContent"; content: string }
  | { type: "setColors"; patch: Partial<QRColors> }
  | { type: "setCornerColor"; color: string }
  | { type: "setGradient"; patch: Partial<Gradient> }
  | { type: "setStyle"; patch: Partial<QRStyle> }
  | { type: "setLogo"; patch: Partial<QRLogo> }
  | { type: "setSize"; size: number }
  | { type: "setErrorCorrection"; level: ErrorCorrectionLevel }
  | { type: "applyPalette"; palette: Palette }
  | { type: "reset" };

function clampSize(size: number): number {
  return Math.min(MAX_QR_SIZE, Math.max(MIN_QR_SIZE, Math.round(size)));
}

function cloneConfig(config: QRConfig): QRConfig {
  return {
    ...config,
    colors: { ...config.colors },
    gradient: { ...config.gradient },
    style: { ...config.style },
    logo: { ...config.logo },
  };
}

function applyLogo(state: QRConfig, patch: Partial<QRLogo>): QRConfig {
  const logo = { ...state.logo, ...patch };
  return {
    ...state,
    logo,
    errorCorrection: logo.src ? "H" : state.errorCorrection,
  };
}

function reducer(state: QRConfig, action: Action): QRConfig {
  switch (action.type) {
    case "setContent":
      return { ...state, content: action.content };
    case "setColors":
      return { ...state, colors: { ...state.colors, ...action.patch } };
    case "setCornerColor":
      return {
        ...state,
        colors: {
          ...state.colors,
          cornersSquare: action.color,
          cornersDot: action.color,
        },
      };
    case "setGradient":
      return { ...state, gradient: { ...state.gradient, ...action.patch } };
    case "setStyle":
      return { ...state, style: { ...state.style, ...action.patch } };
    case "setLogo":
      return applyLogo(state, action.patch);
    case "setSize":
      return { ...state, size: clampSize(action.size) };
    case "setErrorCorrection":
      return {
        ...state,
        errorCorrection: state.logo.src ? "H" : action.level,
      };
    case "applyPalette": {
      const { palette } = action;
      const colors: QRColors = {
        ...state.colors,
        dots: palette.dots,
        background: palette.background,
        cornersSquare: palette.corners,
        cornersDot: palette.corners,
        transparentBackground: palette.transparentBackground ?? false,
      };
      const gradient: Gradient = palette.gradient
        ? {
            ...state.gradient,
            enabled: true,
            from: palette.gradient.from,
            to: palette.gradient.to,
          }
        : { ...state.gradient, enabled: false };
      return { ...state, colors, gradient };
    }
    case "reset":
      return cloneConfig(DEFAULT_QR_CONFIG);
    default:
      return state;
  }
}

function mergeConfig(base: QRConfig, stored: unknown): QRConfig {
  if (!stored || typeof stored !== "object") {
    return cloneConfig(base);
  }
  const value = stored as Partial<QRConfig>;
  const merged = cloneConfig(base);

  if (typeof value.content === "string") {
    merged.content = value.content;
  }
  if (value.colors && typeof value.colors === "object") {
    merged.colors = { ...merged.colors, ...value.colors };
  }
  if (value.gradient && typeof value.gradient === "object") {
    merged.gradient = { ...merged.gradient, ...value.gradient };
  }
  if (value.style && typeof value.style === "object") {
    merged.style = { ...merged.style, ...value.style };
  }
  if (value.logo && typeof value.logo === "object") {
    merged.logo = { ...merged.logo, ...value.logo };
  }
  if (typeof value.size === "number") {
    merged.size = clampSize(value.size);
  }
  if (value.errorCorrection) {
    merged.errorCorrection = value.errorCorrection;
  }

  return merged;
}

function loadInitialConfig(): QRConfig {
  try {
    const raw = window.localStorage.getItem(QR_STORAGE_KEY);
    if (!raw) {
      return cloneConfig(DEFAULT_QR_CONFIG);
    }
    return mergeConfig(DEFAULT_QR_CONFIG, JSON.parse(raw));
  } catch {
    return cloneConfig(DEFAULT_QR_CONFIG);
  }
}

export function QRConfigProvider({ children }: { children: ReactNode }) {
  const [config, dispatch] = useReducer(reducer, undefined, loadInitialConfig);

  useEffect(() => {
    try {
      window.localStorage.setItem(QR_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Se ignora si el almacenamiento no está disponible o supera la cuota.
    }
  }, [config]);

  const value = useMemo<QRConfigContextValue>(
    () => ({
      config,
      setContent: (content) => dispatch({ type: "setContent", content }),
      setColors: (patch) => dispatch({ type: "setColors", patch }),
      setCornerColor: (color) => dispatch({ type: "setCornerColor", color }),
      setGradient: (patch) => dispatch({ type: "setGradient", patch }),
      setStyle: (patch) => dispatch({ type: "setStyle", patch }),
      setLogo: (patch) => dispatch({ type: "setLogo", patch }),
      setSize: (size) => dispatch({ type: "setSize", size }),
      setErrorCorrection: (level) =>
        dispatch({ type: "setErrorCorrection", level }),
      applyPalette: (palette) => dispatch({ type: "applyPalette", palette }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [config],
  );

  return (
    <QRConfigContext.Provider value={value}>
      {children}
    </QRConfigContext.Provider>
  );
}
