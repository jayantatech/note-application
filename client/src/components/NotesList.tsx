// "use client";
// import { useEffect, useState } from "react";
// import NoteItem from "./NoteItem";
// import NoteEditor from "./NoteEditor";
// import NoteAdder from "./NoteAdder";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { getNotes } from "@/app/handler/authHandler";
// import Cookies from "js-cookie";

// export type Note = {
//   content?: string;
//   id?: string;
//   title?: string;
//   user_id?: string;
//   created_at?: string | Date;
//   updated_at?: null | string | Date;
// };

// interface NoteResponse {
//   data: Note[];
// }

// const NotesList = () => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAdding, setIsAdding] = useState<null | boolean>();

//   const router = useRouter();
//   const token = Cookies.get("token");

//   if (!token) {
//     router.push("/login");
//   }
//   const user_token = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const handleNotes = async () => {
//     const response = getNotes();
//     setNotes([...(await response)].reverse());
//   };
//   useEffect(() => {
//     handleNotes();
//   }, []);

//   const handleEditSave = async (updatedNote: Note) => {
//     const updatedData = {
//       title: updatedNote.title,
//       content: updatedNote.content,
//       updated_at: Date.now(),
//     };
//     const postId = updatedNote?.id;
//     try {
//       const response = axios.put(
//         `http://localhost:4000/api/notes/update/${postId}/`,
//         updatedData,
//         user_token
//       );
//       if ((await response).data) {
//         handleNotes();
//       }
//     } catch (error) {
//       console.error("The error is hear", error); // Log the entire error object
//     }
//     setSelectedNote(null);
//     setIsEditing(false);
//   };

//   const handleAddSave = (newNote: Note) => {
//     axios.post(
//       "http://localhost:4000/api/notes",
//       { title: newNote.title, content: newNote.content },
//       user_token
//     );
//     handleNotes();
//   };

//   const handleonDelete = async (noteId: string) => {
//     try {
//       const response = axios.delete(
//         `http://localhost:4000/api/notes/remove/${noteId}`,
//         user_token
//       );
//       if ((await response).data) {
//         handleNotes();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEdit = (note: Note) => {
//     setSelectedNote(note);
//   };

//   const handleClose = () => {
//     setSelectedNote(null);
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex flex-col p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Notes</h1>
//         <button
//           className="text-[16px] px-3 py-1 bg-blue-500 text-white font-semibold rounded-md"
//           onClick={() => setIsAdding(true)}
//         >
//           Add Note
//         </button>
//       </div>
//       <div className="grid grid-cols-3 gap-4">
//         {notes.map((note) => (
//           <NoteItem
//             key={note.id}
//             note={note}
//             onClick={() => handleEdit(note)}
//             onDelete={() => handleonDelete(note.id!)}
//           />
//         ))}
//       </div>
//       {selectedNote && (
//         <NoteEditor
//           note={selectedNote}
//           isEditing={isEditing}
//           onEdit={() => setIsEditing(true)}
//           onSave={handleEditSave}
//           onCancel={handleClose}
//         />
//       )}
//       {isAdding && (
//         <NoteAdder onAdd={handleAddSave} onCancel={() => setIsAdding(false)} />
//       )}
//     </div>
//   );
// };

// export default NotesList;
"use client";
import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import NoteEditor from "./NoteEditor";
import NoteAdder from "./NoteAdder";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getNotes } from "@/app/handler/authHandler";
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
  const user_token = {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-Token": csrfToken || "",
    },
    withCredentials: true,
  };
  const handleNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/notes",
        user_token
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    handleNotes();
  }, [csrfToken]);

  const handleEditSave = async (updatedNote: Note) => {
    const updatedData = {
      title: updatedNote.title,
      content: updatedNote.content,
      updated_at: Date.now(),
    };
    const postId = updatedNote?.id;
    try {
      const response = axios.put(
        `http://localhost:4000/api/notes/update/${postId}/`,
        updatedData,
        user_token
      );
      if ((await response).data) {
        handleNotes();
      }
    } catch (error) {
      console.error("The error is hear", error); // Log the entire error object
    }
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleAddSave = async (newNote: Note) => {
    try {
      const response = axios.post(
        "http://localhost:4000/api/notes",
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
        `http://localhost:4000/api/notes/remove/${noteId}`,
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
