# Fancy-to-do

### Fancy to-do lets your work more collaboratively and get more done.

Fancy to-do, enable you to organize nd prioritize your projects in a fun and flexible.

## Work with any team
Whether it's for work a side-project or even the next family vacation, Fancy to-do helps your team stay organized.


## Docs 

- ____POST/todos_:

- Request header:

```javascript
{
  "Content-Type": "application/json"
}
```
-Request body:

```javascript
{
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```
-Response:

```javascript
{
  "id": 1,
  "title":"Learn restAPI",
  "descriptions": "Learn how to create RESTful API with Express and Sequelize",
  "due_date":"2020-03-01"
}
```


- _GET/todos_:

-Response:

**Success**
```javascript
{
  "data": [{data as requested from database}]
}
```

**Error**
```javascript
{
  "error": "Error message"
}
```


- _GET/todos/:id_:

-Response:

**Success**
```javascript
{
  "data": [{ Specified data as requested from database}]
}
```

**Error**
```javascript
{
  "error": "Error message"
}
```


- _PUT/todos/:id_:

-Response:

**Success**
```javascript
{
  "message": "Berhasil mengupdate data"
}
```

**Error**
```javascript
{
  "error": "Error message"
}
```


- DELETE/todos/:id_:

-Response:

**Success**
```javascript
{
  "message": "Berhasil menghapus data"
}
```

**Error**
```javascript
{
  "error": "Error message"
}
```
