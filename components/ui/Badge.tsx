interface BadgeProps {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'default';
  className?: string;
}

const variants = {
  income: 'bg-income/20 text-income',
  expense: 'bg-expense/20 text-expense',
  default: 'bg-slate-600/50 text-slate-300',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex px-2 py-0.5 rounded-md text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
