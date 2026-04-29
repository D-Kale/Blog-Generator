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

## Project Structure Overview
The project follows a modular component architecture with a focus on separation of concerns:

```
src/
├─ components/
│  ├─ editor/           # Main editor component
│  │  ├─ components/      # Editor UI components
│  │  │  ├─ text/       # Text-specific controls
│  │  │  ├─ list/       # List-specific controls
│  │  │  ├─ shared/      # Shared UI components
│  │  │  └─ ui/         # Generic UI components
│  │  ├─ config/         # Configuration modules for different features
│  │  │  ├─ text/
│  │  │  ├─ lists/
│  │  │  └─ images/
│  │  ├─ helpers/       # Centralized helper functions
│  │  └─ ui/          # Reusable UI components
│  │
│  ├─ layouts/          # Page layouts
│  ├─ pages/            # Page components
│  └─ assets/          # Static assets
└─ styles/             # Global styles
```

## Scalability Improvements

### Current Structure Issues
1. **Component Organization**: Components are well-organized by feature type (text, list, shared) but could benefit from better code splitting
2. **Helper Centralization**: Helpers are already centralized in `src/components/editor/helpers/` which is good
3. **Configuration Structure**: Config files are well-organized by feature (`text`, `lists`, `images`)

### Proposed Improvements for Better Scalability

1. **Component Structure Optimization**:
   - Consider creating feature-specific subdirectories in `src/components/editor/components/`
   - Each feature (text, list, shared) has its own index.ts for clean exports

2. **Code Splitting Strategy**:
   - Dynamic imports for feature-specific controls
   - Bundle analysis to identify opportunities for reducing initial bundle size
   - Consider lazy loading controls that aren't immediately needed

3. **Configuration Organization**:
   - The config structure with `text`, `lists`, and `images` directories is well-separated
   - Each config module exports constants, handlers, presets, and validators

4. **Helper Functions**:
   - Centralized helpers in `src/components/editor/helpers/` with iconHelpers and styleHelpers
   - Good documentation in HELPERS_DOCUMENTATION.md for maintainability

### Performance Optimization Opportunities

1. **Component Code Splitting**:
   - Implement dynamic imports for `TextControls`, `ListControls`, and other heavy components
   - Split components by feature rather than loading everything upfront

2. **Bundle Size Reduction**:
   - Analyze with `pnpm build --stats` to identify large bundles
   - Consider using `React.lazy` for non-critical components

3. **Asset Optimization**:
   - Optimize the large component files:
     - `src/components/editor/components/text/StyleTextControls.tsx` (178 lines)
     - `src/components/editor/components/text/AdvancedTextControls.tsx` (167 lines)
     - `src/components/editor/components/shared/FormatControls.tsx` (256 lines)

4. **Helper Functions**:
   - The centralized helpers in `src/components/editor/helpers/` are well-organized
   - Continue the pattern of avoiding duplication (as documented in HELPERS_DOCUMENTATION.md)

### Key Files for Performance Considerations
- Large component files that could be split:
  - `src/components/editor/components/text/StyleTextControls.tsx` - Consider breaking into smaller components
  - `src/components/editor/components/shared/FormatControls.tsx` - Very large at 256 lines
  - `src/components/editor/components/text/AdvancedTextControls.tsx` - Could be split into smaller modules

### Best Practices for Scalability
1. **Component Size**: Keep components under 200 lines when possible
2. **Helper Centralization**: Continue using the centralized helpers pattern
3. **Configuration Management**: Maintain the current config structure
4. **Dynamic Loading**: Implement code splitting for better performance
5. **Bundle Analysis**: Regular analysis of build outputs for optimization opportunities