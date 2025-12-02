addEventListener('DOMContentLoaded', () => {
    fetch('/users')
    .then(response => response.json())
    .then(users => {
        const userList = document.querySelector('#users-list');
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (${user.email})`;
            listItem.classList.add('user');
            userList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });


    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const inputEmail = form.querySelector('#email');
        const inputName = form.querySelector('#name');

        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputEmail.value,
                name: inputName.value
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });

    });
})