# ECDS architecture

The v1 source is canonical. No v2 component implementation is imported.

- Existing catalog and federation: yarn build (dist/).
- Independent library bundle: yarn webpack --config webpack.library.config.js --mode production (lib/).
- Existing Sass tokens: src/style/vars.scss; no visual changes.
- Public module entry: src/library.ts.

The library bundle is a browser-oriented CommonJS prototype. Before npm publication, validate consumer integration, declarations, package metadata, styles and SSR behavior. Do not publish until these checks pass.
