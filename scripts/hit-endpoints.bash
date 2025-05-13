#!/bin/bash

BASE_URL="https://mock-express-app-production.up.railway.app"

echo "🔁 Hitting root endpoint..."
curl -s -X GET "$BASE_URL/" | jq

echo "👤 Users..."
curl -s -X GET "$BASE_URL/api/users" | jq
curl -s -X GET "$BASE_URL/api/users/1" | jq
curl -s -X POST "$BASE_URL/api/users" -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}' | jq
curl -s -X PUT "$BASE_URL/api/users/1" -H "Content-Type: application/json" -d '{"name":"Updated User","email":"updated@example.com"}' | jq
curl -s -X DELETE "$BASE_URL/api/users/1" | jq

echo "📦 Products..."
curl -s -X GET "$BASE_URL/api/products" | jq
curl -s -X GET "$BASE_URL/api/products/1" | jq
curl -s -X POST "$BASE_URL/api/products" -H "Content-Type: application/json" -d '{"name":"Widget","price":19.99}' | jq
curl -s -X PUT "$BASE_URL/api/products/1" -H "Content-Type: application/json" -d '{"name":"Updated Widget","price":17.99}' | jq
curl -s -X DELETE "$BASE_URL/api/products/1" | jq

echo "🧾 Orders..."
curl -s -X GET "$BASE_URL/api/orders" | jq
curl -s -X GET "$BASE_URL/api/orders/1" | jq
curl -s -X POST "$BASE_URL/api/orders" -H "Content-Type: application/json" -d '{"userId":1,"productIds":[1,2],"total":59.98}' | jq
curl -s -X PUT "$BASE_URL/api/orders/1" -H "Content-Type: application/json" -d '{"userId":1,"productIds":[2],"total":29.99}' | jq
curl -s -X DELETE "$BASE_URL/api/orders/1" | jq

echo "⚙️ Settings..."
curl -s -X GET "$BASE_URL/api/settings" | jq
curl -s -X POST "$BASE_URL/api/settings" -H "Content-Type: application/json" -d '{"theme":"light","notifications":true}' | jq

echo "🛠️ Admin..."
curl -s -X GET "$BASE_URL/api/admin/metrics" | jq
curl -s -X GET "$BASE_URL/api/admin/logs" | jq
curl -s -X POST "$BASE_URL/api/admin/clear-cache" | jq

echo "✅ Done hitting all endpoints."
