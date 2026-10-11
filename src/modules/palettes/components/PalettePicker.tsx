import { Panel } from "../../../shared/components";
import { useQRConfig } from "../../../store";
import { PALETTES } from "../constants";

export function PalettePicker() {
  const { applyPalette } = useQRConfig();

  return (
    <Panel
      title="Paletas"
      description="Aplica un esquema de color predefinido con un clic."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PALETTES.map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => applyPalette(palette)}
            aria-label={`Aplicar paleta ${palette.name}`}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-400 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500"
          >
            <span className="flex gap-1">
              <span
                className="h-6 w-6 rounded-md"
                style={{ backgroundColor: palette.dots }}
              />
              <span
                className="h-6 w-6 rounded-md"
                style={{ backgroundColor: palette.corners }}
              />
              <span
                className={`h-6 w-6 rounded-md border border-slate-200 dark:border-slate-700 ${
                  palette.transparentBackground ? "qr-checkerboard" : ""
                }`}
                style={
                  palette.transparentBackground
                    ? undefined
                    : { backgroundColor: palette.background }
                }
              />
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {palette.name}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
