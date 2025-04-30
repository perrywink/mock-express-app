#!/bin/bash

BASE_URL="https://mock-express-app-production.up.railway.app"

endpoints=(
  "/"
  "/api/users"
  "/api/users/1"
  "/api/products"
  "/api/products/1"
  "/api/orders"
  "/api/orders/123"
  "/api/settings"
  "/api/admin/metrics"
  "/api/admin/logs"
  "/api/admin/clear-cache"
)

# Include POST, PUT, DELETE samples
echo "Hitting GET endpoints..."
for ep in "${endpoints[@]}"; do
  echo "GET $BASE_URL$ep"
  curl -s -X GET "$BASE_URL$ep" -H "Content-Type: application/json"
  echo -e "\n"
done

echo "Testing POST endpoints..."
curl -s -X POST "$BASE_URL/api/users" -H "Content-Type: application/json" -d '{"name":"New User"}'
echo -e "\n"
curl -s -X POST "$BASE_URL/api/products" -H "Content-Type: application/json" -d '{"name":"Product A"}'
echo -e "\n"
curl -s -X POST "$BASE_URL/api/orders" -H "Content-Type: application/json" -d '{"item":"Pizza"}'
echo -e "\n"
curl -s -X POST "$BASE_URL/api/admin/clear-cache" -H "Content-Type: application/json"
echo -e "\n"

echo "Testing PUT endpoints..."
curl -s -X PUT "$BASE_URL/api/users/1" -H "Content-Type: application/json" -d '{"name":"Updated"}'
echo -e "\n"
curl -s -X PUT "$BASE_URL/api/products/1" -H "Content-Type: application/json" -d '{"name":"Updated Product"}'
echo -e "\n"

echo "Testing DELETE endpoints..."
curl -s -X DELETE "$BASE_URL/api/users/1"
echo -e "\n"
curl -s -X DELETE "$BASE_URL/api/products/1"
echo -e "\n"
curl -s -X DELETE "$BASE_URL/api/orders/123"
echo -e "\n"
