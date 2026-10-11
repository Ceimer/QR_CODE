import { useState } from "react";
import { Button } from "../../../shared/components";
import { downloadBlob } from "../../../shared/utils";
import { getQRInstance } from "../../qr-preview";

type ExportFormat = "png" | "svg";

export function DownloadButtons() {
  const [pending, setPending] = useState<ExportFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (format: ExportFormat) => {
    const instance = getQRInstance();
    if (!instance) {
      setError("La vista previa aún no está lista.");
      return;
    }

    setError(null);
    setPending(format);
    try {
      const data = await instance.getRawData(format);
      if (data instanceof Blob) {
        downloadBlob(data, `qr-color-studio.${format}`);
      } else {
        setError("No se pudo generar el archivo.");
      }
    } catch {
      setError("No se pudo generar el archivo.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => handleDownload("png")}
          disabled={pending !== null}
        >
          {pending === "png" ? "Generando…" : "Descargar PNG"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleDownload("svg")}
          disabled={pending !== null}
        >
          {pending === "svg" ? "Generando…" : "Descargar SVG"}
        </Button>
      </div>
      {error ? (
        <p className="text-sm text-rose-600 dark:text-rose-400" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
}
