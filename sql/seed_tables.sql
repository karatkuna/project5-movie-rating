-- DROP TABLE IF EXISTS comments;
-- CREATE TABLE IF NOT EXISTS comments (
--   id SERIAL PRIMARY KEY,
--   comment TEXT NOT NULL,
--   movie_id INT NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- delete from comments where id=2;
-- select * from comments;
-- select * from tblmoviesrating;

INSERT INTO 
  users (firstname, lastname, email, password)
VALUES
  ('James', 'Bonds', 'james.bond@gmail.com', 'b6b7fb4cad4bc020f76e16889a8e9065cb708d0f8c304a8a3db609b644da9536'),
  ('Tony', 'Stark', 'starkrulz@gmail.com', 'b6b7fb4cad4bc020f76e16889a8e9065cb708d0f8c304a8a3db609b644da9536'),
  ('Harry', 'Potter', 'harry@gmail.com', 'b6b7fb4cad4bc020f76e16889a8e9065cb708d0f8c304a8a3db609b644da9536');
