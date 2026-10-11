import { useMemo } from "react";
import { CONTRAST_WARNING_THRESHOLD } from "../../../shared/constants";
import { contrastRatio, relativeLuminance } from "../../../shared/utils";
import { useQRConfig } from "../../../store";
import type { ContrastAssessment } from "../types";

const ASSUMED_TRANSPARENT_BACKGROUND = "#ffffff";

export function useContrast(): ContrastAssessment {
  const { config } = useQRConfig();
  const { colors, gradient } = config;

  return useMemo(() => {
    const background = colors.transparentBackground
      ? ASSUMED_TRANSPARENT_BACKGROUND
      : colors.background;
    const dotColors = gradient.enabled
      ? [gradient.from, gradient.to]
      : [colors.dots];

    const ratio = Math.min(
      ...dotColors.map((color) => contrastRatio(color, background)),
    );
    const backgroundLuminance = relativeLuminance(background);
    const isInverted = dotColors.every(
      (color) => relativeLuminance(color) > backgroundLuminance,
    );

    return {
      ratio,
      isLow: ratio < CONTRAST_WARNING_THRESHOLD,
      isInverted,
      transparentBackground: colors.transparentBackground,
    };
  }, [colors, gradient]);
}
