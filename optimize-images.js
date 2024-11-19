const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImage() {
    const inputDir = 'src/public/images/heros';
    const outputDir = 'src/public/images/heros/optimized';

    try {
        // Ensure output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Optimize hero-image_2.jpg for desktop (1920px width)
        await sharp(`${inputDir}/hero-image_2.jpg`)
            .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: 75 }) // Reduced quality slightly
            .toFile(`${outputDir}/hero-desktop.webp`);

        // Optimize hero-image_2.jpg for mobile (640px width)
        await sharp(`${inputDir}/hero-image_2.jpg`)
            .resize(640, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: 75 })
            .toFile(`${outputDir}/hero-mobile.webp`);

        // Also create JPG versions for fallback with higher compression
        await sharp(`${inputDir}/hero-image_2.jpg`)
            .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: 70, mozjpeg: true }) // Reduced quality and using mozjpeg
            .toFile(`${outputDir}/hero-desktop.jpg`);

        await sharp(`${inputDir}/hero-image_2.jpg`)
            .resize(640, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: 70, mozjpeg: true })
            .toFile(`${outputDir}/hero-mobile.jpg`);

        console.log('Images optimized successfully!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImage();
