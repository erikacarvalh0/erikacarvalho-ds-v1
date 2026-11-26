#!/usr/bin/env bash
set -euo pipefail
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
npm pack --pack-destination "$tmp"
cd "$tmp"
npm init -y >/dev/null
npm install next@15 react@18.3.1 react-dom@18.3.1 ./*.tgz
mkdir pages
cat > pages/index.js <<'EOF'
import { Button } from '@erikacarvalho/react';
export default function Home() { return <Button text="ECDS Next smoke" />; }
EOF
cat > pages/_app.js <<'EOF'
import '@erikacarvalho/react/styles.css';
export default function App({ Component, pageProps }) { return <Component {...pageProps} />; }
EOF
npx next build
grep -q 'ECDS Next smoke' .next/server/pages/index.html
