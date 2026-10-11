import type { QRConfig } from "../types";

export const MIN_QR_SIZE = 256;
export const MAX_QR_SIZE = 1024;
export const QR_SIZE_STEP = 8;
export const DEFAULT_QR_SIZE = 512;

export const MIN_LOGO_SIZE = 0.2;
export const MAX_LOGO_SIZE = 0.6;
export const DEFAULT_LOGO_SIZE = 0.4;
export const DEFAULT_LOGO_MARGIN = 8;
export const MAX_LOGO_FILE_SIZE = 2 * 1024 * 1024;

export const CONTRAST_WARNING_THRESHOLD = 3;

export const QR_STORAGE_KEY = "qr-color-studio:config:v1";

export const DEFAULT_QR_CONFIG: QRConfig = {
  content: "https://qr-color-studio.app",
  colors: {
    dots: "#111827",
    background: "#ffffff",
    cornersSquare: "#111827",
    cornersDot: "#111827",
    transparentBackground: false,
  },
  gradient: {
    enabled: false,
    type: "linear",
    rotation: 45,
    from: "#6366f1",
    to: "#ec4899",
  },
  style: {
    dotsShape: "rounded",
    cornerSquareShape: "extra-rounded",
    cornerDotShape: "dot",
  },
  logo: {
    src: null,
    size: DEFAULT_LOGO_SIZE,
    margin: DEFAULT_LOGO_MARGIN,
    hideDotsBehind: true,
  },
  size: DEFAULT_QR_SIZE,
  errorCorrection: "M",
};
