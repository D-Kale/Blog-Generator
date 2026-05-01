# Contribuir a Blog-Generator

¡Gracias por tu interés en contribuir a **Blog-Generator**! Este documento te guiará a través del proceso de contribución.

## 📋 ¿Cómo Contribuir?

### 1. Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/D-Kale/Blog-Generator/issues/new) incluyendo:

- **Descripción clara** del problema
- **Pasos para reproducir** el bug
- **Comportamiento esperado** vs comportamiento actual
- **Versión de Node.js**: `node --version`
- **Versión de pnpm**: `pnpm --version`
- **Capturas de pantalla** (si aplica)

### 2. Sugerir Features

¿Tienes una idea para mejorar el proyecto?

1. Abre un issue con la etiqueta **"enhancement"**
2. Describe el feature y su propósito
3. Explica por qué sería útil
4. Discute la implementación antes de codificar

### 3. Documentación

¡La documentación es crucial! Puedes contribuir:

- **Documentar componentes** existentes
- **Agregar ejemplos** de uso
- **Corregir errores** ortográficos o de traducción
- **Mejorar la claridad** de la documentación actual

**Cómo contribuir a docs:**

1. Crea una rama: `git checkout -b docs/tu-mejora`
2. Agrega/edita archivos en el README o crea archivos `.md` en el proyecto
3. Haz commits descriptivos: `docs: agregar guía de instalación`
4. Envía un Pull Request

### 4. Pull Requests (Código)

Si quieres contribuir código:

1. **Haz fork** del repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/tu-feature
   # o para documentación:
   git checkout -b docs/tu-mejora
   ```
3. **Desarrolla tu feature** siguiendo los estándares del proyecto
4. **Commits descriptivos**:
   ```bash
   git commit -m "feat: add image upload support"
   git commit -m "docs: update README with installation steps"
   git commit -m "fix: resolve text alignment bug"
   ```
5. **Push** a tu rama:
   ```bash
   git push origin feature/tu-feature
   ```
6. **Abre un Pull Request** en GitHub

## 🎯 Estándares de Código

### Convenciones de Commits

Usa el formato **Conventional Commits**:

- `feat:` - Nuevas características
- `fix:` - Corrección de bugs
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (sin cambios de código)
- `refactor:` - Refactorización (no es feature ni fix)
- `test:` - Agregar o corregir tests
- `chore:` - Tareas de mantenimiento

**Ejemplos:**
```bash
feat: add image filter controls
fix: resolve text alignment issue in Safari
docs: update installation instructions
refactor: simplify component structure
```

### Estándares de Código

- **TypeScript estricto** - Todo el código debe estar tipado
- **Componentes < 200 líneas** - Divide componentes grandes
- **Arquitectura de 3 tiers** - Sigue la estructura `primitives` → `ui` → `controls`
- **Nombres descriptivos** - Variables y funciones con nombres claros
- **Comentarios en español** - Documenta la lógica compleja

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

## ❓ Dudas o Problemas

Si tienes dudas o problemas:

1. **Revisa los issues** - Puede que ya esté resuelto o discutido
2. **Abre un issue** - Describe tu duda o problema claramente
3. **Espera respuesta** - El mantenedor te responderá lo antes posible

## 🎉 Reconocimiento

Todos los contribuidores serán mencionados en el README principal del proyecto.

---

**¡Gracias por contribuir a Blog-Generator! 🚀**
