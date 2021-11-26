-- DROP TABLE IF EXISTS comments;
-- CREATE TABLE IF NOT EXISTS comments (
--   id SERIAL PRIMARY KEY,
--   comment TEXT NOT NULL,
--   movie_id INT NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- delete from comments where id=2;
select * from comments;
select * from tblmoviesrating;