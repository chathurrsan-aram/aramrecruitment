#!/bin/bash
# Run this script locally to download all media assets from WordPress
# Usage: bash download-assets.sh

set -e

mkdir -p public/images public/docs

echo "Downloading images..."
curl -fSL -o public/images/logo.png "https://aram.org.uk/wp-content/uploads/2024/02/b-1.png"
echo "  ✓ logo.png"
curl -fSL -o public/images/hero-1.jpg "https://aram.org.uk/wp-content/uploads/2024/11/img_7845-1.jpg"
echo "  ✓ hero-1.jpg"
curl -fSL -o public/images/hero-2.jpg "https://aram.org.uk/wp-content/uploads/2024/09/img_1294.jpeg"
echo "  ✓ hero-2.jpg"
curl -fSL -o public/images/hero-3.jpg "https://aram.org.uk/wp-content/uploads/2023/12/copy-of-dsc_0064-2.jpg"
echo "  ✓ hero-3.jpg"
curl -fSL -o public/images/hero-4.jpg "https://aram.org.uk/wp-content/uploads/2024/11/img_8158-1.jpg"
echo "  ✓ hero-4.jpg"
curl -fSL -o public/images/hero-5.jpg "https://aram.org.uk/wp-content/uploads/2024/09/img_1591.jpeg"
echo "  ✓ hero-5.jpg"
curl -fSL -o public/images/what-we-do-hero.png "https://aram.org.uk/wp-content/uploads/2024/11/screenshot-2024-11-22-at-14.50.27.png"
echo "  ✓ what-we-do-hero.png"
curl -fSL -o public/images/strategy-diagram.png "https://aram.org.uk/wp-content/uploads/2024/11/partner-with-our-local-network-deliver-self-sustaining-systems-expand-systems-across-regions.png"
echo "  ✓ strategy-diagram.png"
curl -fSL -o public/images/trip-hero.jpg "https://aram.org.uk/wp-content/uploads/2024/12/whatsapp-image-2024-12-04-at-16.45.00.jpeg"
echo "  ✓ trip-hero.jpg"
curl -fSL -o public/images/research-hero.png "https://aram.org.uk/wp-content/uploads/2024/11/screenshot-2024-11-22-at-15.34.13.png"
echo "  ✓ research-hero.png"

echo ""
echo "Downloading PDFs..."
curl -fSL -o public/docs/aram-trip-report-2023.pdf "https://aram.org.uk/wp-content/uploads/2025/02/aram-trip-report-2023vf.pdf"
echo "  ✓ aram-trip-report-2023.pdf"
curl -fSL -o public/docs/aram-trip-report-2024.pdf "https://aram.org.uk/wp-content/uploads/2024/12/aram-2024-trip-report-1.pdf"
echo "  ✓ aram-trip-report-2024.pdf"
curl -fSL -o public/docs/how-we-organise-our-impact.pdf "https://aram.org.uk/wp-content/uploads/2026/01/how-we-organise-our-impact-1.pdf"
echo "  ✓ how-we-organise-our-impact.pdf"
curl -fSL -o public/docs/aram-trip-2026.pdf "https://aram.org.uk/wp-content/uploads/2026/01/aram-trip-2026-1.pdf"
echo "  ✓ aram-trip-2026.pdf"

echo ""
echo "All assets downloaded successfully!"
