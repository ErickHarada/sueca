const suits = ["paus", "copas", "espadas", "ouros"];
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let deck = [];
let index = 0;
let backupRules = [];

const count = document.getElementsByClassName("count")[0];
const card = document.getElementsByClassName("card")[0];
const nextBtn = document.getElementById("btn-next");


const createDeck = () => {
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < numbers.length; j++) {
            const card = {
                value: numbers[j],
                suit: suits[i]
            }
            deck.push(card);
        }
    }
}

const shuffle = (array) => {
    index = 0;
    for (var i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const createCard = (i) => {
    card.classList.add('animate');
    [...card.getElementsByClassName('value')].forEach(v => {
        setTimeout(() => {
            v.innerHTML = deck[i].value;
            card.getElementsByClassName('suit__img')[0].setAttribute('src', 'assets/' + deck[i].suit + '.png');
            if (deck[i].suit === 'copas' || deck[i].suit === 'ouros') {
                v.classList.add('red')
                return;
            }
            v.classList.remove('red');
        }, 200);
    })
    setTimeout(() => {
        card.classList.remove('animate');
    }, 500)
}

const createRules = () => {
    const rules = document.getElementsByClassName("board")[0]
    numbers.forEach(n => {
        var rule = document.createElement('div');
        rule.classList.add('rule');

        var index = document.createElement('div');
        index.innerHTML = n;

        var input = document.createElement('div');
        input.setAttribute('contenteditable', true)
        input.classList.add('rule__input');

        rule.appendChild(index);
        rule.appendChild(input);
        rules.appendChild(rule);
    });
}

const nextCard = () => {
    index += 1;
    if (index > 51) {
        return;
    }
    createCard(index);
    countCard();
}

const shuffleDeck = () => {
    deck = shuffle(deck);
    nextBtn.classList.remove('buttons__button--disabled')
    count.classList.remove('red');
    createCard(index);
    countCard();
}

const countCard = () => {
    if (index >= 51) {
        disableNextBtn();
    }
    count.innerHTML = (index + 1) + "/52";
}

const disableNextBtn = () => {
    nextBtn.classList.add('buttons__button--disabled')
    count.classList.add('red');
}

const resetRules = () => {
    var ruleList = [...document.getElementsByClassName('rule__input')];
    backupRules = [];
    ruleList.forEach(r => {
        backupRules.push(r.innerHTML);
        r.innerHTML = ''
    });
}

const backup = () => {
    if (!backupRules.length) {
        return;
    }
    var ruleList = document.getElementsByClassName('rule__input');
    [...ruleList].forEach((r, i) => {
        r.innerHTML = backupRules[i];
    });

}

createDeck();
shuffleDeck();
createCard(index);
createRules();
