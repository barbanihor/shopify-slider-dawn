// Wishlist functionality
function toggleWishlist(productId) {
  const btn = document.querySelector(`[data-product-id="${productId}"]`);
  const isActive = btn.classList.contains('active');

  if (isActive) {
    removeFromWishlist(productId);
    btn.classList.remove('active');
    btn.setAttribute('aria-label', 'Add to wishlist');
  } else {
    addToWishlist(productId);
    btn.classList.add('active');
    btn.setAttribute('aria-label', 'Remove from wishlist');
  }
}

function addToWishlist(productId) {
  let wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('shopify_wishlist', JSON.stringify(wishlist));
  }
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('shopify_wishlist', JSON.stringify(wishlist));
}

function getWishlist() {
  const wishlist = localStorage.getItem('shopify_wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function initWishlist() {
  const wishlist = getWishlist();
  wishlist.forEach(productId => {
    const btn = document.querySelector(`[data-product-id="${productId}"]`);
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-label', 'Remove from wishlist');
    }
  });
}

// Initialize wishlist on page load
document.addEventListener('DOMContentLoaded', initWishlist);