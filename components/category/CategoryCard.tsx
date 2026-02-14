import type { Category } from '@/types/category.types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div
      className="
        p-4 rounded-xl
        bg-slate-800/50 border border-slate-700/50
        flex items-center gap-4
      "
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <span style={{ color: category.color }} className="text-lg">
          •
        </span>
      </div>
      <div>
        <p className="font-medium text-slate-200">{category.name}</p>
        <p className="text-sm text-slate-500 capitalize">{category.type}</p>
      </div>
      {category.is_default && (
        <span className="ml-auto text-xs text-slate-500">Padrão</span>
      )}
    </div>
  );
}
