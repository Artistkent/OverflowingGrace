// pages/api/properties.js

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/_lib/properties.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const properties = JSON.parse(fileContents);
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error reading properties file' });
    }
  } else if (req.method === 'POST') {
    try {
      await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
      res.status(200).json({ message: 'Properties updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error writing properties file' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
