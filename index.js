import express from "express";
import mysql from "mysql";
import cors from "cors"
import 'dotenv/config'

const app = express();
app.use(express.json());

app.use(cors())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.get("/sectors", (req, res) => {
  const q = "SELECT * FROM sectors";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// get all employees data
app.get("/employees", (req, res) => {
  const q = "SELECT * FROM employees";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// add employee info
app.post("/new-employee", (req, res) => {
  const q =
    "INSERT INTO employees (`user_id`, `full_name`, `sector_id`, `parent_id`, `agree_to_terms`) VALUES (?)";
  const values = [
    req.body.user_id,
    req.body.full_name,
    req.body.sector_id,
    req.body.parent_id,
    req.body.agree_to_terms
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// delete employee from database
app.delete("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const q = " DELETE FROM employees WHERE id = ? ";

  db.query(q, [employeeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// get specific employee 
app.get("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const q = " SELECT * FROM employees WHERE id = ? ";

  db.query(q, [employeeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// edit employee info
app.put("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const q =
    "UPDATE employees SET `full_name`= ?, `sector_id`= ?, `parent_id` = ? WHERE id = ?";

  const values = [req.body.full_name, req.body.sector_id, req.body.parent_id];

  db.query(q, [...values, employeeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800);
