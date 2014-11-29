drop table if exists users;
create table users (
  id text primary key,
  password text not null
);
