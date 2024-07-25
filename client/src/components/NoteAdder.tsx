"use client";
import { useState } from "react";
import { Note } from "./NotesList";

interface NoteAdderProps {
  onAdd: (newNote: Note) => void;
  onCancel: () => void;
}

const NoteAdder = ({ onAdd, onCancel }: NoteAdderProps) => {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");

  const handleAdd = () => {
    const newNote: Note = {
      title: newNoteTitle,
      content: newNoteDescription,
    };

    onCancel();
    onAdd(newNote);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-[560px]">
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Title"
        />
        <textarea
          value={newNoteDescription}
          onChange={(e) => setNewNoteDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Description"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={handleAdd}
        >
          Add
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteAdder;
