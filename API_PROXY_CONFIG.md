# Configuración del Proxy API

## ¿Qué hace el proxy?

Los 3 servidores Express (shell, config, planning) incluyen un proxy que redirige todas las peticiones a `/api/*` hacia tu backend.

## Funcionamiento

### Ejemplo de redirección:

**Petición del frontend:**
```
GET https://school-organizer-shell.onrender.com/api/scenario?page=1&limit=5
```

**Se redirige a tu backend:**
```
GET https://tu-backend.onrender.com/api/scenario?page=1&limit=5
```

✅ El `/api` se mantiene en la URL del backend  
✅ Los query parameters se mantienen intactos  
✅ Los headers y cookies se pasan al backend

## Configuración en Render.com

Para cada servicio (shell, config, planning), añade esta variable de entorno:

**Variable:** `API_URL`  
**Valor:** `https://tu-backend.onrender.com` (la URL de tu backend)

### Ejemplo:
Si tu backend está desplegado en: `https://school-organizer-api.onrender.com`

Configura en cada servicio:
```
API_URL=https://school-organizer-api.onrender.com
```

## Rutas que se proxy-fican

Todas las peticiones que empiecen con `/api/` serán redirigidas:

- ✅ `/api/scenario` → `${API_URL}/api/scenario`
- ✅ `/api/teachers` → `${API_URL}/api/teachers`
- ✅ `/api/courses` → `${API_URL}/api/courses`
- ✅ `/api/habilitations` → `${API_URL}/api/habilitations`
- ✅ Cualquier otra ruta que empiece con `/api/`

## Rutas que NO se proxy-fican

- ❌ `/` - Sirve el index.html del frontend
- ❌ `/assets/*` - Archivos estáticos del frontend
- ❌ `/remoteEntry.mjs` - Module Federation
- ❌ Cualquier archivo estático del build

## Logs y debugging

El servidor mostrará logs de cada petición proxy:

```
🔀 Proxying: GET /api/scenario?page=1&limit=5 -> https://backend.com/api/scenario?page=1&limit=5
✅ Response: 200 from https://backend.com
```

En caso de error:
```
❌ Proxy Error: ECONNREFUSED
```

## Métodos HTTP soportados

El proxy soporta todos los métodos HTTP necesarios:
- ✅ GET
- ✅ POST
- ✅ PUT
- ✅ DELETE
- ✅ PATCH
- ✅ OPTIONS (para CORS preflight)

## Headers automáticos

El proxy configurado con `changeOrigin: true` ajusta automáticamente:
- `Host` header al del backend
- Mantiene `Authorization` headers
- Mantiene cookies
- Pasa headers personalizados

## Testing local

### 1. Configura la variable de entorno localmente:

**Linux/Mac:**
```bash
export API_URL=http://localhost:3000
npm run start:shell
```

**Windows (CMD):**
```cmd
set API_URL=http://localhost:3000
npm run start:shell
```

**Windows (PowerShell):**
```powershell
$env:API_URL="http://localhost:3000"
npm run start:shell
```

### 2. Prueba el proxy:

```bash
# Debe redirigir a tu backend local
curl http://localhost:10000/api/scenario
```

## Configuración avanzada (opcional)

Si necesitas modificar el comportamiento del proxy, edita los archivos:
- `apps/frontend/shell/shell/server.js`
- `apps/frontend/config/config/server.js`
- `apps/frontend/planning/planning/server.js`

### Ejemplo: Añadir timeout
```javascript
app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  timeout: 30000, // 30 segundos
  pathRewrite: {
    '^/api': '/api',
  },
}));
```

### Ejemplo: Añadir headers específicos
```javascript
app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Custom-Header', 'valor');
  },
}));
```

## Troubleshooting

### Error: ECONNREFUSED
- Verifica que `API_URL` esté correctamente configurado
- Verifica que tu backend esté activo y accesible

### Error: 502 Bad Gateway
- El backend está caído o no responde
- Verifica los logs del backend

### Error: CORS
- El backend debe permitir CORS desde tus dominios de frontend
- Verifica que el backend incluya headers CORS apropiados

### Las peticiones no llegan al backend
- Verifica que uses `/api/` en tus llamadas HTTP desde el frontend
- Revisa los logs del servidor Express para ver si se interceptan

## Arquitectura

```
Frontend (Browser)
    ↓
    GET /api/scenario
    ↓
Express Server (Render.com)
    ↓
    Proxy Middleware
    ↓
    GET https://backend.com/api/scenario
    ↓
Backend API
```

## Resumen

✅ Proxy configurado en los 3 servidores  
✅ Mantiene `/api` en la ruta del backend  
✅ Requiere variable `API_URL` en Render.com  
✅ Soporta todos los métodos HTTP  
✅ Maneja CORS correctamente  
✅ Incluye logs para debugging  
