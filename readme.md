# Превью

Приложении постороено при помощи фреймворка `express`, в качестве базы даныых используется `postgres`. Для работы с БД использовалась ORM `Sequelize`. Парсинг файлов осуществляется при помощи популярных npm-пакетов `fast-xml-parser` и `node-html-parser`. Проект написан на typescript.

При посроении приложения я попытался реализовать гексагональную архитектуру, таким образом, отвязав бизнес логику от используемого стека технологий.

# Настройка

Используется postgres. Сконфигурировать ее можно при помощи `.env` файла в корне проекта.

Для старта нужно исполнить в терминале следующие команды

```npm i```

```npm run start```

# Об архитектуре

Гексагональная архитектура или архитектура портов и адаптеров предполагает, что существует такая сущность (класс или набор функций), где описывается бизнес-логика, ее называют доменной областью. Вокруг этого места приложения строится облать приложения, application layer, которая знает только об интерфейсах объектов инфраструктуры, которые используются в приложении и управляет потоком данных.

Объекты инфраструктуры - это такие части приложения, которые не определяют работу бизнес-логики. Например база данных является объектом инфраструктуры, ибо бизнес-логике не важно, в каком виде и где хранятся данные. То же касается HTTP-сервера, парсеров, и т.д..

В данном конкретном случае был описан только слой приложения, потому что бизнес-логики как таковой нет, есть только поток данных.

В данном приложении я могу выделить два момента, которые меня лично смущают в плане архитектуры. Во-первых, мне не нравится использование колбеков, но я не уверен, что как-то по другому можно было реализовать завязку на интерфейс веб-сервера, который реагирует на запрос. Как вариант, можно было добавить систему обработки событий, чтобы сервер диспатчил события при получении запросы, но такая система плохо типизируется, и по своей сути все также выполняет колбеки. Во-вторых, мне не очень нравится, что application layer знает о существовании XML и HTML в приложении, но как реализовать это по-другому тоже вопрос.

Еще мне не очень нравится, что класс HTTP сервера пришлось сделать статичным, но это был самый быстрый и простой способ реализовать роутинг (по крайней мере это первое, что пришло мне в голову).

# Что не сделано
Тесты. никогда в своей жизни не писал тесты. В целом с теорией знаком, но практики не было и было желание уложиться в дедлайн. В ТЗ было написано, что тесты приветствуются, но это не было четким требованием.

Обработка ошибок. Вообще отсутсвует, основной задачей было написать простое приложение и уложиться в срок, обработка ошибок заняла бы дополнительное количество времени. Как раз из ограничений целостности на доменной модели и получилась бы биснес логика (только очень плоская, по сути просто верификация данных)

Пагинация. Отдавать сразу все записи из таблицы плохая идея, но база маленькая, поэтому не особо критично.