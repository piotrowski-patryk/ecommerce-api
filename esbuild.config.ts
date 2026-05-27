import { build } from 'esbuild';
import fs from 'fs';

await build({
  // Pliki
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',

  // Środowisko
  platform: 'node',
  format: 'esm',
  target: 'es2022',

  // Optymalizacja
  bundle: true,
  minify: true,
  packages: 'external',
})

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

pkg.main = "index.js";
pkg.imports = { "#/*": "./*.js" };

delete pkg.devDependencies;
delete pkg.scripts;

fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 2));
fs.copyFileSync('LICENSE', 'dist/LICENSE');