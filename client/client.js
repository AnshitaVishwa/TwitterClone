const form = document.querySelector('form');
const loadingElemnet = document.querySelector('.loading');
loadingElemnet.style.display = 'none';
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
});