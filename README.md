## Super Tarifario ONUS Express

Despliegue estatico orientado a publicar los dos HTML autonomos sin paneles extra.

### Rutas publicas

- `/` abre directamente el tarifario por item
- `/item` abre el tarifario por item
- `/modulo` abre el tarifario por modulo

### Fuente funcional

- `Tarifario-por-item.html`
- `Tarifario-por-modulo.html`

Los archivos publicados viven en `public/tarifarios/`.

### Desarrollo

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Vercel

Configurado mediante `vercel.json` para servir:

- raiz -> `tarifarios/item.html`
- `/item` -> `tarifarios/item.html`
- `/modulo` -> `tarifarios/modulo.html`
