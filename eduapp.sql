-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 21 2023 г., 13:37
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `eduapp`
--

-- --------------------------------------------------------

--
-- Структура таблицы `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `classes`
--

INSERT INTO `classes` (`id`, `name`, `teacher`) VALUES
(1, 'Тестовый класс', 1),
(2, 'Деятели искусства', 2),
(3, 'Some class', 2),
(4, 'Ещё класс', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `jointasks`
--

CREATE TABLE `jointasks` (
  `id` int NOT NULL,
  `task` int NOT NULL,
  `lesson` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `jointasks`
--

INSERT INTO `jointasks` (`id`, `task`, `lesson`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 2, 2),
(5, 3, 3),
(6, 4, 4),
(7, 2, 4),
(8, 1, 5),
(9, 5, 6),
(10, 6, 3),
(11, 4, 3),
(12, 5, 3),
(13, 8, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int NOT NULL,
  `class` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `class`, `name`) VALUES
(1, 1, 'First lesson'),
(2, 1, 'Урок номер 2'),
(3, 2, 'first'),
(4, 2, 'second'),
(5, 2, 'third'),
(6, 3, 'Я не знаю что ещё придумать'),
(7, 4, 'Ещё урок'),
(8, 4, 'Здесь кто-то есть?'),
(9, 4, 'qwerty');

-- --------------------------------------------------------

--
-- Структура таблицы `marks`
--

CREATE TABLE `marks` (
  `id` int NOT NULL,
  `mark` int NOT NULL,
  `student` int NOT NULL,
  `lesson` int NOT NULL,
  `task` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `marks`
--

INSERT INTO `marks` (`id`, `mark`, `student`, `lesson`, `task`) VALUES
(1, 5, 1, 1, 1),
(2, 5, 2, 1, 1),
(3, 5, 1, 1, 2),
(4, 5, 1, 2, 1),
(5, 3, 1, 2, 2),
(6, 5, 3, 3, 3),
(7, 5, 3, 4, 4),
(8, 5, 4, 6, 5),
(9, 5, 3, 4, 2),
(10, 5, 6, 4, 2),
(11, 5, 3, 3, 4),
(12, 5, 3, 5, 1),
(13, 5, 8, 3, 3),
(14, 5, 8, 3, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class` int NOT NULL,
  `avatar` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id`, `name`, `lastname`, `nickname`, `pass`, `class`, `avatar`) VALUES
(1, 'Человек', 'Тест', 'check', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 1, '0'),
(2, 'Имя', 'Фамилия', 'i_am_user', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 1, '1'),
(3, 'Александр', 'Пушкин', 'poet', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 2, '1'),
(4, 'Я', 'Ученик', 'user', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 3, '1'),
(5, 'Невидимка', 'Наверное', 'qwe', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 4, '1');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `img` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `img`, `text`, `name`, `answer`) VALUES
(1, 'D:\\myProject\\data\\tasks\\task_1.jpg', '123', '123', '123'),
(2, 'D:\\myProject\\data\\tasks\\task_2.jpg', 'Найдет местоположение дома', 'OSINT', '1'),
(3, 'D:\\myProject\\data\\tasks\\task_2.jpg', '=)', '=)=)=)', '=)'),
(4, 'D:\\myProject\\data\\tasks\\task_4.jpg', 'ответ: qwe', 'Задача', 'qwe'),
(5, 'D:\\myProject\\data\\tasks\\task_5.jpg', 'что-то', 'что-то', 'что-то'),
(6, 'D:\\myProject\\data\\tasks\\task_6.jpg', 'Описание', 'Задача N', 'qwe'),
(7, 'D:\\myProject\\data\\tasks\\task_7.jpg', 'dgd', 'fgffd', '1'),
(8, 'D:\\myProject\\data\\tasks\\task_8.jpg', 'ответ:123', 'Задача', '123');

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `lastname`, `nickname`, `pass`, `avatar`) VALUES
(1, 'Учитель', 'Года', 'admin', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', '1'),
(2, 'Професор ', 'Фамилия', 'science', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', '1');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `jointasks`
--
ALTER TABLE `jointasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `jointasks`
--
ALTER TABLE `jointasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
