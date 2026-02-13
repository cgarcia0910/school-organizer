const express = require('express');
const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 10000;
const API_URL = process.env.API_URL || 'http://localhost:3000';

// Ruta al build (desde la raíz del proyecto)
const DIST_DIR = path.join(process.cwd(), 'dist', 'apps', 'frontend', 'planning', 'planning');

// Verificar que el directorio existe
if (!fs.existsSync(DIST_DIR)) {
  console.error(`ERROR: Build directory not found: ${DIST_DIR}`);
  console.error(`Current working directory: ${process.cwd()}`);
  console.error(`Please run: npm run build:frontend:planning`);
  process.exit(1);
}

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// API Proxy
app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔀 [Planning] Proxying: ${req.method} ${req.url} -> ${API_URL}`);
  },
  onError: (err, req, res) => {
    console.error(`❌ [Planning] Proxy Error: ${err.message}`);
    res.status(500).send('Proxy Error');
  }
}));

// Serve static files
app.use(express.static(DIST_DIR));

// SPA fallback
app.get('/*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Planning remote running on port ${PORT}`);
  console.log(`📁 Serving files from: ${DIST_DIR}`);
  console.log(`🔀 Proxying /api requests to: ${API_URL}`);
});