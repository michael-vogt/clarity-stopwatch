import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'clarity-tasks.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/clarity-tasks.json', async (req, res) => {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    res.type('application/json').send(data);
  } catch (err) {
    res.status(404).json({ error: 'Datei nicht gefunden' });
  }
});

app.put('/clarity-tasks.json', async (req, res) => {
  try {
    await writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Speichern' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Clarity-Server läuft auf http://localhost:${PORT}`);
});
