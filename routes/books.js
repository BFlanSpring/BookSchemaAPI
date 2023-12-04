const express = require("express");
const Book = require("../models/book");
const { validate } = require('jsonschema');
const bookSchemaNew = require('../schemas/bookSchemaNew');
const bookSchemaUpdate = require('../schemas/bookSchemaUpdate');

const router = new express.Router();

/** GET / => {books: [book, ...]} */
router.get("/", async function(req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id] => {book: book} */
router.get("/:id", async function(req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST / bookData => {book: newBook} */
router.post("/", async function(req, res, next) {
  const receivedBook = req.body;

  const validation = validate(receivedBook, bookSchemaNew);

  if (!validation.valid) {
    const errors = validation.errors.map(e => e.stack);
    return res.status(400).json({ errors });
  }

  try {
    const book = await Book.create(receivedBook);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn] bookData => {book: updatedBook} */
router.put("/:isbn", async function(req, res, next) {
  const receivedBook = req.body;

  const validation = validate(receivedBook, bookSchemaUpdate);

  if (!validation.valid) {
    const errors = validation.errors.map(e => e.stack);
    return res.status(400).json({ errors });
  }

  try {
    const book = await Book.update(req.params.isbn, receivedBook);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn] => {message: "Book deleted"} */
router.delete("/:isbn", async function(req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;


