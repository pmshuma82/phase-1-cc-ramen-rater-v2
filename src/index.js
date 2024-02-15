// index.js

// Function to fetch and display ramens
async function displayRamens() {
  const response = await fetch('http://localhost:3000/ramens');
  const ramens = await response.json();
  const ramenMenu = document.getElementById('ramen-menu');

  // Clear the existing content of the ramenMenu
  ramenMenu.innerHTML = '';

  // Iterate over the ramen objects and create image elements
  ramens.forEach(ramen => {
    if (ramen.image) {
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;
      ramenImg.alt = ramen.name;
      ramenImg.className = 'ramen-image';
      ramenImg.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(ramenImg);
    }
  });
}

// Function to handle image click
function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  const ramenNames = {
    1: "Shoyu Ramen",
    2: "Naruto Ramen",
    3: "Nirvana Shiromaru",
    4: "Gyukotsu Ramen",
    5: "Kojiro Red Ramen"
  };
  const clickedImage = document.createElement('img');
  clickedImage.src = ramen.image;
  clickedImage.alt = ramenNames[ramen.id];
  clickedImage.className = 'ramen-image-clicked';

  const nameText = document.createElement('p');
  nameText.textContent = `${ramenNames[ramen.id]} - ${ramen.restaurant}`;
  nameText.style.textAlign = 'center';
  nameText.style.marginTop = '10px';

  ramenDetail.innerHTML = '';
  ramenDetail.appendChild(clickedImage);
  ramenDetail.appendChild(nameText);

  const detailInfo = document.createElement('div');
  detailInfo.className = 'detail-info';
  const ratingText = document.createElement('p');
  ratingText.textContent = 'Rating:';
  const rating = document.createElement('p');
  rating.textContent = ramen.rating;
  const commentText = document.createElement('p');
  commentText.textContent = 'Comment:';
  const comment = document.createElement('p');
  comment.textContent = ramen.comment;

  detailInfo.appendChild(ratingText);
  detailInfo.appendChild(rating);
  detailInfo.appendChild(commentText);
  detailInfo.appendChild(comment);

  ramenDetail.appendChild(detailInfo);
}


// Function to add submit listener to the form
function addSubmitListener(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const newRamen = {
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      image: formData.get('image'),
      rating: formData.get('rating'),
      comment: formData.get('comment')
    };
    const response = await fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen)
    });
    if (response.ok) {
      displayRamens();
      form.reset();
    }
  });
}

// Main function to start the program
function main() {
  displayRamens();
  const newRamenForm = document.getElementById('new-ramen');
  addSubmitListener(newRamenForm);
}

// Call main function after DOM has loaded
document.addEventListener('DOMContentLoaded', main);

