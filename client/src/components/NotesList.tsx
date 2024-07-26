"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import NoteItem from "./NoteItem";
import NoteEditor from "./NoteEditor";
import NoteAdder from "./NoteAdder";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchCsrfToken } from "@/utils/csrf";

export type Note = {
  content?: string;
  id?: string;
  title?: string;
  user_id?: string;
  created_at?: string | Date;
  updated_at?: null | string | Date;
};

interface NoteResponse {
  data: Note[];
}

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState<null | boolean>();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    const getCsrfToken = async () => {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    };

    getCsrfToken();
  }, []);

  if (!token) {
    router.push("/login");
  }
  const user_token = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
        "X-CSRF-Token": csrfToken || "",
      },
      withCredentials: true,
    }),
    [token, csrfToken]
  );
  const handleNotes = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://note-application-bbc9.onrender.com/api/notes",
        user_token
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [user_token]);

  useEffect(() => {
    handleNotes();
  }, [csrfToken, handleNotes]);

  const handleEditSave = async (updatedNote: Note) => {
    const updatedData = {
      title: updatedNote.title,
      content: updatedNote.content,
      updated_at: Date.now(),
    };
    const postId = updatedNote?.id;
    try {
      const response = axios.put(
        `https://note-application-bbc9.onrender.com/api/notes/update/${postId}/`,
        updatedData,
        user_token
      );
      if ((await response).data) {
        handleNotes();
      }
    } catch (error) {
      console.error("The error is hear", error);
    }
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleAddSave = async (newNote: Note) => {
    try {
      const response = axios.post(
        "https://note-application-bbc9.onrender.com/api/notes",
        { title: newNote.title, content: newNote.content },
        user_token
      );
      if ((await response).data) {
        handleNotes();
      }
    } catch (error) {
      if (error) throw new Error("save post failed");
    }
  };

  const handleonDelete = async (noteId: string) => {
    try {
      const response = axios.delete(
        `https://note-application-bbc9.onrender.com/api/notes/remove/${noteId}`,
        user_token
      );
      if ((await response).data) {
        handleNotes();
      }
    } catch (error) {
      console.log(error);
    }
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
          className="text-[16px] px-3 py-1 bg-blue-500 hover:bg-red-500  hover:scale-95 transition-all duration-200 text-white rounded-md font-medium"
          onClick={() => setIsAdding(true)}
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onClick={() => handleEdit(note)}
            onDelete={() => handleonDelete(note.id!)}
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
