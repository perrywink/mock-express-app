#!/bin/bash

# BASE_URL="https://mock-express-app-staging.up.railway.app"
BASE_URL="https://localhost:3000"

echo "🔁 Hitting root endpoint..."
curl -s -X GET "$BASE_URL/" | jq

echo "👤 Users..."
for i in {1..5}; do
  name="User$i"
  email="user$i@example.com"
  curl -s -X POST "$BASE_URL/api/users" -H "Content-Type: application/json" -d "{\"name\":\"$name\",\"email\":\"$email\"}" | jq
done
curl -s -X GET "$BASE_URL/api/users" | jq
curl -s -X GET "$BASE_URL/api/users/3" | jq
curl -s -X PUT "$BASE_URL/api/users/3" -H "Content-Type: application/json" -d '{"name":"Updated User 3","email":"updated3@example.com"}' | jq
curl -s -X DELETE "$BASE_URL/api/users/2" | jq

echo "📦 Products..."
for i in {1..4}; do
  name="Product$i"
  price=$(awk "BEGIN {print 10 + $i * 2.5}")
  curl -s -X POST "$BASE_URL/api/products" -H "Content-Type: application/json" -d "{\"name\":\"$name\",\"price\":$price}" | jq
done
curl -s -X GET "$BASE_URL/api/products" | jq
curl -s -X GET "$BASE_URL/api/products/2" | jq
curl -s -X PUT "$BASE_URL/api/products/2" -H "Content-Type: application/json" -d '{"name":"Updated Product 2","price":42.99}' | jq
curl -s -X DELETE "$BASE_URL/api/products/3" | jq

echo "🧾 Orders..."
for i in {1..3}; do
  uid=$((i % 5 + 1))
  total=$(awk "BEGIN {print 50 + $i * 3.25}")
  curl -s -X POST "$BASE_URL/api/orders" -H "Content-Type: application/json" -d "{\"userId\":$uid,\"productIds\":[1,2,3],\"total\":$total}" | jq
done
curl -s -X GET "$BASE_URL/api/orders" | jq
curl -s -X GET "$BASE_URL/api/orders/2" | jq
curl -s -X PUT "$BASE_URL/api/orders/2" -H "Content-Type: application/json" -d '{"userId":1,"productIds":[1],"total":22.49}' | jq
curl -s -X DELETE "$BASE_URL/api/orders/1" | jq

echo "⚙️ Settings..."
curl -s -X GET "$BASE_URL/api/settings" | jq
curl -s -X POST "$BASE_URL/api/settings" -H "Content-Type: application/json" -d '{"theme":"dark","notifications":false}' | jq
curl -s -X POST "$BASE_URL/api/settings" -H "Content-Type: application/json" -d '{"theme":"solarized","notifications":true}' | jq

echo "🛠️ Admin..."
curl -s -X GET "$BASE_URL/api/admin/metrics" | jq
curl -s -X GET "$BASE_URL/api/admin/logs" | jq
curl -s -X POST "$BASE_URL/api/admin/clear-cache" | jq

echo "✅ Done hitting all endpoints with diverse data."
