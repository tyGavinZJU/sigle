import { join } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import next from 'next';
import { setup } from 'radiks-server';
import { config } from './config';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// TODO setup sentry on production

nextApp.prepare().then(async () => {
  const expressApp = express();

  expressApp.use(helmet());
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());

  const RadiksController = await setup({
    mongoDBUrl: config.mongoDBUrl,
  });
  expressApp.use('/radiks', RadiksController);

  expressApp.get('/manifest.json', (_, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    const manifestPath = dev
      ? join(__dirname, '..', 'static', 'manifest.json')
      : // In production the static folder is one level lower
        join(__dirname, '..', '..', 'static', 'manifest.json');
    res.sendFile(manifestPath);
  });

  expressApp.get('/me/stories/:id', (req, res) => {
    return nextApp.render(req, res, '/editor', { storyId: req.params.id });
  });

  expressApp.get('/b', (req, res) => {
    return nextApp.render(req, res, '/b', req.query);
  });

  expressApp.get('/posts/:id', (req, res) => {
    return nextApp.render(req, res, '/posts', { id: req.params.id });
  });

  expressApp.get('*', (req, res) => {
    return handle(req, res);
  });

  expressApp.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});