const express = require('express');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
    styleSrc: ["'self'", "https://cdnjs.cloudflare.com"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));

// routes
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'modules.' });
});

app.get('/apps', (req, res) => {
  fs.readFile('data/apps.json', (err, data) => {
    if (err) throw err;
    const apps = JSON.parse(data);
    res.render('pages/apps', { title: 'Apps', apps: apps });
  });
});

app.get('/modules', (req, res) => {
  fs.readFile('data/modules.json', (err, data) => {
    if (err) throw err;
    const modules = JSON.parse(data);
    res.render('pages/modules', { title: 'Modules | modules.', modules: modules });
  });
});

app.get('/modules/:id', (req, res) => {
  fs.readFile('data/modules.json', (err, data) => {
    if (err) throw err;
    const modules = JSON.parse(data);
    const module = modules.find(m => m.id === req.params.id);
    if (module) {
      res.render('templates/module', { module: module });
    } else {
      res.status(404).send('Module not found');
    }
  });
});

app.get('/apps/:id', (req, res) => {
  fs.readFile('data/apps.json', (err, data) => {
    if (err) throw err;
    const apps = JSON.parse(data);
    const app = apps.find(m => m.id === req.params.id);
    if (app) {
      res.render('templates/app', { app: app });
    } else {
      res.status(404).send('App not found');
    }
  });
});

app.get('/download', (req, res) => {
  const { name, type, version, arch } = req.query;
  if (!validator.isAlphanumeric(name.replace(/\s/g, '')) || !validator.isAlphanumeric(type) || !validator.isAlphanumeric(version.replace(/\./g, '')) || !/^[a-zA-Z0-9-]+$/.test(arch)) {
    return res.status(400).send('Invalid input, mister!');
  }
  fs.readFile(`data/${type}s.json`, (err, data) => {
    if (err) throw err;
    const items = JSON.parse(data);
    const item = items.find(i => i.name === name);
    if (item && item.downloadLinks && item.downloadLinks[version] && item.downloadLinks[version][arch]) {
      const downloadLink = item.downloadLinks[version][arch];
      res.render('templates/download', { name: item.name, type, version, arch, downloadLink });
    } else {
      res.status(404).send('Download link not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});