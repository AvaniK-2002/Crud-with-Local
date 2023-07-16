document.addEventListener('DOMContentLoaded', function() {
  const userList = document.getElementById('users');
  const addForm = document.getElementById('add-product-form');

  let users = [];

  if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
    renderUsers();
  }

  addForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const newUser = {
      name: nameInput.value,
      email: emailInput.value
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();

    nameInput.value = '';
    emailInput.value = '';
  });

  function renderUsers() {
    userList.innerHTML = '';

    users.forEach(function(user) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const emailCell = document.createElement('td');
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');

      nameCell.textContent = user.name;
      emailCell.textContent = user.email;
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', function() {
        users = users.filter(function(u) {
          return u.email !== user.email;
        });
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
      });

      deleteCell.appendChild(deleteButton);

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(deleteCell);

      userList.appendChild(row);
    });
  }
});
