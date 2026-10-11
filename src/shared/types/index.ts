export type GradientType = "linear" | "radial";

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type DotShape =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

export type CornerShape = "square" | "extra-rounded" | "dot";

export interface Gradient {
  enabled: boolean;
  type: GradientType;
  rotation: number;
  from: string;
  to: string;
}

export interface QRColors {
  dots: string;
  background: string;
  cornersSquare: string;
  cornersDot: string;
  transparentBackground: boolean;
}

export interface QRStyle {
  dotsShape: DotShape;
  cornerSquareShape: CornerShape;
  cornerDotShape: CornerShape;
}

export interface QRLogo {
  src: string | null;
  size: number;
  margin: number;
  hideDotsBehind: boolean;
}

export interface QRConfig {
  content: string;
  colors: QRColors;
  gradient: Gradient;
  style: QRStyle;
  logo: QRLogo;
  size: number;
  errorCorrection: ErrorCorrectionLevel;
}

export interface Palette {
  id: string;
  name: string;
  dots: string;
  background: string;
  corners: string;
  transparentBackground?: boolean;
  gradient?: {
    from: string;
    to: string;
  };
}
