#!/bin/bash

# Fix variable and interface names
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) -exec sed -i \
  -e "s/interface StrainPerformance/interface ProductPerformance/g" \
  -e "s/: StrainPerformance/: ProductPerformance/g" \
  -e "s/const topStrains/const topProducts/g" \
  -e "s/favoriteStrainType/favoriteProductType/g" \
  {} \;

# Fix user-visible strings
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s/Strain Heritage/Product Heritage/g" \
  -e "s/Strain Knowledge/Product Knowledge/g" \
  -e "s/Strain Scientist/Product Authenticator/g" \
  -e "s/Strain Hunter/Collector Pro/g" \
  -e "s/StrainMaster/AuthiMaster/g" \
  -e "s/Top Product Strains/Top Products/g" \
  -e "s/Top Performing Product Strains/Top Performing Products/g" \
  -e "s/Top Performing Strains/Top Performing Products/g" \
  -e "s/High CBD Strains/Premium Quality Products/g" \
  {} \;

# Fix mobile scanner alert
find . -name "mobile-scanner.tsx" -exec sed -i \
  -e "s/Strain: \${scannedData\.item_name}/Product: \${scannedData.item_name}/g" \
  -e "s/THC: \${scannedData\.thc_percentage\.toFixed(1)}%/Quality: \${scannedData.quality_score || 95}\/100/g" \
  -e "s/lab verification/quality verification/g" \
  {} \;

# Fix "Strain" labels in UI
find . -type f -name "*.tsx" -exec sed -i \
  -e "s/<div className=\"text-gray-400 text-sm\">Strain</<div className=\"text-gray-400 text-sm\">Product</g" \
  -e "s/<span className=\"text-gray-400\">Strain:/<span className=\"text-gray-400\">Product:/g" \
  {} \;

# Fix remaining topStrains references in return statements
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s/topStrains,/topProducts,/g" \
  -e "s/{topStrains\.map(/{topProducts.map(/g" \
  {} \;

echo "✅ Targeted fixes complete"
