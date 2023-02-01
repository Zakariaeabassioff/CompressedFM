/* Pouvoir check plusieurs checkboxs en appuyant sur shift */


const body = document.querySelector('body');
//Générer la liste des épisodes automatiquement
const episodesUL = document.querySelector('.episodes');

const episodes = [
    {
        'id': 1,
        'name': "1  ||  Trailer"
    },
    {
        'id': 2,
        'name': "2  ||  James Q Quick Origin Story"
    },
    {
        'id': 3,
        'name': "3  ||  Amy Dutton's Origin Story"
    },
    {
        'id': 4,
        'name': "4  ||  Tech Behind the Podcast"
    },
    {
        'id': 5,
        'name': "5 || Tech Behind SelfTeach.me"
    },
    {
        'id': 6,
        'name': "6 || Freelancing (Part 1)"
    }
];

//Tableau associatif Liant l'id de l'episode à son état (checked or not)
const checkedBoxesMap = {};

let first = null;
let shiftOn = false;

body.addEventListener('keydown', (e) => {
    if (e.key == 'Shift') {
        shiftOn = true;
    }
});

body.addEventListener('keyup', (e) => {
    if (e.key == 'Shift') {
        shiftOn = false;
    }
});

const renderEps = () => {
    const episodesHTMLString = episodes.map( ep => {
        const isChecked = checkedBoxesMap[ep.id];
        const checkedStr = isChecked ? 'checked' : '';
        return `
            <li>
                <label for="episode-${ep.id}">
                    <input type="checkbox" name="episode-${ep.id}" id="episode-${ep.id}" 
                    onClick="handleCheckboxClick(event, ${ep.id})" ${checkedStr}>
                    <span>${ep.name}</span>
                </label>
            </li>
        `
    }).join('');
    episodesUL.innerHTML = episodesHTMLString;
};

const handleCheckboxClick = (e, index) => {
    if (first && shiftOn) {
        for(let i = first; i <= index ; i++) {
            checkedBoxesMap[i] = true;
        }
    } else {
        checkedBoxesMap[index] = !checkedBoxesMap[index];
    }

    first = index;
    renderEps();
};


renderEps();