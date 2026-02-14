interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        p-6 rounded-2xl
        bg-slate-800/50 border border-slate-700/50
        ${className}
      `}
    >
      {children}
    </div>
  );
}
