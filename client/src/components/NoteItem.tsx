import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
type Note = {
  content?: string;
  id?: string;
  title?: string;
  user_id?: string;
  created_at?: string | Date;
  updated_at?: null | string | Date;
};

interface NoteItemProps {
  note: Note;
  onClick: () => void;
  onDelete: () => void;
}

const NoteItem = ({ note, onClick, onDelete }: NoteItemProps) => {
  return (
    <div className="p-4 w-[380px] max-lg:w-[260px] max-md:w-[180px] h-auto bg-white rounded shadow-lg shadow-slate-300  relative">
      <div
        className=" w-[40px] h-[40px] bg-gray-100 items-center flex justify-center rounded-lg absolute -right-3 -top-3 cursor-pointer"
        onClick={() => onDelete()}
      >
        <MdOutlineDeleteOutline className="text-[20px] text-red-500" />
      </div>
      <div className="w-full h-full cursor-pointer" onClick={onClick}>
        <h2 className="font-bold text-[18px] pb-1">{note.title}</h2>
        {note?.content && (
          <p className="text-sm">{`${note?.content
            .split(" ")
            .slice(0, 20)
            .join(" ")}...`}</p>
        )}
      </div>
    </div>
  );
};

export default NoteItem;
