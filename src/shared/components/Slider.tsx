interface SliderProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  suffix?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export function Slider({
  id,
  min,
  max,
  step = 1,
  value,
  suffix = "",
  disabled = false,
  onChange,
}: SliderProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700"
      />
      <span className="w-16 shrink-0 text-right text-sm tabular-nums text-slate-600 dark:text-slate-300">
        {value}
        {suffix}
      </span>
    </div>
  );
}
