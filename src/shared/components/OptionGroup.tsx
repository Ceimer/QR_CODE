interface Option<V extends string> {
  value: V;
  label: string;
}

interface OptionGroupProps<V extends string> {
  name: string;
  label: string;
  value: V;
  options: Option<V>[];
  disabled?: boolean;
  onChange: (value: V) => void;
}

export function OptionGroup<V extends string>({
  name,
  label,
  value,
  options,
  disabled = false,
  onChange,
}: OptionGroupProps<V>) {
  return (
    <fieldset className="flex flex-col gap-2" disabled={disabled}>
      <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition ${
                active
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                disabled={disabled}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
