# Naclora Website

Sitio web corporativo de **Naclora** - Oxidantes circulares para agricultura, industria alimentaria y entornos profesionales.

## Estructura del proyecto

```
naclora-website/
├── index.html          # Página principal
├── soluciones.html     # Página de soluciones (AgroOxi, ProOxi, CleanOxi)
├── productos.html      # Catálogo de productos OxiPlanet
├── css/
│   ├── styles.css      # Estilos principales
│   ├── soluciones.css  # Estilos página soluciones
│   └── productos.css   # Estilos página productos
├── js/
│   └── main.js         # JavaScript principal
├── assets/
│   └── logo-naclora.png
├── vercel.json         # Configuración de Vercel
└── README.md
```

## Tecnologías

- HTML5 semántico
- CSS3 con variables CSS (sin frameworks)
- JavaScript vanilla
- Google Fonts (Inter, Plus Jakarta Sans)

## Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conecta el repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. El sitio se desplegará en cada push a `main`

## Desarrollo local

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve
```

## Páginas

- **Home** (`index.html`): Propuesta de valor, ADN, soluciones, estadísticas, tecnología, contacto
- **Soluciones** (`soluciones.html`): Detalle de AgroOxi®, ProOxi® y CleanOxi®
- **Productos** (`productos.html`): Catálogo completo de productos y equipos

## Contacto

- Web: [naclora.com](https://naclora.com)
- Email: info@naclora.com

---

© 2026 Naclora. Todos los derechos reservados.
