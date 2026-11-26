# ECDS npm consumption

The v1 repository is the source of truth. The package is @erikacarvalho/react; the existing federation remote remains https://ds.erikacarvalho.dev/remoteEntry.js.

## Install after publication

```sh
npm install @erikacarvalho/react react@18.3.1 react-dom@18.3.1
```

```tsx
import { Button } from '@erikacarvalho/react';
import '@erikacarvalho/react/styles.css';
export function Example() { return <Button text="Continue" />; }
```

For Next.js Pages Router import global CSS in pages/_app; for App Router use the root layout. Components using browser APIs need client boundaries and may need SSR disabled. React 19 is not yet certified.

## Release checklist

- Confirm strict types, architecture, package, ESM, CSS and isolated consumer CI.
- Verify npm scope ownership and availability of the package name.
- Configure npm trusted publishing for this repository and npm-publish.yml.
- Configure npm-production environment approval where supported.
- Review Changesets version and changelog; confirm version is unpublished.
- Dispatch Publish npm package on main with the exact version.
- Verify the published tarball and install in each consumer separately.

First publication may require a manual authenticated bootstrap if trusted publishing cannot be configured for an unpublished package. Never commit npm tokens.
