import { useQRConfig } from "../../../store";
import { useQRInstance } from "../hooks/useQRInstance";

export function QRPreview() {
  const { config } = useQRConfig();
  const containerRef = useQRInstance(config);
  const transparent = config.colors.transparentBackground;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div
        ref={containerRef}
        role="img"
        aria-label="Vista previa del código QR"
        className={`qr-stage mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl ${
          transparent ? "qr-checkerboard p-3" : ""
        }`}
      />
    </div>
  );
}
