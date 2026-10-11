import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../../../shared/types";
import { useDebouncedValue } from "../../../shared/hooks";
import { buildQROptions } from "../buildOptions";
import { setQRInstance } from "../qrInstance";

export function useQRInstance(config: QRConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedConfig = useDebouncedValue(config, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = new QRCodeStyling(buildQROptions(debouncedConfig));
    container.innerHTML = "";
    instance.append(container);
    setQRInstance(instance);

    return () => {
      setQRInstance(null);
      container.innerHTML = "";
    };
  }, [debouncedConfig]);

  return containerRef;
}
