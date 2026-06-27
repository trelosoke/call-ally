const tagMenu = document.querySelector('#tag-menu');
const newTagButton = document.querySelector('#new-tag');

function isTagMenuClosed() {
    return tagMenu.classList.contains('hidden');
}

newTagButton.addEventListener('click', (e) => {
    // Prevent button submit for JS behavior implementation
    e.preventDefault();

    // The code below can be replace with the classList 'toggle()' method
    // But for now, I'll keep that just to ensure the class exists at the
    // Page loading.
    if (isTagMenuClosed()) {
        tagMenu.classList.remove('hidden');
    } else {
        tagMenu.classList.add('hidden');
    }
});