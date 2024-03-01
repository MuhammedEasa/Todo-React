import { useState } from "react";
import { Items } from "../App"
import './EditComponent.css'
interface EditItemFormProps {
 item: Items;
 onClose: () => void;
 onUpdate: (item: Items) => void;
}

function EditItemForm({ item, onClose, onUpdate }: EditItemFormProps) {
 const [title, setTitle] = useState(item.title);

 const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdate({ ...item, title });
    onClose();
 };

 return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      <button className="todo-list__item-update" type="submit">Update</button>
      <button className="todo-list__item-Cancel" type="button" onClick={onClose}>Cancel</button>
    </form>
 );
}

export default EditItemForm;
