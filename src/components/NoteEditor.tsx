import React, { useState, useEffect } from "react";

interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NoteEditorProps {
  note: Note;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedNote: Note) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  useEffect(() => {
    setEditedTitle(note.title);
    setEditedDescription(note.description);
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title: editedTitle, description: editedDescription });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-[560px]">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="font-bold text-xl">{note.title}</h2>
            <p className="mt-4">{note.description}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={onCancel}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
