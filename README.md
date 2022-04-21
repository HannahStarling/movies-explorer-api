# Проект Movies explorer / бэкенд / дипломный проект Я.Практикум

- [Ссылка на домен сервера](https://api.filmski.istrazivac.nomoredomains.work)

## Getting started API

GET /api/users/me возвращает информацию о пользователе (email и имя);
PATCH /api/users/me — обновляет информацию о пользователе;
GET /api/movies все сохранённые пользователем фильмы;
POST /api/movies создаёт фильм с переданными в теле данными;
DELETE /api/movies/\_id удаляет сохранённый фильм по \_id;
POST /api/signup создаёт пользователя с переданными в теле данными;

### Endpoints

| HTTP method | route           |
| ----------- | --------------- |
| GET         | `/api/users/me` |

```javascript |
{
    "\_id": "625f318ff5a12e55bf559296",
    "email": "email@email.ru",
    "name": "Movie explorer"
}
```

| HTTP method | route           |
| ----------- | --------------- |
| PATCH       | `/api/users/me` |

```javascript
{
"\_id": "625f318ff5a12e55bf559296",
"email": "new_email@email.ru",
"name": "Dolin",
}

```

| HTTP method | route         |
| ----------- | ------------- |
| POST        | `/api/movies` |

```javascript
{
    "\_id": "456e318ff7m77e55of928384",
    "owner": "625f318ff5a12e55bf559296",
    "director": "Ромуальд Кармакар",
    "country": "Германия",
    "year": "2005",
    "duration": 89,
    "description": "Удивительная одиссея, проливающая свет на европейскую электронную сцену нулевых.\nМузыка здесь говорит сама за себя — в фильме нет ни единого интервью, только построенные на длинных планах съемки живых выступлений на самых разных площадках, от клуба Cocoon на Ибице до тесных лондонских залов. В камеру попадают как мало-мальски известные фигуры — T.Raumschmiere, Alter Ego, Captain Comatose, так и менее очевидные люди. Впрочем, главное здесь вовсе не имена, а точно переданное ощущение сопричастности всему происходящему с этой сценой. Фильм был показан на многих международных кинофестивалях, таких как фестиваль в Локарно и фестиваль Sonar, и стал лучшим немецким документальным фильмом 2005-го года по версии канала ARTE.\n",
    "image": "/uploads/thumbnail_8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg",
    "trailer": "https://youtu.be/qUmIgNwRCP4",
    "thumbnail": "/uploads/8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg"
    "movieId": 1,
    "id": 13,
    "nameRU": "Между дьяволом и глубоким синим морем",
    "nameEN": "Between the Devil and Wide Blue Sea",
}
```

| HTTP method | route         |
| ----------- | ------------- |
| GET         | `/api/movies` |

```javascript
[
{
"\_id": "456e318ff7m77e55of928384",
"owner": "625f318ff5a12e55bf559296",
"director": "Ромуальд Кармакар",
"country": "Германия",
"year": "2005",
"duration": 89,
"description": "Удивительная одиссея, проливающая свет на европейскую электронную сцену нулевых.\nМузыка здесь говорит сама за себя — в фильме нет ни единого интервью, только построенные на длинных планах съемки живых выступлений на самых разных площадках, от клуба Cocoon на Ибице до тесных лондонских залов. В камеру попадают как мало-мальски известные фигуры — T.Raumschmiere, Alter Ego, Captain Comatose, так и менее очевидные люди. Впрочем, главное здесь вовсе не имена, а точно переданное ощущение сопричастности всему происходящему с этой сценой. Фильм был показан на многих международных кинофестивалях, таких как фестиваль в Локарно и фестиваль Sonar, и стал лучшим немецким документальным фильмом 2005-го года по версии канала ARTE.\n",
"image": "/uploads/thumbnail_8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg",
"trailer": "https://youtu.be/qUmIgNwRCP4",
"thumbnail": "/uploads/8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg"
"movieId": 1,
"id": 13,
"nameRU": "Между дьяволом и глубоким синим морем",
"nameEN": "Between the Devil and Wide Blue Sea",
},
{
"\_id": "456e318ff7m77e55of928384",
"owner": "625f318ff5a12e55bf559296",
"director": "Ромуальд Кармакар",
"country": "Германия",
"year": "2005",
"duration": 89,
"description": "Удивительная одиссея, проливающая свет на европейскую электронную сцену нулевых.\nМузыка здесь говорит сама за себя — в фильме нет ни единого интервью, только построенные на длинных планах съемки живых выступлений на самых разных площадках, от клуба Cocoon на Ибице до тесных лондонских залов. В камеру попадают как мало-мальски известные фигуры — T.Raumschmiere, Alter Ego, Captain Comatose, так и менее очевидные люди. Впрочем, главное здесь вовсе не имена, а точно переданное ощущение сопричастности всему происходящему с этой сценой. Фильм был показан на многих международных кинофестивалях, таких как фестиваль в Локарно и фестиваль Sonar, и стал лучшим немецким документальным фильмом 2005-го года по версии канала ARTE.\n",
"image": "/uploads/thumbnail_8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg",
"trailer": "https://youtu.be/qUmIgNwRCP4",
"thumbnail": "/uploads/8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg"
"movieId": 1,
"id": 13,
"nameRU": "Между дьяволом и глубоким синим морем",
"nameEN": "Between the Devil and Wide Blue Sea",
},
...]
```

| HTTP method | route             |
| ----------- | ----------------- |
| DELETE      | `/api/movies/_id` |

```javascript
{
"\_id": "456e318ff7m77e55of928384",
"owner": "625f318ff5a12e55bf559296",
"director": "Ромуальд Кармакар",
"country": "Германия",
"year": "2005",
"duration": 89,
"description": "Удивительная одиссея, проливающая свет на европейскую электронную сцену нулевых.\nМузыка здесь говорит сама за себя — в фильме нет ни единого интервью, только построенные на длинных планах съемки живых выступлений на самых разных площадках, от клуба Cocoon на Ибице до тесных лондонских залов. В камеру попадают как мало-мальски известные фигуры — T.Raumschmiere, Alter Ego, Captain Comatose, так и менее очевидные люди. Впрочем, главное здесь вовсе не имена, а точно переданное ощущение сопричастности всему происходящему с этой сценой. Фильм был показан на многих международных кинофестивалях, таких как фестиваль в Локарно и фестиваль Sonar, и стал лучшим немецким документальным фильмом 2005-го года по версии канала ARTE.\n",
"image": "/uploads/thumbnail_8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg",
"trailer": "https://youtu.be/qUmIgNwRCP4",
"thumbnail": "/uploads/8647b36126befd6051c83ae66339d7f71ecbaa0d_752489df96.jpeg"
"movieId": 1,
"id": 13,
"nameRU": "Между дьяволом и глубоким синим морем",
"nameEN": "Between the Devil and Wide Blue Sea",
}
```

| HTTP method | route         |
| ----------- | ------------- |
| POST        | `/api/signup` |

```javascript
{
"\_id": "625f318ff5a12e55bf559296",
"email": "email@email.ru",
"name": "Movie explorer"
}
```

| HTTP method | route         |
| ----------- | ------------- |
| POST        | `/api/signin` |

```javascript
{
  message: 'Авторизация прошла успешно!';
}
```

| HTTP method | route          | Описание                 |
| ----------- | -------------- | ------------------------ |
| DELETE      | `/api/signout` | Для выхода из приложения |

```javascript
{
  message: 'Необходима аавторизация';
}
```

## Стек технологий

- node.js
- express.js
- MongoDB
- mongoose

- eslint
- dotenv
- express-winston
- winston
- cors
- validator
- celebrate (Joi)
- bcryptjs
- jsonwebtoken
- express-rate-limit
- helmet

## Директории

- `/routes` — папка с файлами роутера
- `/controllers` — папка с файлами контроллеров пользователя и карточки
- `/models` — папка с файлами описания схем пользователя и карточки
- `/errors` — папка с файлами описания ошибок
- `/validation` — папка с файлами описания валидации

Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

Должен быть установлен Node.js

_проверить версию Node.js в Bash_

```bash
node -v
```

- `npm run dev` — запускает сервер с hot-reload

```bash
npm i
npm run dev
```

Сервер запуститься локально:
http://localhost:3000/ или по указанному порту в консоли

- `npm run start` — запускает сервер без хот-релоуда

```bash
npm i
npm run start
```

```

```

```

```

```

```
