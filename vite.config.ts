import { defineConfig } from "vite";

/**
 * O site é HTML e CSS estáticos. O Vite ficou por dois motivos apenas: copiar
 * `public/` para `out/` e servir com recarga durante o desenvolvimento. Não há
 * framework, plugin nem transformação de código — o `index.html` que sai do
 * build é o mesmo que está no repositório, e o `styles.css` chega intacto,
 * pelo caminho `/styles.css` que as páginas referenciam.
 */
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  build: {
    outDir: "out",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
