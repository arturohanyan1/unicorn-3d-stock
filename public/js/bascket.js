const bascketMain = document.getElementById('bascketMain');

bascketMain.addEventListener('click', async (ev) => {
  if (ev.target.tagName === 'A' && ev.target.innerText === 'Remove') {
    const { id } = ev.target.dataset;
    if (id) {
      const response = await fetch(`/basket/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.status === 200) {
        const oneModel = document.getElementById(`forOneModel${id}`);
        const priceModel = oneModel.querySelector('.bascketPrice');
        const totalPrice = document.querySelectorAll('.itemsTot')[1];
        const priceModelString = priceModel.textContent.replace(/[^0-9]/g, '');
        const totalPriceString = totalPrice.textContent.replace(/[^0-9]/g, '');
        const currPrice = Number(totalPriceString) - Number(priceModelString);
        totalPrice.innerHTML = currPrice;
        oneModel.remove();
      } else {
        alert('ERROR');
      }
    }
  }
});
