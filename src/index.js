async function displayRamens() {
  const response = await fetch('http://localhost:3000/ramens');
  const ramens = await response.json();

  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramens.forEach((ramen) => {
    const imgContainer = document.createElement('div')
    const img = document.createElement('img');
    img.src = ramen.image;
    img.addEventListener('click', () => handleClick(ramen));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => handleDelete(ramen));

    imgContainer.appendChild(img);
    imgContainer.appendChild(deleteButton);

    ramenMenu.appendChild(img);
  });
}

function handleDelete(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenDetail = document.getElementById('ramen-detail');

  const ramenItem = document.querySelector(`[data-id="${ramen.id}"]`);
  if (ramenItem) {
    ramenMenu.removeChild(ramenItem.parentElement);
  }

  if (ramenDetail.dataset.id === ramen.id) {
    ramenDetail.innerHTML = '';
  }
}

function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
    <img src="${ramen.image}" />
    <h2>${ramen.name}</h2>
    <p><strong>Rating:</strong> ${ramen.rating}</p>
    <p><strong>Comment:</strong> ${ramen.comment}</p>
  `;
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const response = await fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image, rating, comment }),
    });

    if (response.ok) {
      displayRamens();
      form.reset();
    }
  });
}

async function updateRamenById(id, rating, comment) {
  try {
    const response = await fetch(`http://localhost:3000/ramens/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rating, comment })
    });

    if (!response.ok) {
      throw new Error('Failed to update ramen');
    }

    console.log('Ramen updated successfully');
  } catch (error) {
    console.error('Error updating ramen:', error);
  }
}


function main() {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
    addEditSubmitListener(); // Add this line
  });
}

main();
