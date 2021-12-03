let fruitArray = [{
    'name': 'banana',
    'img': 'banana.jpg',
  },
  {
    'name': 'strawberry',
    'img': 'strawberry.jpg',
  },
  {
    'name': 'apple',
    'img': 'apple.jpg',
  },
  {
    'name': 'cherries',
    'img': 'cherries.jpg',
  },
  {
    'name': 'orange',
    'img': 'orange.jpg',
  },
  {
    'name': 'peach',
    'img': 'peach.jpg',
  },
  {
    'name': 'pear',
    'img': 'pear.jpg',
  },
  {
    'name': 'watermelon',
    'img': 'watermelon.png',
  },
  {
    'name': 'grape',
    'img': 'grape.jpeg',
  },
  {
    'name': 'mango',
    'img': 'mango.jpg',
  },
  {
    'name': 'blueberry',
    'img': 'blueberry.jpg',
  },
  {
    'name': 'pineapple',
    'img': 'pineapple.jpg',
  },
];

let delay = 18000;


document.getElementById('easy').addEventListener('click', difficulty);

function difficulty (diff) {

  if (diff === 'easy') {
    fruitArray = fruitArray.slice(7);
    delay = 1200;
  } else if (diff === 'norm') {
    fruitArray = fruitArray.slice(9);
    delay = 1500;
  } else {
    fruitArray = fruitArray.slice(11);
    delay = 1800;
  }

  start();

}


const gameGrid = fruitArray
  .concat(fruitArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const tile = document.createElement('div');
  tile.classList.add('tile');
  tile.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(tile);
  tile.appendChild(front);
  tile.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(tile => {
    tile.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(tile => {
    tile.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
