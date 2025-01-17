const API_URL = 'http://localhost:5000/mews';
const form = document.querySelector('form');
const loadingElemnet = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
loadingElemnet.style.display = '';
listAllMews();
form.addEventListener('submit', (event) => {
    event.preventDefault(); // cancels the default event if possible
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const mew = {
        name,
        content
    };
    form.style.display = 'none';
    loadingElemnet.style.display = '';
    console.log(mew);
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(createdMew => {
        console.log(createdMew);
        form.reset();
        form.style.display = '';
        listAllMews();
    });
});

function listAllMews() {

    fetch(API_URL).then(response => response.json()).then(mews => {
        mewsElement.innerHTML = '';
        console.log(mews);
        mews.reverse();
        mews.forEach(mew => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = mew.name;
            const contents = document.createElement('p');
            contents.textContent = mew.content;
            const date = document.createElement('small');
            date.textContent = new Date(mew.created);
            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);
            mewsElement.appendChild(div);
        });
        loadingElemnet.style.display = 'none';
    });
}