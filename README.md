<<<<<<< HEAD

### Обзор

Сервис Место представляет собой страницу, куда можно добавлять фотографии, удалять их и ставить лайки.
В репозитории две директории:

- frontend/ — часть приложения, написанная на React.
- backend/ — часть приложения, написанная на NodeJS (Express.js + MongoDB).

### Фронтенд

- созданы нужные роуты и описаны перенаправления: /signup — для регистрации пользователя и /signin — для авторизации пользователя;
- свёрстаны необходимые компоненты:
  - Login — компонент авторизации пользователя с необходимыми стейт-переменными.
  - Register — компонент регистрации пользователя с необходимыми стейт-переменными.
  - HOC ProtectedRoute — компонент, который защищает роут /, чтобы на него не смогли перейти неавторизованные пользователи
  - InfoTooltip — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
- подключена основная функциональность сайта к бэкенду.

### Бэкенд

- созданы схемы и модели для пользователей:
  - name — имя пользователя;
  - about — информация о пользователе;
  - avatar — ссылка на аватарку;
  - email — почта пользователя;
  - password — пароль пользователя.
- созданы схемы и модели для карточек:
  - name — имя карточки;
  - link — ссылка на картинку;
  - owner — ссылка на модель автора карточки;
  - likes — список лайкнувших пост пользователей;
  - createdAt — дата создания, тип Date.
- созданы контроллеры и роуты для пользователей;
  - GET /users — возвращает всех пользователей;
  - GET /users/:userId - возвращает пользователя по \_id;
  - GET /users/me - возвращает информацию о текущем пользователе;
  - POST /signup — создаёт пользователя;
  - POST /signin — авторизует пользователя;
  - PATCH /users/me — обновляет профиль;
  - PATCH /users/me/avatar — обновляет аватар;
  - PUT /cards/:cardId/likes — поставить лайк карточке;
  - DELETE /cards/:cardId/likes — убрать лайк с карточки;
- созданы контроллеры и роуты для карточек:
  - GET /cards — возвращает все карточки;
  - POST /cards — создаёт карточку;
  - DELETE /cards/:cardId — удаляет карточку по идентификатору;
- защищены авторизацией все маршруты, кроме регистрации и логина;
- сделано, чтобы API не возвращал хеш пароля;
- сделано так, чтобы пользователь не удалял чужие карточки;
- реализована централизованная обработка ошибок;
- валидируются приходящие на сервер запросы;
- валидируются данные на уровне схемы.
- логируются запросы к API.
