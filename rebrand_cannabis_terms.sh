#!/bin/bash

# AuthiChain Cannabis Terminology Rebranding Script
# This script replaces cannabis-specific terms with generic product terminology

APP_DIR="/home/ubuntu/authichain_premium/app"

echo "🔄 Starting comprehensive cannabis terminology rebranding..."
echo "=================================================="

# Create backup
echo "📦 Creating backup..."
cp -r "$APP_DIR" "$APP_DIR.backup_$(date +%Y%m%d_%H%M%S)"

# Function to replace terms in files (case-insensitive)
replace_term() {
    local old_term="$1"
    local new_term="$2"
    local file_pattern="${3:-*.tsx *.ts}"
    
    echo "   Replacing '$old_term' with '$new_term'..."
    
    # Find and replace in TypeScript/TSX files
    find "$APP_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) \
        ! -path "*/node_modules/*" \
        ! -path "*/.build/*" \
        ! -path "*/.next/*" \
        -exec sed -i "s/\b${old_term}\b/${new_term}/g" {} + 2>/dev/null || true
}

echo ""
echo "📝 Replacing user-facing terminology..."

# Replace common user-facing terms
replace_term "strain" "item"
replace_term "Strain" "Item"
replace_term "STRAIN" "ITEM"
replace_term "strains" "items"
replace_term "Strains" "Items"
replace_term "STRAINS" "ITEMS"

replace_term "cannabis" "product"
replace_term "Cannabis" "Product"
replace_term "CANNABIS" "PRODUCT"

replace_term "weed" "item"
replace_term "Weed" "Item"

replace_term "marijuana" "product"
replace_term "Marijuana" "Product"

replace_term "dispensary" "marketplace"
replace_term "Dispensary" "Marketplace"

replace_term "grower" "creator"
replace_term "Grower" "Creator"
replace_term "GROWER" "CREATOR"

# Replace technical terms in variable names and types
echo ""
echo "🔧 Replacing technical terminology..."

replace_term "strainType" "itemType"
replace_term "StrainType" "ItemType"
replace_term "strain_type" "item_type"

replace_term "strainName" "itemName"
replace_term "StrainName" "ItemName"

replace_term "cannabisData" "productData"
replace_term "CannabisData" "ProductData"

# Update specific phrases
echo ""
echo "💬 Updating specific phrases..."

find "$APP_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.build/*" \
    ! -path "*/.next/*" \
    -exec sed -i 's/genetics/attributes/g' {} + 2>/dev/null || true

find "$APP_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.build/*" \
    ! -path "*/.next/*" \
    -exec sed -i 's/cultivation/production/g' {} + 2>/dev/null || true

echo ""
echo "✅ Rebranding complete!"
echo "=================================================="
echo ""
echo "📊 Summary of remaining cannabis references:"
echo ""

# Count remaining references
REMAINING=$(cd "$APP_DIR" && grep -rn "strain\|cannabis\|weed\|marijuana\|hemp\|THC\|CBD\|dispensary\|grower" \
    --include="*.tsx" --include="*.ts" --include="*.json" \
    components/ app/ lib/ 2>/dev/null | grep -v node_modules | grep -v ".build" | wc -l)

echo "   Remaining references: $REMAINING"
echo ""
echo "⚠️  Note: Some references in type definitions, API routes, and database schemas"
echo "   may need manual review to avoid breaking functionality."
echo ""
