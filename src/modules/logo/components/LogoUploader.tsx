import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button, Field, Panel, Slider, Toggle } from "../../../shared/components";
import {
  MAX_LOGO_FILE_SIZE,
  MAX_LOGO_SIZE,
  MIN_LOGO_SIZE,
} from "../../../shared/constants";
import { useQRConfig } from "../../../store";

export function LogoUploader() {
  const { config, setLogo } = useQRConfig();
  const { logo } = config;
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (PNG, JPG o SVG).");
      return;
    }
    if (file.size > MAX_LOGO_FILE_SIZE) {
      setError("La imagen no puede superar los 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setError(null);
        setLogo({ src: reader.result });
      }
    };
    reader.onerror = () => {
      setError("No se pudo leer la imagen.");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Panel
      title="Logo"
      description="Añade una imagen en el centro. Se sube la corrección de errores a H."
    >
      <Field label="Imagen del logo" htmlFor="logo-file">
        <input
          id="logo-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white text-sm text-slate-600 file:mr-3 file:rounded-l-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:file:bg-slate-800 dark:file:text-slate-200"
        />
      </Field>

      {error ? (
        <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      ) : null}

      {logo.src ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo.src}
              alt="Vista previa del logo"
              className="h-14 w-14 rounded-lg border border-slate-200 bg-slate-50 object-contain p-1 dark:border-slate-700 dark:bg-slate-800"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Logo cargado
            </span>
          </div>

          <Field label="Tamaño del logo" htmlFor="logo-size">
            <Slider
              id="logo-size"
              min={Math.round(MIN_LOGO_SIZE * 100)}
              max={Math.round(MAX_LOGO_SIZE * 100)}
              step={5}
              value={Math.round(logo.size * 100)}
              suffix=" %"
              onChange={(value) => setLogo({ size: value / 100 })}
            />
          </Field>

          <Field label="Margen alrededor del logo" htmlFor="logo-margin">
            <Slider
              id="logo-margin"
              min={0}
              max={32}
              step={1}
              value={logo.margin}
              suffix=" px"
              onChange={(margin) => setLogo({ margin })}
            />
          </Field>

          <Toggle
            id="logo-hide-dots"
            label="Ocultar los puntos detrás del logo"
            checked={logo.hideDotsBehind}
            onChange={(hideDotsBehind) => setLogo({ hideDotsBehind })}
          />

          <div>
            <Button variant="danger" onClick={() => setLogo({ src: null })}>
              Quitar logo
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sin logo. El QR se genera solo con los módulos.
        </p>
      )}
    </Panel>
  );
}
