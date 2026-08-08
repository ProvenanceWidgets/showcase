import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Pin every React/Preact import to the demo's single Preact installation so the
// provider and widgets always share the same context instance.
const pre = (p) => path.resolve(__dirname, 'node_modules', p);

export default defineConfig({
    // ProvenanceWidgets and the showcase share one runtime by aliasing
    // react/react-dom to preact/compat.
    base: '/showcase/',
    esbuild: {
        loader: 'tsx',
        include: /\.[jt]sx?$/,
        exclude: [],
        jsx: 'automatic',
        jsxImportSource: 'preact',
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
        dedupe: ['preact', 'd3', 'primereact'],
    },
});
