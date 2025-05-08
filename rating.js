document.getElementById('toggleReviewBox').addEventListener('click', () => {
    const box = document.querySelector('.review-box');
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
  });

  // Show the box if there are existing reviews
  if (JSON.parse(localStorage.getItem('avaia_reviews') || '[]').length > 0) {
    document.querySelector('.review-box').style.display = 'block';
  }
const starsContainer = document.getElementById('starsContainer');
const reviewsList = document.getElementById('reviewsList');
let selectedRating = 0;

function createStars() {
  starsContainer.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.innerHTML = '&#9733;';
    star.className = 'star';
    star.dataset.rating = i;
    star.onclick = () => {
      selectedRating = i;
      updateStars();
    };
    starsContainer.appendChild(star);
  }
}

function updateStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.classList.toggle('selected', parseInt(star.dataset.rating) <= selectedRating);
  });
}

function submitReview() {
  const name = document.getElementById('reviewerName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  if (!name || !text || selectedRating === 0) return alert('Please complete all fields.');

  const review = {
    name,
    rating: selectedRating,
    text
  };

  const reviews = JSON.parse(localStorage.getItem('avaia_reviews') || '[]');
  reviews.push(review);
  localStorage.setItem('avaia_reviews', JSON.stringify(reviews));
  renderReviews();
  clearForm();
}

function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem('avaia_reviews') || '[]');
  reviewsList.innerHTML = reviews.map(r => `
    <div class="review-item">
      <strong>${sanitize(r.name)}</strong> (${r.rating} ★)<br>
      <span>${sanitize(r.text)}</span>
    </div>
  `).join('');
}

function clearForm() {
  document.getElementById('reviewerName').value = '';
  document.getElementById('reviewText').value = '';
  selectedRating = 0;
  updateStars();
}

function clearReviews() {
  if (confirm('Clear all reviews?')) {
    localStorage.removeItem('avaia_reviews');
    renderReviews();
  }
}

function sanitize(str) {
  return str.replace(/[<>]/g, '');
}

createStars();
renderReviews();
document.getElementById('backBtn').onclick = function () {
    document.querySelector('.review-box').style.display = 'none';
    const toggleBtn = document.getElementById('toggleReviewBtn');
    if (toggleBtn) toggleBtn.style.display = 'inline-block';
  };
  