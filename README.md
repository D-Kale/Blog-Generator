# Blog-Generator

> Editor visual interactivo para crear contenido de blogs con una experiencia de usuario moderna y personalizable.

## 🚀 Vista Previa

[![Demo en vivo](https://img.shields.io/badge/demo-en_línea-blue?style=for-the-badge)](https://blog-generator-demo.com)
[![Versión](https://img.shields.io/badge/versión-0.0.1-green?style=for-the-badge)](https://github.com/isapa/Music/Astro/XV)
[![Licencia](https://img.shields.io/badge/licencia-MIT-orange?style=for-the-badge)](LICENSE)

---

## 📖 Descripción

**Blog-Generator** es un editor visual de código abierto construido con Astro 6 y React 19, diseñado para crear contenido de blogs de forma intuitiva. Permite a los usuarios añadir, editar y personalizar bloques de texto, imágenes y listas con una interfaz drag-and-drop moderna.

### Características Principales

- ✨ **Editor Visual Interactivo** - Interfaz drag-and-drop para añadir contenido
- 🎨 **Personalización Completa** - Estilos, colores y formatos configurables
- 📝 **Múltiples Tipos de Contenido** - Texto, imágenes y listas
- 🚀 **Rendimiento Optimizado** - Construido con Astro para máxima velocidad
- 📦 **Arquitectura Modular** - Código escalable y fácil de mantener
- 🎯 **TypeScript** - Tipado estático para mayor seguridad

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Astro** | 6.1.3 | Framework principal |
| **React** | 19.2.5 | Componentes UI |
| **Tailwind CSS** | 4.2.2 | Estilos |
| **TypeScript** | 5.x | Tipado estático |
| **Framer Motion** | 12.38.0 | Animaciones |
| **Lucide React** | 1.7.0 | Iconos |
| **pnpm** | - | Gestor de paquetes |

### Requisitos Previos

- **Node.js**: >= 22.12.0
- **pnpm**: Latest version

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/isapa/Music/Astro/XV.git blog-generator
cd blog-generator
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Iniciar servidor de desarrollo

```bash
pnpm dev
```

El servidor se ejecutará en [http://localhost:4321](http://localhost:4321)

---

## 🎯 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Compila el sitio para producción en `./dist/` |
| `pnpm preview` | Vista previa local del build de producción |
| `pnpm astro` | Ejecuta comandos de Astro CLI |
| `pnpm astro check` | Verifica el proyecto con Astro Check |
| `pnpm astro build --stats` | Build con análisis de bundle |

---

## 🏗️ Estructura del Proyecto

El proyecto sigue una arquitectura modular organizada por características:

```
src/
├── components/editor/     # Componentes del editor
│   ├── core/             # Lógica principal (CanvasEditor, CanvasBlock)
│   ├── features/         # Features específicos (text, list, images)
│   ├── shared/           # Componentes compartidos
│   ├── config/           # Configuraciones por feature
│   └── helpers/          # Utilidades
├── layouts/              # Layouts de Astro
├── pages/                # Páginas de la aplicación
├── scripts/              # Scripts del cliente
└── styles/               # Estilos globales
```

### Arquitectura de Componentes

El editor usa un sistema de **3 capas** para los componentes compartidos:

1. **Primitives** (`shared/primitives/`)
   - Componentes UI atómicos y puros
   - Sin dependencias externas
   - Ej: `SelectControl`, `ColorPalette`, `ControlGroup`

2. **UI** (`shared/ui/`)
   - Componentes compuestos reutilizables
   - Patrones UI comunes
   - Ej: `TabsContainer`, `PresetGrid`, `TemplateSelector`

3. **Controls** (`shared/controls/`)
   - Paneles de control específicos
   - Importan de primitives y UI
   - Ej: `FormatControls`

Ver [`tree.txt`](tree.txt) para el árbol completo de archivos.

---

## 🎨 Uso del Editor

### Añadir un Bloque

1. Usa la barra lateral izquierda para seleccionar el tipo de contenido
2. Haz click en el icono correspondiente:
   - **T** - Texto
   - **Imagen** - Imagen
   - **Lista** - Lista

### Editar Contenido

1. Selecciona un bloque en el canvas
2. Usa el panel derecho para personalizar:
   - **Texto**: Fuente, tamaño, color, alineación
   - **Imagen**: URL, filtros, tamaño, rotación
   - **Lista**: Estilo, plantilla, colores

### Guardar/Exportar

> **Nota**: La funcionalidad de exportación está en desarrollo.

---

## 📋 Roadmap

### ✅ Completado (v0.0.1)

- [x] Editor visual básico con drag-and-drop
- [x] Soporte para bloques de texto, imagen y listas
- [x] Panel de controles por tipo de contenido
- [x] Sistema de pestañas para organización
- [x] Estilos personalizados con Tailwind CSS
- [x] Arquitectura modular reestructurada
- [x] TypeScript con configuración estricta
- [x] Componentes de UI reutilizables (primitives, ui, controls)
- [x] Helpers de iconos y estilos centralizados

### 🚧 En Progreso (v0.1.0)

- [ ] Exportar contenido a Markdown/HTML
- [ ] Importar contenido desde Markdown
- [ ] Guardar en localStorage
- [ ] Historial de deshacer/rehacer
- [ ] atajos de teclado
- [ ] Test unitarios con Vitest
- [ ] Storybook para documentación de componentes

### 📅 Planificado (v0.2.0)

- [ ] Soporte para bloques de código
- [ ] Tablas editables
- [ ] Incrustar videos (YouTube, Vimeo)
- [ ] Subida de imágenes a cloud (Cloudinary, S3)
- [ ] Temas personalizables (dark mode)
- [ ] Colaboración en tiempo real (Yjs, Liveblocks)
- [ ] Plugins/extensions API

### 🔮 Futuro (v1.0.0)

- [ ] Exportar a PDF
- [ ] Vista previa responsive
- [ ] SEO metadata editor
- [ ] Integración con CMS (Contentful, Sanity)
- [ ] Deploy a Vercel/Netlify con un click
- [ ] Documentación completa en español e inglés
- [ ] Guías de contribución
- [ ] Código de conducta

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commitea tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Pujea a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar en modo desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

---

## 📄 Estructura de Directorios Detallada

### `/src/components/editor/core/`
El núcleo del editor. Contiene la lógica principal del CanvasEditor y CanvasBlock.

### `/src/components/editor/features/`
Cada carpeta representa una feature específica:
- **text/** - Controles y componentes para edición de texto
- **list/** - Controles y componentes para listas
- **images/** - Controles y componentes para imágenes

### `/src/components/editor/shared/`
Componentes compartidos entre features, organizados en 3 tiers:
- **primitives/** - Componentes UI atómicos
- **ui/** - Componentes UI compuestos
- **controls/** - Controles de formato

### `/src/components/editor/config/`
Configuraciones, constantes y handlers por feature:
- **text/** - Configuración de texto
- **lists/** - Configuración de listas
- **images/** - Configuración de imágenes

### `/src/components/editor/helpers/`
Funciones utilitarias:
- **iconHelpers.ts** - Helpers para iconos dinámicos
- **styleHelpers.ts** - Helpers para estilos

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

Desarrollado por **isapa**

- GitHub: [@isapa](https://github.com/isapa)
- Repositorio: [Blog-Generator](https://github.com/isapa/Music/Astro/XV)

---

## 🙏 Agradecimientos

- [Astro](https://astro.build/) - Framework web
- [React](https://react.dev/) - Librería UI
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [Lucide Icons](https://lucide.dev/) - Iconos

---

## 📞 Soporte

Si tienes alguna duda o problema, por favor:
1. Revisa la [documentación](https://docs.astro.build/)
2. Abre un [issue](https://github.com/isapa/Music/Astro/XV/issues)
3. Únete al [Discord de Astro](https://astro.build/chat)

---

<p align="center">
  <sub>Hecho con ❤️ usando Astro y React</sub>
</p>
