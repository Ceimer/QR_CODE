import { Button, Field, Panel } from "../shared/components";
import { ColorControls } from "../modules/colors";
import { ContrastWarning } from "../modules/contrast";
import { DownloadButtons } from "../modules/export";
import { LogoUploader } from "../modules/logo";
import { PalettePicker } from "../modules/palettes";
import { QRPreview } from "../modules/qr-preview";
import { StyleControls } from "../modules/style";
import { useQRConfig } from "../store";

export function AppLayout() {
  const { config, setContent, reset } = useQRConfig();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold">Casti QR Color Studio</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Crea códigos QR personalizables, 100% en tu navegador.
            </p>
          </div>
          <Button variant="ghost" onClick={reset}>
            Restablecer
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="flex flex-col gap-6 lg:order-1">
          <Panel
            title="Contenido"
            description="Texto o URL que codificará el QR."
          >
            <Field
              label="Contenido del QR"
              htmlFor="qr-content"
              hint="La vista previa se actualiza automáticamente."
            >
              <textarea
                id="qr-content"
                value={config.content}
                onChange={(event) => setContent(event.target.value)}
                rows={3}
                placeholder="https://ejemplo.com"
                className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              />
            </Field>
          </Panel>

          <ColorControls />
          <StyleControls />
          <LogoUploader />
          <PalettePicker />
        </div>

        <div className="flex flex-col gap-4 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <QRPreview />
          <ContrastWarning />
          <DownloadButtons />
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        Tus datos nunca salen del navegador. QR Color Studio no envía información
        a ningún servidor.
      </footer>
    </div>
  );
}
