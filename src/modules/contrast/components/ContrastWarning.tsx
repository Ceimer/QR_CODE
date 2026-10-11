import { useContrast } from "../hooks/useContrast";

export function ContrastWarning() {
  const { ratio, isLow, isInverted, transparentBackground } = useContrast();
  const formatted = ratio.toFixed(2);
  const messages: string[] = [];

  if (isLow) {
    messages.push(
      `El contraste es bajo (${formatted}:1). El QR podría no escanearse; se recomienda un mínimo de 3:1.`,
    );
  }
  if (isInverted) {
    messages.push(
      "El QR parece invertido: los puntos son más claros que el fondo. Algunos lectores podrían no reconocerlo.",
    );
  }

  if (messages.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
      >
        Contraste adecuado ({formatted}:1).
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
    >
      <p className="font-medium">Advertencia de legibilidad</p>
      <ul className="mt-1 list-disc space-y-1 pl-5">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
        {transparentBackground ? (
          <li>El fondo es transparente; el contraste se calculó sobre blanco.</li>
        ) : null}
      </ul>
    </div>
  );
}
