document.addEventListener('DOMContentLoaded', (event) => {
    const password = 'M.123.Mandarynka.48_3'; // Ustaw swoje hasło tutaj
    const authSection = document.getElementById('authSection');
    const mainSection = document.getElementById('mainSection');
    const authButton = document.getElementById('authButton');
    const passwordInput = document.getElementById('password');
    const displayArea = document.getElementById('displayArea');

    // Sprawdź, czy użytkownik jest zalogowany
    if (localStorage.getItem('loggedIn') === 'true') {
        showAdminFeatures();
    } else {
        authSection.style.display = 'block';
    }

    authButton.addEventListener('click', () => {
        if (passwordInput.value === password) {
            localStorage.setItem('loggedIn', 'true');
            showAdminFeatures();
        } else {
            alert('Nieprawidłowe hasło');
        }
    });

    document.getElementById('addTextButton').addEventListener('click', function() {
        const userText = document.getElementById('userText').value;

        if (userText.trim() !== "") {
            const newText = document.createElement('p');
            newText.textContent = userText;

            // Dodaj przycisk usuwania tylko dla zalogowanego użytkownika
            if (localStorage.getItem('loggedIn') === 'true') {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'delete';
                deleteButton.classList.add('deleteButton');
                deleteButton.addEventListener('click', () => {
                    displayArea.removeChild(newText);
                    removeText(userText);
                });
                newText.appendChild(deleteButton);
            }

            displayArea.appendChild(newText);
            saveText(userText);

            // Clear the textarea after adding text
            document.getElementById('userText').value = '';
        } else {
            alert("Please enter the text before adding.");
        }
    });

    function saveText(text) {
        let texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts.push(text);
        localStorage.setItem('texts', JSON.stringify(texts));
    }

    function removeText(text) {
        let texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts = texts.filter(t => t !== text);
        localStorage.setItem('texts', JSON.stringify(texts));
    }

    function loadTexts() {
        const texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts.forEach(text => {
            const newText = document.createElement('p');
            newText.textContent = text;

            // Dodaj przycisk usuwania tylko dla zalogowanego użytkownika
            if (localStorage.getItem('loggedIn') === 'true') {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'delete';
                deleteButton.classList.add('deleteButton');
                deleteButton.addEventListener('click', () => {
                    displayArea.removeChild(newText);
                    removeText(text);
                });
                newText.appendChild(deleteButton);
            }

            displayArea.appendChild(newText);
        });
    }

    function showAdminFeatures() {
        authSection.style.display = 'none';
        mainSection.style.display = 'block';
        loadTexts();
    }

    // Load texts when the page loads
    loadTexts();
});
