-- Atualiza cores de categorias para a nova paleta (Aqua Mist #789a99 e Peach Ice #FFD2C2)
-- Substitui o antigo teal (#14b8a6, #0d9488) por Aqua Mist (#789a99)

-- Atualiza cor padrão da tabela categories
ALTER TABLE categories ALTER COLUMN color SET DEFAULT '#789a99';

-- Atualiza categorias que usam o antigo teal
UPDATE categories SET color = '#789a99' WHERE color = '#14b8a6';
UPDATE categories SET color = '#789a99' WHERE color = '#0d9488';

-- Atualiza categorias de receita para usar a nova paleta (Salário -> Aqua Mist, Freelance -> Peach Ice para variar)
UPDATE categories SET color = '#789a99' WHERE name = 'Salário' AND type = 'receita';
UPDATE categories SET color = '#FFD2C2' WHERE name = 'Freelance' AND type = 'receita';
