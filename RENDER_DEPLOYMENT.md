# Guía de Despliegue en Render.com

Este proyecto usa Module Federation con múltiples aplicaciones (shell, config, planning) que necesitan desplegar correctamente con headers CORS.

## Problema con Static Sites

**Render.com Static Sites NO soporta headers CORS personalizados**, por lo que necesitamos usar **Web Services** con servidores Express.

## Aplicaciones a desplegar

Necesitas crear **3 Web Services** separados en Render.com:

### 1. Shell (Host/Container)

**Configuración:**
- **Name:** `school-organizer-shell`
- **Environment:** `Node`
- **Build Command:** `npm ci --include=dev && npm run build:frontend:shell`
- **Start Command:** `npm run start:shell`
- **Port:** El que asigne Render (usa variable `PORT`)

**Variables de entorno:**
- `NODE_ENV`: `production`

### 2. Config (Remote)

**Configuración:**
- **Name:** `school-organizer-config`
- **Environment:** `Node`
- **Build Command:** `npm ci --include=dev && npm run build:frontend:config`
- **Start Command:** `npm run start:config`
- **Port:** El que asigne Render (usa variable `PORT`)

**Variables de entorno:**
- `NODE_ENV`: `production`

### 3. Planning (Remote)

**Configuración:**
- **Name:** `school-organizer-planning`
- **Environment:** `Node`
- **Build Command:** `npm ci --include=dev && npm run build:frontend:planning`
- **Start Command:** `npm run start:planning`
- **Port:** El que asigne Render (usa variable `PORT`)

**Variables de entorno:**
- `NODE_ENV`: `production`

## Orden de despliegue

1. **Primero:** Despliega `config` y `planning` (los remotes)
2. **Después:** Obtén las URLs finales de los remotes
3. **Finalmente:** Actualiza las URLs en `webpack.prod.config.ts` del shell y despliega el shell

## Archivos importantes

- `apps/frontend/shell/shell/server.js` - Servidor Express para el shell
- `apps/frontend/config/config/server.js` - Servidor Express para config
- `apps/frontend/planning/planning/server.js` - Servidor Express para planning
- `apps/frontend/shell/shell/webpack.prod.config.ts` - Configuración de URLs de remotes

## Headers CORS

Los servidores Express ya incluyen los headers CORS necesarios:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`
- `Cross-Origin-Resource-Policy: cross-origin`
- `Cross-Origin-Embedder-Policy: credentialless`

## Verificación

Después del despliegue, verifica en DevTools → Network que:
1. Los archivos `remoteEntry.mjs` se cargan correctamente
2. Los headers CORS están presentes en las respuestas
3. No hay errores de CORS en la consola

## Problemas comunes

### Error: "Cannot GET /"
- Verifica que el build se haya completado correctamente
- Verifica que el directorio `dist/` existe y tiene archivos

### Error CORS persiste
- Verifica que estés usando Web Service y no Static Site
- Verifica que el servidor Express esté iniciando correctamente
- Revisa los logs del servicio en Render.com

### Remote no se carga
- Verifica que las URLs en `webpack.prod.config.ts` sean correctas
- Verifica que los remotes estén desplegados y accesibles
- Prueba acceder a `https://[remote-url]/remoteEntry.mjs` directamente

## Scripts útiles

```bash
# Build local
npm run build:frontend:shell
npm run build:frontend:config
npm run build:frontend:planning

# Start local (después del build)
npm run start:shell
npm run start:config
npm run start:planning
```

## URLs esperadas (actualizar con las reales)

Después del despliegue, actualiza estas URLs en `webpack.prod.config.ts`:

```typescript
remotes: [
  ['config', 'https://[tu-url-real].onrender.com'],
  ['planning', 'https://[tu-url-real].onrender.com'],
],
```
