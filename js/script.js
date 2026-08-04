const categories = ["All", ...new Set(SHOES.map((s) => s.category))];
let activeCategory = "All";
let searchTerm = "";

const shoesGrid = document.getElementById("shoesGrid");
const featuredGrid = document.getElementById("featuredGrid");
const filtersEl = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const heroCount = document.getElementById("heroCount");

function formatPrice(price) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function shoeCard(shoe) {
  return `
    <article class="shoe-card" data-id="${shoe.id}">
      <div class="shoe-media">
        <img src="${shoe.image}" alt="${shoe.name}" loading="lazy" />
        <span class="shoe-year">'${String(shoe.year).slice(2)}</span>
        <span class="shoe-cat">${shoe.category}</span>
      </div>
      <div class="shoe-body">
        <h3 class="shoe-name">${shoe.name}</h3>
        <p class="shoe-tagline">${shoe.tagline}</p>
        <div class="shoe-foot">
          <span class="shoe-price">${formatPrice(shoe.price)}</span>
          <span class="shoe-cta">View</span>
        </div>
      </div>
    </article>
  `;
}

function renderFilters() {
  filtersEl.innerHTML = categories
    .map(
      (cat) => `
      <button class="filter-btn${cat === activeCategory ? " active" : ""}" data-category="${cat}">
        ${cat}
      </button>
    `
    )
    .join("");
}

function renderShoes() {
  const filtered = SHOES.filter((shoe) => {
    const matchesCategory = activeCategory === "All" || shoe.category === activeCategory;
    const matchesSearch = shoe.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  shoesGrid.innerHTML = filtered.map(shoeCard).join("");
  emptyState.hidden = filtered.length > 0;
  heroCount.textContent = filtered.length;
}

function renderFeatured() {
  const featured = SHOES.filter((s) => s.id === 1 || s.id === 7 || s.id === 3);
  featuredGrid.innerHTML = featured.map(shoeCard).join("");
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  activeCategory = btn.dataset.category;
  renderFilters();
  renderShoes();
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderShoes();
});

renderFilters();
renderFeatured();
renderShoes();
