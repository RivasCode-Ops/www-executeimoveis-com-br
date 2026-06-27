import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '_recovered-source');

const homeComponents = [
  'AboutSection.tsx',
  'AuthoritySection.tsx',
  'BackToTop.tsx',
  'ConsultaBanner.tsx',
  'ContactSection.tsx',
  'CoverageSection.tsx',
  'CTAFinal.tsx',
  'DifferentialsSection.tsx',
  'ExitIntentPopup.tsx',
  'FAQSection.tsx',
  'Footer.tsx',
  'HeroSection.tsx',
  'HowItWorks.tsx',
  'Navbar.tsx',
  'PainPointsSection.tsx',
  'PartnersSection.tsx',
  'PrivacySection.tsx',
  'ServicesSection.tsx',
  'WhatsAppFloat.tsx',
  'WhyRegularize.tsx',
];

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function copyFile(from, to) {
  ensureDir(dirname(to));
  cpSync(from, to);
}

// Remove GitHub boilerplate src
const boilerplate = [
  join(root, 'src', 'App.jsx'),
  join(root, 'src', 'App.css'),
  join(root, 'src', 'main.jsx'),
  join(root, 'src', 'components'),
];
for (const p of boilerplate) {
  if (existsSync(p)) rmSync(p, { recursive: true, force: true });
}

ensureDir(join(root, 'src', 'pages', 'home', 'components'));
ensureDir(join(root, 'src', 'components', 'feature'));
ensureDir(join(root, 'src', 'router'));
ensureDir(join(root, 'src', 'lib'));
ensureDir(join(root, 'src', 'i18n'));
ensureDir(join(root, 'public'));

copyFile(join(src, 'App.tsx'), join(root, 'src', 'App.tsx'));
copyFile(join(src, 'main.tsx'), join(root, 'src', 'main.tsx'));
copyFile(join(src, 'index.css'), join(root, 'src', 'index.css'));
copyFile(join(src, 'page.tsx'), join(root, 'src', 'pages', 'home', 'page.tsx'));
copyFile(join(src, 'NotFound.tsx'), join(root, 'src', 'pages', 'NotFound.tsx'));
copyFile(join(src, 'config.tsx'), join(root, 'src', 'router', 'config.tsx'));
copyFile(join(src, 'index.ts'), join(root, 'src', 'router', 'index.ts'));
copyFile(join(src, 'AnimateIn.tsx'), join(root, 'src', 'components', 'feature', 'AnimateIn.tsx'));

for (const name of homeComponents) {
  copyFile(join(src, name), join(root, 'src', 'pages', 'home', 'components', name));
}

for (const name of [
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'eslint.config.ts',
  'vite-env.d.ts',
]) {
  copyFile(join(src, name), join(root, name));
}

const recoveredIndexHtml = join(src, 'index.html');
if (existsSync(recoveredIndexHtml)) {
  let html = readFileSync(recoveredIndexHtml, 'utf8');
  if (!html.includes('/src/main.tsx')) {
    html = html.replace(/src="[^"]*"/, 'src="/src/main.tsx"');
  }
  writeFileSync(join(root, 'index.html'), html);
}

const imagesSrc = join(root, 'out', 'images');
if (existsSync(imagesSrc)) {
  cpSync(imagesSrc, join(root, 'public', 'images'), { recursive: true });
}

// Minimal i18n (components do not use translations)
writeFileSync(
  join(root, 'src', 'i18n', 'index.ts'),
  `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n.use(initReactI18next).init({
  lng: 'pt',
  fallbackLng: 'pt',
  resources: { pt: { translation: {} } },
});

export default i18n;
`,
);

console.log('Rebuild from _recovered-source complete.');
