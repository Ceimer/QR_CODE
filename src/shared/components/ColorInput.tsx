import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { normalizeHex } from "../utils";

interface ColorInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function ColorInput({
  label,
  value,
  disabled = false,
  onChange,
}: ColorInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = `color-input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const panelId = `${inputId}-panel`;
  const safeValue = normalizeHex(value);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between gap-3"
    >
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          value={value}
          disabled={disabled}
          spellCheck={false}
          onChange={(event) => onChange(event.target.value)}
          className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1 font-mono text-sm text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        />
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Elegir color: ${label}`}
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          className="h-8 w-8 rounded-md border border-slate-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600"
          style={{ backgroundColor: safeValue }}
        />
      </div>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={`Selector de color: ${label}`}
          className="absolute right-0 top-full z-20 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          <HexColorPicker color={safeValue} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}
