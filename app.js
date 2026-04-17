gsap.registerPlugin(ScrollTrigger);

// animations
gsap.utils.toArray(".scene").forEach(scene => {
  gsap.from(scene, {
    opacity: 0,
    y: 80,
    duration: 1.2,
    scrollTrigger: {
      trigger: scene,
      start: "top 80%"
    }
  });
});

// load products
async function loadProducts() {
  const res = await fetch("/data/products.json");
  const products = await res.json();

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}">
      <h3>${p.title}</h3>
      <p>${p.price}</p>
      <a href="product.html">View</a>
    </div>
  `).join("");
}

loadProducts();