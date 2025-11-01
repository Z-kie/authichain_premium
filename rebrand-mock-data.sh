#!/bin/bash

# AuthiChain Mock Data Rebranding Script
# This script replaces cannabis-specific mock data with generic product data

echo "🔄 Starting AuthiChain Mock Data Rebranding..."

cd /home/ubuntu/authichain_premium/app

# Product Name Replacements
echo "📝 Replacing product names..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/Purple Haze/Rare Diamond/g" \
  -e "s/OG Kush/Blue Sapphire/g" \
  -e "s/Sour Diesel/Gold Artifact/g" \
  -e "s/Girl Scout Cookies/Vintage Watch/g" \
  -e "s/Blue Dream/Ruby Collection/g" \
  -e "s/Gorilla Glue/Platinum Edition/g" \
  -e "s/Wedding Cake/Silver Legacy/g" \
  -e "s/Gelato/Emerald Series/g" \
  -e "s/White Widow/Crystal Art/g" \
  -e "s/Jack Herer/Classic Masterpiece/g" \
  -e "s/Northern Lights/Aurora Item/g" \
  -e "s/AK-47/Heritage Piece/g" \
  {} \;

# Cannabis-specific terms to product terms
echo "🔧 Replacing cannabis terms..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/High CBD/Premium Quality/g" \
  -e "s/High THC/Ultra Rare/g" \
  -e "s/CBD-dominant/Quality-certified/g" \
  -e "s/THC-dominant/Rarity-focused/g" \
  -e "s/\bStrain\b/Product/g" \
  -e "s/\bstrain\b/product/g" \
  -e "s/\bStrains\b/Products/g" \
  -e "s/\bstrains\b/products/g" \
  {} \;

# Variable name replacements
echo "🔤 Replacing variable names..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/topStrains/topProducts/g" \
  -e "s/favoriteStrain/favoriteProduct/g" \
  -e "s/strainType/productType/g" \
  -e "s/strainData/productData/g" \
  -e "s/strainInfo/productInfo/g" \
  {} \;

# Cannabis industry terms
echo "🏭 Replacing industry-specific terms..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/cannabis culture/collector culture/g" \
  -e "s/cannabis industry/collectibles industry/g" \
  -e "s/cannabis product/authenticated product/g" \
  -e "s/cannabis market/luxury market/g" \
  {} \;

# Scanner/lab terminology
echo "🔬 Replacing lab/scanner terms..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/lab verification/quality verification/g" \
  -e "s/lab certified/quality certified/g" \
  -e "s/lab score/quality score/g" \
  -e "s/lab test/authenticity test/g" \
  {} \;

# StrainChain references
echo "🏷️ Replacing remaining StrainChain references..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/StrainChain/AuthiChain/g" \
  -e "s/strainchain/authichain/g" \
  {} \;

# Titles and display names
echo "📊 Updating titles and display content..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/Trending +156%/Trending +156%/g" \
  -e "s/Optimize Purple Haze Pricing/Optimize Rare Diamond Pricing/g" \
  -e "s/medical product expansion/authenticated product expansion/g" \
  {} \;

# Seller/creator names
echo "👤 Replacing seller names..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i \
  -e "s/StrainMaster/AuthiMaster/g" \
  -e "s/Strain Scientist/Product Authenticator/g" \
  -e "s/Strain Hunter/Collector Pro/g" \
  {} \;

echo "✅ Rebranding complete!"
echo "📊 Checking remaining references..."
remaining=$(grep -r -i "cannabis\|strain" . --include="*.tsx" --include="*.ts" --include="*.js" 2>/dev/null | grep -v node_modules | wc -l)
echo "Remaining references: $remaining"

if [ $remaining -gt 0 ]; then
  echo "⚠️  Some references remain. Running detailed check..."
  grep -r -i "cannabis\|strain" . --include="*.tsx" --include="*.ts" --include="*.js" 2>/dev/null | grep -v node_modules | head -20
fi

echo "✨ Mock data rebranding complete!"
