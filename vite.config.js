import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Absolute path into the demo's SINGLE preact install. The widgets are consumed
// as source and carry their own preact copy, so bare aliases like `preact/compat`
// resolve per-importer and the widget components end up on a *second* preact
// instance. That silently breaks React context (createContext in the demo,
// useContext in a widget -> value is null), so the provenance provider and each
// widget's `guidance` never connect and no bars render. Pinning to absolute paths
// forces one instance for every importer.
const pre = (p) => path.resolve(__dirname, 'node_modules', p);

export default defineConfig({
    // The React widgets and the Preact-based `scents` package share one runtime by
    // aliasing react/react-dom to preact/compat. esbuild compiles all JSX with the
    // preact automatic runtime; the 'tsx' loader covers the mixed .js-with-JSX + .ts/.tsx
    // source tree (widgets ship JSX in .js files; scents ships .tsx).
    base: '/showcase/',
    esbuild: {
        loader: 'tsx',
        include: /\.[jt]sx?$/,
        exclude: [],
        jsx: 'automatic',
        jsxImportSource: 'preact',
    },
    optimizeDeps: {
        // Pre-bundle guidance so esbuild converts its CommonJS build to ESM with
        // proper named exports. Without this, Vite's on-the-fly interop of guidance's
        // inverted exports map intermittently fails with "does not provide an export
        // named 'UNILATERAL_GUIDANCE_EVENT_NAME'".
        include: ['guidance'],
        esbuildOptions: {
            loader: { '.js': 'jsx' },
            jsx: 'automatic',
            jsxImportSource: 'preact',
        },
    },
    resolve: {
        // Regex-exact so a bare name (e.g. `preact`) doesn't prefix-match its subpaths.
        alias: [
            { find: /^react$/, replacement: pre('preact/compat') },
            { find: /^react-dom$/, replacement: pre('preact/compat') },
            { find: /^react-dom\/client$/, replacement: pre('preact/compat/client.mjs') },
            { find: /^react\/jsx-runtime$/, replacement: pre('preact/jsx-runtime') },
            { find: /^react\/jsx-dev-runtime$/, replacement: pre('preact/jsx-runtime') },
            { find: /^preact$/, replacement: pre('preact') },
            { find: /^preact\/hooks$/, replacement: pre('preact/hooks') },
            { find: /^preact\/compat$/, replacement: pre('preact/compat') },
            { find: /^preact\/jsx-runtime$/, replacement: pre('preact/jsx-runtime') },
        ],
        dedupe: ['preact', 'guidance', 'd3', 'primereact', '@mantine/core'],
    },
});
