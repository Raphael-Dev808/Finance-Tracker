interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  options,
  placeholder = 'Selecione...',
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl
          bg-slate-800/50 border border-slate-600
          text-slate-200
          transition-colors duration-200
          focus:outline-none focus:ring-1 focus:border-primary-500 focus:ring-primary-500/50
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        <option value="" className="bg-slate-800 text-slate-400">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-800">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
