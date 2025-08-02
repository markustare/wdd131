// DOM references
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Step 1: Initialize chaptersArray
let chaptersArray = getChapterList() || []; // get stored list or empty array

// Step 2: Display any stored chapters on page load
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Step 3: Event listener for Add Chapter button
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {  // Make sure input is not empty
        displayList(input.value);     // Add to DOM
        chaptersArray.push(input.value); // Add to array
        setChapterList();             // Save to localStorage
        input.value = '';             // Clear input
        input.focus();                // Focus input
    } else {
        alert('Please enter a Book of Mormon chapter.');
        input.focus();
    }
});

// Step 4: Display list item function
function displayList(item) {
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');
    deleteButton.setAttribute('aria-label', `Remove ${item}`);

    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Step 5: Set chapter list to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Step 6: Get chapter list from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Step 7: Delete a chapter from array and localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // remove ❌
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList(); // Update localStorage
}
