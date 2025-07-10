// Select elements from the DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Event listener for the Add Chapter button
button.addEventListener('click', function () {
    // Trim whitespace and validate input
    if (input.value.trim() !== '') {
        // Create list item
        const li = document.createElement('li');
        li.textContent = input.value;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        // Add ARIA label for screen readers
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Add event listener to delete button
        deleteButton.addEventListener('click', function () {
            list.removeChild(li); // Remove the list item
            input.focus(); // Focus back on input
        });

        // Append the button to the list item and the item to the list
        li.append(deleteButton);
        list.append(li);

        // Clear the input field
        input.value = '';
    } else {
        // Optional: alert or visually indicate invalid input
        alert('Please enter a Book of Mormon chapter.');
    }

    // Always return focus to the input field
    input.focus();
});
