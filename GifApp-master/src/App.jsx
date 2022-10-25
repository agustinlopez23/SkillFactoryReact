import "./assets/css/App.css";
import NavBar from "./components/NavBar";
import GifCards from "./components/GifCards";
import { useState } from "react";
import ListCategories from "./components/ListCategories";
function App() {
  const [category, setCategory] = useState([]);

  const handleAddCategory = (value) => {
    setCategory([value, ...category]);
  };

  return (
    <div>
      <NavBar AddCategory={handleAddCategory} setCategory={setCategory} />

      <ListCategories category={category} setCategory={setCategory} />

      {category.map((category) => (
        <GifCards key={category} category={category} />
      ))}
    </div>
  );
}

export default App;
