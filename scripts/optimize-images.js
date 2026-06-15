/**
 * Script para otimizar imagens PNG para WebP
 * Uso: node scripts/optimize-images.js
 * 
 * Requer: npm install --save-dev sharp
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "../public");

async function optimizeImages() {
  console.log("🖼️  Iniciando otimização de imagens...\n");

  try {
    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

    if (imageFiles.length === 0) {
      console.log("❌ Nenhuma imagem encontrada em /public");
      return;
    }

    console.log(`📦 Encontradas ${imageFiles.length} imagens\n`);

    for (const file of imageFiles) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace(/\.[^.]+$/, ".webp"));

      console.log(`⚙️  Convertendo: ${file}`);

      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const savings = Math.round(((inputSize - outputSize) / inputSize) * 100);

      console.log(
        `   ✅ Salvo como: ${path.basename(outputPath)}\n   Economia: ${savings}% (${Math.round(inputSize / 1024)}KB → ${Math.round(outputSize / 1024)}KB)\n`
      );
    }

    console.log("\n✨ Otimização concluída!");
    console.log("📝 Dica: Use <picture> para fallback: <picture><source srcSet='image.webp' type='image/webp'><img src='image.png' /></picture>");
  } catch (error) {
    console.error("❌ Erro:", error.message);
    process.exit(1);
  }
}

optimizeImages();
