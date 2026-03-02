import type { NextApiRequest, NextApiResponse } from 'next';
import { setCors } from './_cors';

const TOKEN_COOKIE = 'mf_token';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  setCors(response);

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  const token = request.cookies[TOKEN_COOKIE];
  response.status(200).json({ authenticated: Boolean(token) });
}
