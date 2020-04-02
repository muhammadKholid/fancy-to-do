$(document).ready(function () {
  if (localStorage.getItem('token')) {
    todo();
  } else {
    login();
  }
});

$('#logout-btn').click(() => {
  logout();
});

$('#button-register').click(() => {
  register();
});

$('#toogle-add-todo').click(() => {
  addData();
});

function login() {
  $('#login').show();
  $('#register').hide();
  $('#get-todo').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').hide();
}

function register() {
  $('#register').show();
  $('#login').hide();
  $('#get-todo').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').hide();
}

function editData() {
  $('#register').hide();
  $('#login').hide();
  $('#get-todo').hide();
  $('#section-1').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').show();
}

function addData() {
  $('#register').hide();
  $('#login').hide();
  $('#get-todo').hide();
  $('#section-1').hide();
  $('#section-2').hide();
  $('#section-3').show();
  $('#section-4').hide();
}
// showing data
function todo(text) {
  $('#login').hide();
  $('#register').hide();
  $('#section-1').hide();
  $('#section-2').show();
  $('#section-3').hide();
  $('#section-4').hide();
  $.ajax({
    url: 'http://localhost:3000/todos',
    type: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  })
    .done(function (result) {
      $('#list-table').empty();
      $('#message').text(text);
      let counter = 1;
      for (let i = 0; i < result.data.length; i++) {
        data = result.data[i];
        if (data.status == true || data.status == 'true') {
          data.status = 'Selesai';
        } else {
          data.status = 'Belum selesai';
        }
        $('#list-table').append(`
          <tr>
                <td class="todo">${counter}</td>
                <td class="todo">${data.title}</td>
                <td class="todo">${data.descriptions}</td>
                <td class="todo">${data.status}</td>
                <td class="todo">${data.due_date}</td>
                <td><button onclick="delList(${data.id})" id="delete" class="button is-danger"> Delete </button>

                <button onclick="todoEdit(${data.id})" id="toogle-edit" class="button is-danger">Edit </button>
  
                </td>
          </tr>
          `);
        counter++;
      }
    })
    .fail(function (err) {
      // $('#message').text('Error to get data');
    });
}

//add data
$('#add-todo').submit((e) => {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  const title = $('#title-add').val();
  let descriptions = $('#descriptions-add').val();
  const status = $('#status-add').val();
  const due_date = $('#due_date-add').val();
  let data = {
    title,
    descriptions,
    status,
    due_date,
  };
  $.ajax({
    url: 'http://localhost:3000/todos',
    type: 'POST',
    data,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
    .done((output) => {
      console.log(output.message);
      $('#add-todo')[0].reset();
      todo(output.message);
    })
    .fail((err) => {});
});

//login
$('#login').submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  const username = $('#user-login').val();
  const password = $('#pass-login').val();

  let data = {
    username: username,
    password: password,
  };
  $.ajax({
    url: 'http://localhost:3000/todos/login',
    type: 'POST',
    data,
    dataType: 'json',
  })
    .done((result) => {
      localStorage.setItem('token', result.token);
      todo();
    })
    .fail((err) => {
      console.log(err);
    });
});

//Register
$('#register').submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  const username = $('#username').val();
  const email = $('#email').val();
  const password = $('#password').val();

  let data = {
    username: username,
    password: password,
    email: email,
  };
  console.log(data);
  $.ajax({
    url: 'http://localhost:3000/todos/register',
    type: 'POST',
    data,
    dataType: 'json',
  })
    .done((result) => {
      console.log(result);
    })
    .fail((err) => {
      console.log(err);
    });
});

// DELETE
function delList(id) {
  console.log(id);
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.getItem('token'),
    },
  }).done(() => {
    todo();
  });
}

//logout
function logout() {
  localStorage.removeItem('token');
  login();
}

// FITUR EDIT TODO
function todoEdit(id) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.getItem('token'),
    },
  }).done((response) => {
    editData();
    $('#title-edit').val(response.data.title);
    $('#descriptions-edit').val(response.data.descriptions);
    $('#due_date-edit').val(response.data.due_date);

    $('#edit-todo').submit(function (e) {
      e.preventDefault();

      let id = response.data.id;
      let title = $('#title-edit').val();
      let descriptions = $('#descriptions-edit').val();
      let due_date = $('#due_date-edit').val();
      let inputData = { title, descriptions, due_date };
      $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/todos/' + id,
        data: inputData,
        headers: {
          token: localStorage.getItem('token'),
        },
      }).done(() => {
        $('#edit-todo')[0].reset();
        todo();
      });
    });
  });
}
