$(document).ready(function () {
  // let check = false;
  // if (check) {
  //   login();
  // } else {
  //   getStarted();
  // }
  //

  $('#toogle-get-started').click(function () {
    check = true;
  });

  $('#toogle-register').click(() => {
    register();
  });

  function getStarted() {
    $('#login').hide();
    $('#get-todo').hide();
    $('#register').hide();
  }

  function login() {
    $('#login').show();
    $('#get-todo').hide();
    $('#register').hide();
  }

  function register() {
    $('#login').hide();
    $('#get-todo').hide();
    $('#register').show();
  }

  // showing data
  function todo() {
    $('#login').hide();
    $('#register').hide();
    $.ajax({
      url: 'http://localhost:3000/todos',
      type: 'GET',
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .done(function (result) {
        console.log(result.data);
        let counter = 1;
        for (let i = 0; i < result.data.length; i++) {
          data = result.data[i];
          $('#list-table').append(`
          <tr>
                <td>${counter}</td>
                <td>${data.title}</td>
                <td>${data.descriptions}</td>
                <td>${data.status}</td>
                <td>${data.due_date}</td>
                <td>${data.due_date}</td>
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
    const descriptions = $('#descriptions-add').val();
    const status = $('#status-add').val();
    const due_date = $('#due_date-add').val();

    let data = {
      title,
      descriptions,
      status,
      due_date,
    };
    $.ajax({
      url: 'http://localhost:3000/todos/',
      type: 'POST',
      data,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .done((output) => {
        $('#add-todo')[0].reset();
        todo();
      })
      .fail((err) => {});
  });

  //edit data

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
});
