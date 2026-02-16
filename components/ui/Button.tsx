import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  primary:
    'bg-primary-500 hover:bg-primary-600 text-slate-900 font-semibold focus:ring-primary-400',
  secondary:
    'bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 font-medium border border-accent-500/40 focus:ring-accent-500/50',
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
