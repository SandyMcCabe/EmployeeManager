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
  ('Jack', 'London', 1, 5),
  ('Robert', 'Bruce', 2, 10),
  ('Peter', 'Greenaway', 2, 10),
  ('Derek', 'Jarman', 1, 10),
  ('Paolo', 'Pasolini', 1, 5),
  ('Heathcote', 'Williams', 1, 5),
  ('Sandy', 'Powell', 1, 5),
  ('Emil', 'Zola', 1, 5),
  ('Sissy', 'Coalpits', 1, 5),
  ('Antoinette', 'Capet', 1, 5),
  ('Samuel', 'Delany', 1, 5),
  ('Tony', 'Duvert', 1, 5),
  ('Dennis', 'Cooper', 1, 5),
  ('Monica', 'Bellucci', 1, 5),
  ('Samuel', 'Johnson', 1, 5),
  ('John', 'Dryden', 1, 5),
  ('Alexander', 'Pope', 1, 5),
  ('Lionel', 'Johnson', 1, 5),
  ('Aubrey', 'Beardsley', 1, 5),
  ('Tulse', 'Luper', 1, 5),
  ('William', 'Morris', 1, 5),
  ('George', 'Shaw', 1, 5),
  ('Arnold', 'Bennett', 1, 5),
  ('Algernon', 'Blackwood', 1, 5),
  ('Rhoda', 'Broughton', 1, 5),
  ('Hart', 'Crane', 1, 5),
  ('Vitorio', 'DeSica', 1, 5),
  ('Wilkie', 'Collins', 1, 5),
  ('Elizabeth', 'Gaskell', 1, 5),
  ('George', 'Sand', 1, 5),
  ('Vernon', 'Lee', 1, 5),
  ('Arthur', 'Machen', 1, 5),
  ('Frederick', 'Marryat', 1, 5),
  ('Harriet', 'Martineau', 1, 5),
  ('George', 'Meredith', 1, 5),
  ('Margaret', 'Oliphant', 1, 5),
  ('Anthony', 'Trollope', 1, 5),
  ('Charlotte', 'Yonge', 1, 5),
  ('Horace', 'Walpole', 1, 5),
  ('Matthew', 'Lewis', 1, 5),
  ('William', 'Bedford', 1, 5),
  ('Anne', 'Radcliffe', 1, 5),
  ('Charles', 'Brown', 1, 5),
  ('Eliza', 'Parsons', 1, 5),
  ('Susan', 'Hill', 1, 5),
  ('Sydney', 'Owenson', 1, 5),
  ('Hubert', 'Crackanthorpe', 1, 5),
  ('William', 'Carleton', 1, 5),
  ('Gerald', 'Griffin', 1, 5);
