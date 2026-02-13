const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../../../dist/apps/frontend/config/config')));

// SPA fallback
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../dist/apps/frontend/config/config/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Config remote running on port ${PORT}`);
});
