import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { CrawlerHost } from './cloud-functions/crawler';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const crawlerHost = container.resolve(CrawlerHost);

app.use(express.json());

// Serve static files from the local-storage directory
app.use('/instant-screenshots', express.static(path.join('/app', 'local-storage', 'instant-screenshots')));

app.all('*', async (req, res) => {
  try {
    await crawlerHost.crawl(req, res);
  } catch (error) {
    console.error('Error during crawl:', error);
    res.status(500).json({ error: 'An error occurred during the crawl' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
