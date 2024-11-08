export function openPopup(casino, button) {
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupTitle = document.querySelector('.popup-title');
    const promoCodeValue = document.querySelector('.promo-code-value');
    const gamesAllowed = document.querySelector('.games-allowed');
    const cashOutValue = document.querySelector('.cash-out-value');
    const depositValue = document.querySelector('.deposit-value');

    popupTitle.textContent = casino.popupTitle;
    promoCodeValue.textContent = casino.promoCode || "N/A";
    gamesAllowed.textContent = casino.gamesAllowed.join(", ");
    cashOutValue.textContent = casino.maxCashOut;
    depositValue.textContent = casino.minDeposit;

    if (casino.minDeposit.toLowerCase() === "free") {
        depositValue.classList.add('free');
    } else {
        depositValue.classList.remove('free');
    }

    const buttonRect = button.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

    const isSmallScreen = window.innerWidth < 400;

    if (isSmallScreen) {
        popupOverlay.style.top = (buttonRect.top + scrollTop + buttonRect.height + 5) + 'px';
        popupOverlay.style.left = (buttonRect.left + scrollLeft - 40) + 'px'; 
    } else {
        popupOverlay.style.top = (buttonRect.top + scrollTop + buttonRect.height + 10) + 'px';
        popupOverlay.style.left = (buttonRect.left + scrollLeft - 94) + 'px';
    }

    popupOverlay.style.display = 'block';
}


document.querySelector('.close-popup').addEventListener('click', () => {
    document.querySelector('.popup-overlay').style.display = 'none';
});


document.querySelectorAll('.casino-free-spins').forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        openPopup(casinos[index], button); 
    });
});

document.addEventListener('click', (event) => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const popup = document.querySelector('.popup');
    const casinoButtons = document.querySelectorAll('.casino-free-spins');

    if (!popupOverlay.contains(event.target) && !popup.contains(event.target) && !Array.from(casinoButtons).includes(event.target)) {
        popupOverlay.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const promoCodeValue = document.querySelector('.promo-code-value');
    const promoCodeContainer = document.querySelector('.popup-promo-code');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = '<div class="copy-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="12.261" viewBox="0 0 16 12.261"><defs><style>.a{fill:#2ea921;}</style></defs><path class="a" d="M19.5,6.879,8.529,17.851,3.5,12.822l1.289-1.289,3.739,3.73L18.211,5.59Z" transform="translate(-3.5 -5.59)"/></svg><span>Code copied to clipboard.</span></div>';
    document.body.appendChild(tooltip);

    promoCodeContainer.addEventListener('click', function () {
        const textToCopy = promoCodeValue.textContent;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(function () {
                const rect = promoCodeContainer.getBoundingClientRect();

                tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`; // Тултіп з'являється вище

                tooltip.classList.add('show');

                setTimeout(function () {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(function (error) {
                console.error('Error copying text: ', error);
            });
        }
    });
});