## Тестовое заданин

Для запуска нужно скачать, установить зависимости через npm i, запустить сервер через npm run start:dev

Клиент запустить через npm run dev


![icon](https://i.imgur.com/2KzHuUZ.png)

![icon](https://i.imgur.com/XXj4VA9.png)

Нужно через админку добавить сначала группы ученико, аудитории и предметы, после этого добавить шаблон расписания.


Чтобы создать шаблон нужно вбить время в формате 08:00:09:00
выбрать предметы и аудитории, важно чтобы аудиторий было не меньше чем групп учащихся.

![icon](https://i.imgur.com/enFRss0.png)

После того как шаблон задан, нужно пеерейти в Расписание и выбрать шаблон по названию 


![icon](https://i.imgur.com/9Y42UL9.png)
![icon](https://i.imgur.com/6Jl11k1.png)

После этого нужно вбить количество посещений и нажать кнопку
![icon](https://i.imgur.com/gobT4ut.png)

После генерации можно попробовать получить другое расписание пересобрав его кнопкой вверху

![icon](https://i.imgur.com/5FbPFul.png)

Под группой есть зеленая галочка, на нее можно нажать чтобы зафиксировать группу от пересборки.

Группы можно перетаскивать чтобы менять им порядок, можно также изменить аудиторию и предмет у конкретной группы в конкретное время 
![icon](https://i.imgur.com/WUHaDzn.png)


Данные от моей тестовой базы данных хранятся в env, а подключается в app.module, ее можно заменить на свою если нужно 