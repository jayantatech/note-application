"use client";
import React, { useState } from "react";
import NoteItem from "./NoteItem";
import NoteEditor from "./NoteEditor";
import NoteAdder from "./NoteAdder";

interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Focus Time",
    description:
      "Hi guys, I would like to suggest that we set a fixed focus time within the company...",
    date: "08/22/2020",
  },
];

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleEditSave = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleAddSave = (newNote: Note) => {
    setNotes([...notes, newNote]);
    setIsAdding(false);
  };

  const handleonDelete = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
  };

  const handleClose = () => {
    setSelectedNote(null);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <button
          className="text-[16px] px-3 py-1 bg-[#1F2937] text-white rounded-md"
          onClick={() => setIsAdding(true)}
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onClick={() => handleEdit(note)}
            onDelete={() => handleonDelete(note.id)}
          />
        ))}
      </div>
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleEditSave}
          onCancel={handleClose}
        />
      )}
      {isAdding && (
        <NoteAdder onAdd={handleAddSave} onCancel={() => setIsAdding(false)} />
      )}
    </div>
  );
};

export default NotesList;
