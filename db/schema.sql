drop table if exists users;
create table users (
  id text primary key,
  password text not null
);
drop table if exists logins;
create table logins (
  id integer primary key autoincrement,
  user_id string not null,
  datetime timestamp not null default CURRENT_TIMESTAMP
);
