const form = document.querySelector('.registration');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  register();
});

const register = () => {

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newUser = {
        "first_name": data.firstname,
        "last_name": data.lastname,
        "birthday": data.birthday,
        "email": data.email,
        "username": data.username,
        "passwd": data.password,
    }

    fetch('http://127.0.0.1:5000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
    credentials: 'include'
    })
}