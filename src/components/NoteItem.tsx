import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Note {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NoteItemProps {
  note: Note;
  onClick: () => void;
  onDelete: (noteId: number) => void;
}

const NoteItem = ({ note, onClick, onDelete }: NoteItemProps) => {
  return (
    <div className="p-4 w-[380px] h-auto bg-white rounded shadow-lg shadow-slate-300  relative">
      <div
        className=" w-[32px] h-[32px] bg-gray-200 items-center flex justify-center rounded-full absolute -right-3 -top-3 cursor-pointer"
        onClick={() => onDelete(note.id)}
      >
        <MdOutlineDeleteOutline className="text-[20px] text-red-500" />
      </div>
      <div className="w-full h-full cursor-pointer" onClick={onClick}>
        <h2 className="font-bold text-[18px] pb-1">{note.title}</h2>
        <p className="text-xs text-gray-500 pb-1">{note.date}</p>
        <p className="text-sm">{`${note.description
          .split(" ")
          .slice(0, 20)
          .join(" ")}...`}</p>
      </div>
    </div>
  );
};

export default NoteItem;
