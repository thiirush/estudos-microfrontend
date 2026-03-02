import type { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from './_cors';

const TOKEN_COOKIE = 'mf_token';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  setCors(response);

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ ok: false });
    return;
  }

  response.setHeader(
    'Set-Cookie',
    `${TOKEN_COOKIE}=fake-jwt-token; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  );

  response.status(200).json({ ok: true });
}
