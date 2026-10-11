import type { Options } from "qr-code-styling";
import type { QRConfig } from "../../shared/types";

const TRANSPARENT_COLOR = "#ffffff00";

export function buildQROptions(config: QRConfig): Options {
  const { colors, gradient, style, logo, size, content, errorCorrection } =
    config;

  const dotsOptions: Options["dotsOptions"] = gradient.enabled
    ? {
        type: style.dotsShape,
        gradient: {
          type: gradient.type,
          rotation: (gradient.rotation * Math.PI) / 180,
          colorStops: [
            { offset: 0, color: gradient.from },
            { offset: 1, color: gradient.to },
          ],
        },
      }
    : {
        type: style.dotsShape,
        color: colors.dots,
      };

  return {
    width: size,
    height: size,
    margin: 0,
    data: content.trim().length > 0 ? content : " ",
    image: logo.src ?? undefined,
    qrOptions: {
      errorCorrectionLevel: errorCorrection,
    },
    imageOptions: {
      hideBackgroundDots: logo.hideDotsBehind,
      imageSize: logo.size,
      margin: logo.margin,
      crossOrigin: "anonymous",
    },
    dotsOptions,
    cornersSquareOptions: {
      type: style.cornerSquareShape,
      color: colors.cornersSquare,
    },
    cornersDotOptions: {
      type: style.cornerDotShape,
      color: colors.cornersDot,
    },
    backgroundOptions: {
      color: colors.transparentBackground
        ? TRANSPARENT_COLOR
        : colors.background,
    },
  };
}
