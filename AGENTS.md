# AGENTS.md

## Project Stack
- Astro 6.1.3 with React integration
- Tailwind CSS 4.2.2
- React 19.2.5
- TypeScript with strict settings
- pnpm package manager
- Node.js >= 22.12.0

## Key Commands
- `pnpm dev` - Start development server (localhost:4321)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Project Structure

### Core Architecture
```
src/
├─ components/
│  ├─ editor/
│  │  ├─ core/              # CanvasEditor, CanvasBlock (main editor logic)
│  │  ├─ features/          # Feature-specific components
│  │  │  ├─ text/           # Text editing feature
│  │  │  ├─ list/           # List editing feature
│  │  │  └─ images/         # Image editing feature (ImageControls)
│  │  ├─ shared/            # Shared editor components
│  │  │  ├─ primitives/     # Dumb UI components (SelectControl, ColorPalette)
│  │  │  ├─ ui/             # Composite UI (TabsContainer, PresetGrid)
│  │  │  ├─ controls/       # Shared controls (FormatControls only)
│  │  │  └─ helpers/        # Shared helpers (iconHelpers, styleHelpers)
│  │  └─ config/            # Configuration modules by feature
│  ├─ pages/                # Page components
│  └─ assets/               # Static assets
└─ styles/                  # Global styles
```

### Feature vs Shared Guidelines

**Use `features/` when:**
- Component is specific to one feature (text, list, image)
- Needs dedicated tab components or sub-components
- Example: `ImageControls` → `features/images/`

**Use `shared/` when:**
- Component is reusable across features
- Pure UI primitive or composite pattern
- Example: `FormatControls` → `shared/controls/`

### Shared Component Tiers
1. **primitives/** - Atomic, stateless UI components
   - `SelectControl`, `ColorPalette`, `ControlGroup`
   - No external dependencies except Tailwind/Lucide

2. **ui/** - Composite UI components
   - `TabsContainer`, `TabbedEditor`, `PresetGrid`, `TemplateSelector`, `ThemeSelector`
   - Combine primitives for reusable patterns

3. **controls/** - Shared control panels
   - `FormatControls/` - Text/list formatting only
   - Import from `primitives/` and `ui/`

## Development Guidelines

### Component Size Limits
- Keep components under 200 lines
- Split large components using the tier structure above
- Extract stateless sub-components when possible

### Import Paths
- Use relative imports within tiers
- Cross-tier imports: `primitives` ← `ui` ← `controls`
- Features import from shared, not vice versa

### Code Organization
- Each tier has its own `index.ts` for clean exports
- Feature folders use subdirectories with index exports
- Helpers centralized in `src/components/editor/helpers/`

## Performance
- Run `pnpm build --stats` for bundle analysis
- Consider lazy-loading for heavy controls
- Dynamic imports for non-critical features

## Testing
- No test framework configured yet
- Manual testing via dev server (`pnpm dev`)
