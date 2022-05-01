const smallPics = document.getElementById('smallPics');
const bigPicImg = document.getElementById('bigPicImg');
const addBtn = document.getElementById('listingAddButton');

smallPics.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'IMG') {
    const rrc = event.target.src;
    bigPicImg.src = rrc;
  }
});

addBtn.addEventListener('click', async (event) => {
  const { id } = addBtn.dataset;

  const response = await fetch(`/listing/add/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
  console.log(response);
  if (response.status === 200) {
    addBtn.innerText = 'Added';
    addBtn.disabled = true;
  }
  // const registrationResponse = await response.json();
});
