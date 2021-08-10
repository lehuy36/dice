'use strict';

let score01 = document.getElementById('score--0');
let score02 = document.getElementById('score--1');
let current01 = document.getElementById('current--0');
let current02 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player01 = document.querySelector('.player--0');
const player02 = document.querySelector('.player--1');

let currentScore, activePlayer, score, playing;

const init = function(){
    currentScore = 0;
    activePlayer = 0;
    score = [0,0];
    playing = true;
    score01.textContent = 0;
    score02.textContent = 0;
    current01.textContent = 0;
    current02.textContent = 0;
    
    diceEl.classList.add('hidden');
    player01.classList.add('player--active');
    player02.classList.remove('player--active');
    player01.classList.remove('player--winner');
    player02.classList.remove('player--winner');
}

init();

const switchPlayer = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1:0;
    player01.classList.toggle('player--active');
    player02.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
    if(playing){
        let randomDice = Math.trunc(Math.random()*6)+1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${randomDice}.png`;

        if(randomDice !== 1){
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        if(score[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.add('hidden');
        }else{
            switchPlayer();
        }
    }
})


btnNew.addEventListener('click', init);