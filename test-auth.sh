#!/bin/bash

echo "=========================================="
echo "Testing NextAuth Authentication"
echo "=========================================="

# Test 1: Admin account
echo ""
echo "Test 1: Admin account (admin@authichain.com)"
echo "----------------------------------------"
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@authichain.com","password":"Admin123!","csrfToken":"test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo ""

# Test 2: User account
echo "Test 2: User account (user@authichain.com)"
echo "----------------------------------------"
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"user@authichain.com","password":"User123!","csrfToken":"test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo ""

# Test 3: John Doe account
echo "Test 3: John Doe account (john@doe.com)"
echo "----------------------------------------"
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"john@doe.com","password":"johndoe123","csrfToken":"test"}' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "=========================================="
echo "Testing Complete!"
echo "=========================================="
