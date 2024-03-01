import { useState } from "react";
import "./App.css";
import { Input } from "./Components/Input";
import CustomCheckbox from "./Components/CustomCheckbox";
import EditItemForm from "./Components/EditComponent";


export type Items = {
  title: string;
  id: string;
  completed: boolean;
 };
 

function App() {
 const [activeItems, setActiveItems] = useState<Items[]>([]);
 const [completedItems, setCompletedItems] = useState<Items[]>([]);
 const [inputValue, setInputValue] = useState<string>("");
 const [errorMessage, setErrorMessage] = useState<string>("");
 const [activeFilter, setActiveFilter] = useState<string>('all');
 const [editItemToShow, setEditItemToShow] = useState<Items | null>(null);

 const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      setErrorMessage("Please enter something.");
      return;
    }
    const isDuplicate = activeItems.some((item) => item.title === inputValue);
    if (isDuplicate) {
      setErrorMessage("Duplicate value not allowed.");
      return;
    }
    setActiveItems((prev) => [...prev, { title: inputValue, id: Date.now().toString(), completed: false }]);
    setInputValue("");
    setErrorMessage(""); // Clearing the error message on successful submission
 };

 const handleMarkComplete = (id: string) => {
  // Find the item with the provided id
  const itemToComplete = activeItems.find((item) => item.id === id);
  if (!itemToComplete) return; // Exit if the item is not found
 
  // Remove the item from activeItems
  const newActiveItems = activeItems.filter((item) => item.id !== id);
  setActiveItems(newActiveItems);
 
  // Add the item to completedItems with completed set to true
  const newCompletedItem = { ...itemToComplete, completed: true };
  setCompletedItems((prevCompletedItems) => [...prevCompletedItems, newCompletedItem]);
 };
 


 const handleEditItem = (id: string) => {
  const itemToEdit = activeItems.find((item) => item.id === id);
  if (!itemToEdit) return; // Add this line
  setEditItemToShow(itemToEdit);
 };
 

 const handleUpdateItem = (updatedItem: Items) => {
    setActiveItems((prevActiveItems) =>
      prevActiveItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItemToShow(null);
 };

 const handleDeleteItem = (id: string) => {
    if (confirm(`Are you sure you want to delete this item?`)) {
      setActiveItems((prevActiveItems) => prevActiveItems.filter((item) => item.id !== id));
    }
 };

 return (
    <>
      <div className="app">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <Input inputValue={inputValue} setInputValue={setInputValue} clearError={() => setErrorMessage("")} />
            {errorMessage && <p className="error-message text-red-600">{errorMessage}</p>}
            <button className="btn form__submit-btn" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="todo-list-wrap">
          <ol className="todo-list">
            {(activeFilter === 'all' ? [...activeItems, ...completedItems] :
              activeFilter === 'complete' ? completedItems : activeItems)
              .filter(data => activeFilter === 'all' || data.completed === (activeFilter === 'complete'))
              .map((data) => (
                <li key={data.id} className={`todo-list__item ${data.completed ? 'complete' : ''}`}>
                 <button className="todo-list__item-content">{data.title}</button>
                 <CustomCheckbox checked={data.completed} onChange={() => handleMarkComplete(data.id)} />
                 <button className="todo-list__item-edit" onClick={() => handleEditItem(data.id)}>
                    Edit
                 </button>
                 <button className="todo-list__item-delete" onClick={() => handleDeleteItem(data.id)}>
                    Delete
                 </button>
                </li>
              ))}
          </ol>
          {editItemToShow && (
            <EditItemForm
              item={editItemToShow}
              onClose={() => setEditItemToShow(null)}
              onUpdate={handleUpdateItem}
            />
          )}
          <div className="filters">
            <button
              className="btn filters__btn filters__btn--all"
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className="btn filters__btn filters__btn--complete"
              onClick={() => setActiveFilter('complete')}
            >
              Complete
            </button>
            <button
              className="btn filters__btn filters__btn--incomplete"
              onClick={() => setActiveFilter('incomplete')}
            >
              Incomplete
            </button>
          </div>
        </div>
      </div>
    </>
 );
}

export default App;
