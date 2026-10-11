import { ColorInput, Field, OptionGroup, Panel, Slider, Toggle } from "../../../shared/components";
import type { GradientType } from "../../../shared/types";
import { useQRConfig } from "../../../store";

const gradientTypeOptions = [
  { value: "linear" as const, label: "Lineal" },
  { value: "radial" as const, label: "Radial" },
];

export function ColorControls() {
  const { config, setColors, setCornerColor, setGradient } = useQRConfig();
  const { colors, gradient } = config;

  return (
    <Panel title="Colores" description="Personaliza puntos, fondo y esquinas.">
      <ColorInput
        label="Color de puntos"
        value={colors.dots}
        disabled={gradient.enabled}
        onChange={(dots) => setColors({ dots })}
      />

      <Toggle
        id="gradient-enabled"
        label="Usar degradado en los puntos"
        checked={gradient.enabled}
        onChange={(enabled) => setGradient({ enabled })}
      />

      {gradient.enabled ? (
        <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <OptionGroup<GradientType>
            name="gradient-type"
            label="Tipo de degradado"
            value={gradient.type}
            options={gradientTypeOptions}
            onChange={(type) => setGradient({ type })}
          />
          <ColorInput
            label="Color inicial"
            value={gradient.from}
            onChange={(from) => setGradient({ from })}
          />
          <ColorInput
            label="Color final"
            value={gradient.to}
            onChange={(to) => setGradient({ to })}
          />
          <Field label="Ángulo" htmlFor="gradient-rotation">
            <Slider
              id="gradient-rotation"
              min={0}
              max={360}
              step={5}
              value={gradient.rotation}
              suffix="°"
              onChange={(rotation) => setGradient({ rotation })}
            />
          </Field>
        </div>
      ) : null}

      <ColorInput
        label="Color de fondo"
        value={colors.background}
        disabled={colors.transparentBackground}
        onChange={(background) => setColors({ background })}
      />

      <Toggle
        id="transparent-background"
        label="Fondo transparente"
        checked={colors.transparentBackground}
        onChange={(transparentBackground) =>
          setColors({ transparentBackground })
        }
      />

      <ColorInput
        label="Color de esquinas"
        value={colors.cornersSquare}
        onChange={(color) => setCornerColor(color)}
      />
    </Panel>
  );
}
