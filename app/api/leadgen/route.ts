import { NextRequest, NextResponse } from 'next/server';
import { LeadGenRequestSchema } from '../../../lib/types';
import { runLeadGen } from '../../../lib/workflow';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = LeadGenRequestSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: 'Invalid request', issues: parse.error.issues }, { status: 400 });
    }

    const serpApiKey = process.env.SERPAPI_KEY;
    const proxycurlKey = process.env.PROXYCURL_API_KEY;

    const records = await runLeadGen(parse.data, { serpApiKey, proxycurlKey });

    return NextResponse.json({ records }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
