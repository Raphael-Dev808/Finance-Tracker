import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    'bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold focus:ring-teal-400',
  secondary:
    'bg-slate-700/50 hover:bg-slate-700 text-slate-200 font-medium border border-slate-600 focus:ring-slate-500',
  ghost:
    'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 focus:ring-slate-600',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          px-6 py-3 rounded-xl
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
