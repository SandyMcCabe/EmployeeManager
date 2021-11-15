INSERT INTO department
    (dept_name)
VALUES
    ('Deli'), 
    ('Bakery'),
    ('Dairy'),
    ('Meats'),
    ('Produce'),
    ('Checkout');



  INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Sandwich Maker', 30000, 1),
  ('Flag Sticker', 31000, 1),

  ('Dough Kneeder', 32000, 2),
  ('Oven Rotation', 33000, 2),

  ('Milk Stocker', 34000, 3),
  ('Cheese Specialist', 35000, 3),

  ('Butcher', 36000, 4),

  ('Melon Squeezer', 37000, 5),

  ('Cashier', 38000, 6),
  ('Bagger', 39000, 6);
 



INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 5),
  ('Jack', 'London', 2, 10),
  ('Robert', 'Bruce', 3, 15),
  ('Peter', 'Greenaway', 4, 25),
  ('Derek', 'Jarman', 5, 30),
  ('Paolo', 'Pasolini', 6, 5),
  ('Heathcote', 'Williams', 1, 10),
  ('Sandy', 'Powell', 2, 15),
  ('Emil', 'Zola', 3, 20),
  ('Sissy', 'Coalpits', 4, 25),
  ('Antoinette', 'Capet', 5, 30),
  ('Samuel', 'Delany', 6, 5),
  ('Tony', 'Duvert', 1, 10),
  ('Dennis', 'Cooper', 2, 15),
  ('Monica', 'Bellucci', 3, 20),
  ('Samuel', 'Johnson', 4, 25),
  ('John', 'Dryden', 5, 30),
  ('Alexander', 'Pope', 6, 5),
  ('Lionel', 'Johnson', 1, 10),
  ('Aubrey', 'Beardsley', 2, 15),
  ('Tulse', 'Luper', 3, 20),
  ('William', 'Morris', 4, 25),
  ('George', 'Shaw', 5, 30),
  ('Arnold', 'Bennett', 6, 5),
  ('Algernon', 'Blackwood', 1, 10),
  ('Rhoda', 'Broughton', 2, 15),
  ('Hart', 'Crane', 3, 20),
  ('Vitorio', 'DeSica', 4, 25),
  ('Wilkie', 'Collins', 5, 30),
  ('Elizabeth', 'Gaskell', 6, 5),
  ('Gerald', 'Griffin', 1, 10);
