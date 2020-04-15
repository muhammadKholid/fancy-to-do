$(document).ready(function () {
  if (localStorage.getItem('token')) {
    todo();
  } else {
    login();
  }
});
//logout button
$('#logout-btn').click(() => {
  logout();
});
//show calendar
$('#Holidays-btn').click(() => {
  holidays();
});

//register button
$('#button-register').click(() => {
  register();
});
//add-todo button
$('#toogle-add-todo').click(() => {
  addData();
});
//back button
$('#back-btn').click(() => {
  todo();
});
//back to login in register
$('#login-btn').click(() => {
  login();
  $('#button-register').show();
});

//see Holdays Calendar
function holidays() {
  $('#login').hide();
  $('#register').hide();
  $('#button-register').hide();
  $('#logout-btn').hide();
  $('#section-1').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').hide();
  $('#section-5').show();
  $('#login-btn').hide();
}
//logout
function logout() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
  }).then((result) => {
    localStorage.clear('token');
    $('#back-btn').hide();
    $('#register').hide();
    $('#button-register').show();
    $('#Holidays-btn').hide();
    $('#login').show();
    $('#login-btn').hide();
    $('#logout-btn').hide();
    $('#section-1').show();
    $('#section-2').hide();
    $('#section-3').hide();
    $('#section-4').hide();
    $('#section-5').hide();
    if (result.value) {
      Swal.fire('Logout!', 'success');
    }
  });
}

function login() {
  $('#back-btn').hide();
  $('#login').show();
  $('#login-btn').hide();
  $('#register').hide();
  $('#logout-btn').show();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').hide();
  $('#section-5').hide();
  $('#Holidays-btn').hide();
  $('#logout-btn').hide();
}

function register() {
  $('#register').show();
  $('#login').hide();
  $('#login-btn').show();
  $('#button-register').hide();
  $('#logout-btn').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').hide();
  $('#section-5').hide();
  $('#Holidays-btn').hide();
}

function editData() {
  $('#register').hide();
  $('#login').hide();
  $('#login-btn').hide();
  $('#button-register').hide();
  $('#logout-btn').hide();
  $('#section-1').hide();
  $('#section-2').hide();
  $('#section-3').hide();
  $('#section-4').show();
  $('#section-5').hide();
}

function addData() {
  $('#register').hide();
  $('#login').hide();
  $('#login-btn').hide();
  $('#button-register').hide();
  $('#logout-btn').hide();
  $('#section-1').hide();
  $('#section-2').hide();
  $('#section-3').show();
  $('#section-4').hide();
  $('#section-5').hide();
}
// showing data
function todo(text) {
  $('#login').hide();
  $('#login-btn').hide();
  $('#register').hide();
  $('#button-register').hide();
  $('#logout-btn').show();
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
  
                <button onclick="todoEditStatus(${data.id})" id="toogle-edit-status" class="button is-warning">Edit Status</button>
                </td>
          </tr>
          `);
        counter++;
      }
    })
    .fail(function (err) {
      console.log(err);
    });
}

//show-holidays
function getHolidays() {
  console.log('masuk');
  $.ajax({
    url: 'http://localhost:3000/todos/holidays',
    type: 'GET',
    headers: {
      token: localStorage.getItem('token'),
    },
  }).done((data) => {
    for (let i = 0; i < data.length; i++) {
      let libur = data[i];
      $('#list-holidays').append(`
          <tr>
            <td>${libur.date.iso}</td>
            <td>${libur.name}</td>
            <td>${libur.description}</td>
          </tr>
        `);
    }
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
    .fail((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
      });
    });
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
      if (result) {
        Swal.fire('Login!', 'success');
      }
      localStorage.setItem('token', result.token);
      todo();
    })
    .fail((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
      });
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

  $.ajax({
    url: 'http://localhost:3000/todos/register',
    type: 'POST',
    data,
    dataType: 'json',
  })
    .done((result) => {
      login();
    })
    .fail((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.message,
      });
    });
});

// DELETE
function delList(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    conole.log(result);
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/todos/' + id,
      headers: {
        token: localStorage.getItem('token'),
      },
    }).done((response) => {
      todo(response.message);
      if (response.message) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  });
}

//fitur edit Status
function todoEditStatus(id) {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      token: localStorage.getItem('token'),
    },
  }).done((response) => {
    let id = response.data.id;
    let title = response.data.title;
    let descriptions = response.data.descriptions;
    let status = true;
    let due_date = response.data.due_date;
    console.log(status);
    $.ajax({
      type: 'PUT',
      url: `http://localhost:3000/todos/${id}`,
      data: { title, descriptions, status, due_date },
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .done((response) => {
        if (response) {
          Swal.fire('Data edited!', 'success');
        }
        todo();
      })
      .fail((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.responseJSON.message,
        });
      });
  });
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
    $('#due_date-edit').val(response.data.due_date.slice(0, 10));

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
      }).done((result) => {
        $('#edit-todo')[0].reset();
        todo(result.message);
      });
    });
  });
}

//google sign in
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/todos/google-sign-in',
    data: {
      token: id_token,
    },
    statusCode: {
      200: function (response) {
        localStorage.setItem('token', response.token);
      },
    },
  }).done((response) => {
    if (response) {
      Swal.fire('Login!', 'success');
    }
    todo();
  });
}

//google log out
function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    logout();
  });
}
