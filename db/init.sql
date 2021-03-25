-- create schema
CREATE SCHEMA sample;

-- create table
CREATE TABLE sample.user (
  id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- insert sample data
INSERT INTO sample.user ("id", "first_name", "last_name", "is_active") VALUES
('1', 'Steve', 'Jobs', false),
('2', 'Bill', 'Gates', false),
('3', 'Larry', 'Page', true),
('4', 'Mark', 'Zuckerberg', true),
('5', 'Jeff', 'Bezos', true),
('6', 'Satya', 'Nadella', true),
('7', 'Tim', 'Cook', true),
('8', 'Elon', 'Musk', true),
('9', 'Sundar', 'Pichai', true),
('10', 'Jack', 'Dorsey', true);