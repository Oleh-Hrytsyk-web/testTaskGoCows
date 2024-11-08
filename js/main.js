import { casinos } from './casinosData.js';
import { generateStarsHTML } from './utils.js';
import { openPopup } from './popup.js';

const container = document.querySelector('.casino-list');
let visibleCount = 4;
const loadMoreCount = 5;

function renderCasinos() {
    container.innerHTML = '';
    casinos.slice(0, visibleCount).forEach(casino => {
        const casinoItem = document.createElement('div');
        casinoItem.classList.add('casino-item');
        casinoItem.innerHTML = `
        <img src="${casino.logo}" alt="${casino.name}" class="casino-logo">
        <div class="details">
          ${casino.new ? '<span class="new-badge">NEW</span>' : ''}
          <h3 class="casino-name">${casino.name}</h3>
          <div class="casino-info">
           <img src="../images/${casino.country}.png" alt="${casino.country}" class="casino-country">
           <div class="casino-rating">${casino.rating}${generateStarsHTML(casino.rating)}</div>
          </div>
        </div>
        <div class="casino-item-offers">
        <div class="casino-features"> 
         <button class="casino-free-spins">${casino.freeSpins}</button>
         <div class="casino-bonus">${casino.bonus}</div>
        </div>
         <a href="#" class="visit-button">VISIT</a>
        </div>
      `;
        container.appendChild(casinoItem);
    });

    if (visibleCount >= casinos.length) {
        document.querySelector('.load-more').style.display = 'none';
    }

    attachEventListenersToFreeSpinButtons();
}

document.querySelector('.load-more').addEventListener('click', () => {
    visibleCount += loadMoreCount;
    renderCasinos();
});

renderCasinos();

function attachEventListenersToFreeSpinButtons() {
    document.querySelectorAll('.casino-free-spins').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            openPopup(casinos[index], button);
        });
    });
}


