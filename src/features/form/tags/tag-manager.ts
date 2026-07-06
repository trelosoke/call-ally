function isTagMenuClosed(): boolean {
    return tagMenu.classList.contains('hidden');
}

export class TagData {
    constructor(
        public name: string,
        public color: string 
    ){}
}

const tagMenu = document.querySelector('#tag-menu') as HTMLDivElement;
const newTagButton = document.querySelector('#new-tag') as HTMLButtonElement;

newTagButton.addEventListener('click', (e): void => {
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

const tagName = document.querySelector('#tag-name') as HTMLInputElement;
const tagColor = document.querySelector('#tag-color') as HTMLInputElement;
const tagSubmit = document.querySelector('#tag-submit')as HTMLButtonElement;

export let tags: TagData[] = [];

tagSubmit.addEventListener('click', (e): void => {
    e.preventDefault();
    const name = tagName.value.trim();
    const color = tagColor.value;

    if (name) {
        const tagInfo = new TagData(name, color);
        tags.push(tagInfo);
    }
});