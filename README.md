## Super Tarifario ONUS Express

Reconstruccion auditada en React + Vite a partir de dos HTML autonomos:

- `Tarifario-por-item.html`
- `Tarifario-por-modulo.html`

### Hallazgos de la auditoria

- El proyecto tenia `package.json` y `vite.config.ts`, pero no conservaba `src/`.
- El build existente era una compilacion no mantenible.
- `Tarifario-ONUS-Express-2026-local-v3.html` estaba vacio.
- Los dos HTML autonomos siguen siendo la fuente funcional mas fiable.

### Estructura actual

- La app React vive en `src/`.
- Los HTML autonomos se publican desde `public/tarifarios/`.
- La UI React actua como contenedor movil y de escritorio.

### Desarrollo

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Despliegue en Vercel

Vercel detecta Vite automaticamente. Configura:

- Build Command: `npm run build`
- Output Directory: `dist`

No se necesita backend.
