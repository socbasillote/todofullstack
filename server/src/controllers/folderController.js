import Folder from "../models/Folder.js";
import Todo from "../models/Todo.js";

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const folder = await Folder.create({
      user: req.user.id,
      name,
    });

    res.status(200).json(folder);
  } catch (error) {
    console.error("Create folder error", error);
    res.status(500).json({ message: error.message });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = (await Folder.find({ user: req.user.id })).toSorted({
      createdAt: -1,
    });

    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const { name } = req.body;

    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name },
      { new: true },
    );

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Optional: delete todos inside folder
    await Todo.deleteMany({ folderId: folder._id });

    res.status(200).json({ message: "Folder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
