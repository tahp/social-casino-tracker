export {}; // Ensures TypeScript treats this file as a module

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({ message: 'Bonus added successfully!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
}
