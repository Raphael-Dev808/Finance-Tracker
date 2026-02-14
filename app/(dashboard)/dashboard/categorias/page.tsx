import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/Container';
import { CategoryCard } from '@/components/category/CategoryCard';

export default async function CategoriasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .or(`user_id.is.null,user_id.eq.${user.id}`)
    .order('type')
    .order('order');

  const receitas = categories?.filter((c) => c.type === 'receita') ?? [];
  const despesas = categories?.filter((c) => c.type === 'despesa') ?? [];

  return (
    <Container>
      <div className="space-y-8">
        <h1 className="font-heading font-bold text-2xl text-slate-100">
          Categorias
        </h1>

        <section>
          <h2 className="text-lg font-medium text-slate-300 mb-4">Receitas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {receitas.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-slate-300 mb-4">Despesas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {despesas.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
