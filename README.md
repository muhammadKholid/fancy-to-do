# Fancy-to-do

### Fancy to-do lets your work more collaboratively and get more done.

Fancy to-do, enable you to organize nd prioritize your projects in a fun and flexible.

## Work with any team
Whether it's for work a side-project or even the next family vacation, Fancy to-do helps your team stay organized.


## Docs 
# CRUD Database

1. ____POST/todos_:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```
- Response:

```javascript
{
  "id": 1,
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```

**Success**
```javascript
{
  "status": 201
  "message": "Berhasil menambah data"
}
```

**Error**
```javascript
{
  status: 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


2. _GET/todos_:

- Request body:

```javascript
{
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```

- Response:

**Success**
```javascript
{
  "status": 200
  "data": [{data as requested from database}]
}
```

**Error**
```javascript
{
  "status": 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


3. _GET/todos/:id_:

- Response:

**Success**
```javascript
{
  "status": 200
  "data": [{ Specified data as requested from database}]
}
```

**Error**
```javascript
{
  "status": 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


4. _PUT/todos/:id_:

- Response:

- Request body:

```javascript
{
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```

**Success**
```javascript
{
  "status": 201
  "message": "Berhasil mengupdate data"
}
```

**Error**
```javascript
{
  status: 404
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


5. DELETE/todos/:id_:

- Response:

**Success**
```javascript
{
  "status": 200
  "message": "Berhasil menghapus data"
}
```

**Error**
```javascript
{
  "error": "Error message"
}
{
  "status": 500
  "error": "Internal server error"
}
```


# CRUD Database

1. ____POST/todos/register_:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "username":"Jhon Doe",
  "email": "jhondoe@google.com",
  "password":"*******"
}
```
- Response:

```javascript
{
  "id": 1
  "username":"Jhon Doe",
  "email": "jhondoe@google.com",
  "password":"*******"
}
```

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
}
```

**Error**
```javascript
{
  status: 400
  "error": "validation error"
}
{
  "status": 500
  "error": "Internal server error"
}
```


1. ____POST/todos/login_:

- Request header:

```javascript
{
  "token": "kjashsncfhvoyi38572375nicuelircw"
  "Content-Type": "application/json"
}
```
- Request body:

```javascript
{
  "username":"Jhon Doe",
  "password":"*******"
}
```
- Response:

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
}
```

**Error**
```javascript
{
  status: 400
  "error": "Bad request"
}
{
  "status": 500
  "error": "Internal server error"
}
```



1. ____POST/todos/google-sign-in__:

- Request body:

```javascript
{
  "token": "hancyb8a7aw83n4nx"
}
```
- Response:

**Success**
```javascript
{
  "status": 200
  "message": "succesfuly signed in"
}
```

**Success**
```javascript
{
  "status": 201
  "message": "succesfuly created new user"
}
```

**Error**
```javascript
{
  status: 400
  "error": "Bad request"
}
{
  "status": 500
  "error": "Internal server error"
}
```
