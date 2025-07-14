let scrollElement = document.querySelector('.scroll');
let countImages = document.querySelectorAll('.scroll img').length;
let maxWithScroll = countImages * 60;
let marginLeftScroll = 0;

// Criando HTML dinâmicamente para as seleções
let htmlForSelections = '';

for (let i = 0; i < countImages; i++) {
    if (i === 0)
        htmlForSelections += `<div class="selection selectioned" id="${i}"></div>`;
    else
        htmlForSelections += `<div class="selection" id="${i}"></div>`;
}

document.querySelector('.scroll__selection')
    .innerHTML = htmlForSelections;

scrollElement.style.width = `${maxWithScroll}vw`;

// Mudança na margem do scroll de acordo com o clique
document.querySelectorAll('.selection').forEach(selection => {
    selection.addEventListener('click', selectionClick => {
        UpdateScroll(scrollElement, selectionClick.target);
        CleanSelection(selectionClick.target);
    });
});

function UpdateScroll(scrollElement, selectionClick) {
    scrollElement.style.marginLeft = `-${60*selectionClick.id}vw`;
}

function CleanSelection(selectionClick) {
    selectionClick.classList.add('selectioned');
    document.querySelectorAll('.selection').forEach(selection => {
        if (selection.id !== selectionClick.id) {
            selection.classList.remove('selectioned');
        }
    });
}

// Contador de dias à partir do dia 17 de maio de 2025
let startDate = new Date('2025-05-17');

function updateCounter() {
    let currentDate = new Date();
    let timeDiff = currentDate.getTime() - startDate.getTime();
    
    let totalSeconds = Math.floor(timeDiff / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);
    let totalDays = Math.floor(totalHours / 24);
    let totalMonths = Math.floor(totalDays / 30.44);
    
    let days = totalDays % 30;
    let hours = totalHours % 24;
    let minutes = totalMinutes % 60;
    let seconds = totalSeconds % 60;
    
    document.querySelector('.counter').innerHTML = `
        ${totalMonths} ${totalMonths === 1 ? 'mês' : 'meses'},
        ${days} ${days === 1 ? 'dia' : 'dias'},
        ${hours} ${hours === 1 ? 'hora' : 'horas'},
        ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'},
        e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}.
    `;
}

updateCounter();

setInterval(updateCounter, 1000);

//

let selectors = document.querySelectorAll('.selection');

function DoScroll() {
    let currentSelected = document.querySelector('.selection.selectioned');
    let currentIndex = parseInt(currentSelected.id);
    let nextIndex = currentIndex + 1 == countImages ? 0 : currentIndex + 1;
    let currentSelection = document.getElementById(`${nextIndex}`);
    
    UpdateScroll(scrollElement, currentSelection);
    CleanSelection(currentSelection);
}

DoScroll();

setInterval(DoScroll, 5000)