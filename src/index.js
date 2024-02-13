// Display ramen images
async function displayRamens() {
  try {
    const response = await fetch('http://localhost:3000/ramens');
    const ramens = await response.json();

    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = '';

    ramens.forEach((ramen) => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.classList.add('ramen-image');
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching and displaying ramens:', error);
  }
}

// Handle click event
function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <div class="ramen-detail-image-container">
      <img class="ramen-image" src="${ramen.image}" alt="${ramen.name}" />
      <p class="ramen-name">${ramen.name}</p>
    </div>
    <div>
      <p><strong>Rating:</strong> ${ramen.rating}</p>
      <p><strong>Comment:</strong> ${ramen.comment}</p>
    </div>
  `;
  const form = document.getElementById('new-ramen');
  const clickedImage = event.target;
  form.style.left = `${clickedImage.offsetLeft + (clickedImage.clientWidth / 2)}px`;
  form.style.top = `${clickedImage.offsetTop + clickedImage.clientHeight}px`;
}

// Add submit listener
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;
    const newRamen = { name, restaurant, image, rating, comment };
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.classList.add('ramen-image');
    img.addEventListener('click', () => handleClick(newRamen));
    document.getElementById('ramen-menu').appendChild(img);
    form.reset();
  });
}

// Main function to start the program logic
function main() {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  });
}

main();

