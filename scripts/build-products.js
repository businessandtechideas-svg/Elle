const fs = require("fs");

const folder = "./content/products";
const output = "./data/products.json";

// ✅ safety check
if (!fs.existsSync(folder)) {
  console.log("❌ Missing folder: content/products");
  console.log("👉 Create it first: mkdir -p content/products");
  process.exit(1);
}

const files = fs.readdirSync(folder);
let products = [];

files.forEach(file => {
  const content = fs.readFileSync(folder + "/" + file, "utf8");

  const match = content.match(/---([\s\S]*?)---/);
  if (!match) return;

  const lines = match[1].split("\n");
  let obj = {};

  lines.forEach(line => {
    const [k, ...v] = line.split(":");
    if (!k) return;
    obj[k.trim()] = v.join(":").trim();
  });

  products.push(obj);
});

fs.writeFileSync(output, JSON.stringify(products, null, 2));
console.log("Products built successfully");
