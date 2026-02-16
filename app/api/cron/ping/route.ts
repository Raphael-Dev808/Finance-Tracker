import { NextResponse } from 'next/server';

/**
 * Endpoint leve para cron jobs manterem o site acordado.
 * Útil no Render (plano Free) e outras plataformas que dormem após inatividade.
 *
 * Configure um cron externo (ex: cron-job.org) para acessar:
 * https://seu-site.com/api/cron/ping
 *
 * Intervalo recomendado: a cada 10-14 minutos (Render dorme após ~15 min de inatividade)
 */
export async function GET() {
  return NextResponse.json(
    { ok: true, timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
