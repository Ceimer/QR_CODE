import { Field, OptionGroup, Panel, Slider } from "../../../shared/components";
import {
  MAX_QR_SIZE,
  MIN_QR_SIZE,
  QR_SIZE_STEP,
} from "../../../shared/constants";
import type {
  CornerShape,
  DotShape,
  ErrorCorrectionLevel,
} from "../../../shared/types";
import { useQRConfig } from "../../../store";

const dotShapeOptions = [
  { value: "square" as const, label: "Cuadrado" },
  { value: "rounded" as const, label: "Redondeado" },
  { value: "dots" as const, label: "Puntos" },
  { value: "classy" as const, label: "Elegante" },
  { value: "classy-rounded" as const, label: "Elegante redondeado" },
  { value: "extra-rounded" as const, label: "Extrarredondeado" },
];

const cornerShapeOptions = [
  { value: "square" as const, label: "Cuadrada" },
  { value: "extra-rounded" as const, label: "Redondeada" },
  { value: "dot" as const, label: "Punto" },
];

const errorCorrectionOptions = [
  { value: "L" as const, label: "L — Baja (~7%)" },
  { value: "M" as const, label: "M — Media (~15%)" },
  { value: "Q" as const, label: "Q — Alta (~25%)" },
  { value: "H" as const, label: "H — Máxima (~30%)" },
];

export function StyleControls() {
  const { config, setStyle, setSize, setErrorCorrection } = useQRConfig();
  const { style, size, errorCorrection, logo } = config;
  const correctionLocked = Boolean(logo.src);

  return (
    <Panel title="Estilo" description="Formas, tamaño y corrección de errores.">
      <OptionGroup<DotShape>
        name="dots-shape"
        label="Forma de los puntos"
        value={style.dotsShape}
        options={dotShapeOptions}
        onChange={(dotsShape) => setStyle({ dotsShape })}
      />

      <OptionGroup<CornerShape>
        name="corner-shape"
        label="Forma de las esquinas"
        value={style.cornerSquareShape}
        options={cornerShapeOptions}
        onChange={(cornerSquareShape) =>
          setStyle({ cornerSquareShape, cornerDotShape: cornerSquareShape })
        }
      />

      <Field
        label="Tamaño de exportación"
        htmlFor="qr-size"
        hint="Se aplica al descargar el QR (256–1024 px)."
      >
        <Slider
          id="qr-size"
          min={MIN_QR_SIZE}
          max={MAX_QR_SIZE}
          step={QR_SIZE_STEP}
          value={size}
          suffix=" px"
          onChange={setSize}
        />
      </Field>

      <OptionGroup<ErrorCorrectionLevel>
        name="error-correction"
        label="Corrección de errores"
        value={errorCorrection}
        options={errorCorrectionOptions}
        disabled={correctionLocked}
        onChange={setErrorCorrection}
      />
      {correctionLocked ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Con un logo central se usa automáticamente el nivel H.
        </p>
      ) : null}
    </Panel>
  );
}
