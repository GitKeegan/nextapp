// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import si from 'systeminformation';

export async function GET() {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();

    return NextResponse.json({
      cpu: cpu.currentLoad.toFixed(2),
      ram: ((mem.active / mem.total) * 100).toFixed(2),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}