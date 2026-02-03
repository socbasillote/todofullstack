import e from "express";
import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description, tag, expiresIn } = req.body;

    let expiresAt = null;

    if (expiresIn && expiresIn > 0) {
      expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);
    }

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
      tag,
      expiresAt,
    });

    if (!todo) {
      return res.status(400).json({ message: "Todo is not created" });
    }

    console.log("todo created");

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Todo
export const getTodos = async (req, res) => {
  try {
    const todo = await Todo.find();

    if (!todo) {
      res.status(400).json({ message: "No todos avaiable" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Todo By ID
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, expiresAt } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, expiresAt: expiresAt ?? null },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleTodoComplete = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
