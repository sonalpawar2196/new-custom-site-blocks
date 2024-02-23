import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else {
        div.className = 'cards-card-body';
        const newDiv = document.createElement('div');
        newDiv.className = 'cards'; // Creating new div named 'cards' inside each cards-card-body
        while (div.firstChild) {
          newDiv.appendChild(div.firstChild); // Moving all children of cards-card-body to the new 'cards' div
        }
        div.appendChild(newDiv); // Appending the new 'cards' div back to the cards-card-body
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  const cards = document.querySelectorAll('.flipcard-wrapper .flipcard > ul > li');

  cards.forEach(function(card, index) {
    card.children[0].classList.add('front');
    card.children[1].classList.add('back'); 

    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });

}
