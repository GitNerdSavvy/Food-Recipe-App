import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';



const App=()=>{
  const API_ID="910a0534";
  const APP_KEY="7c45221f485f1358914218475ae5ea72";
  // const defaultQuery='kheer'

const [recipes,setRecipes]=useState([]);
const [search, setSearch]=useState('');
const [query,setQuery]=useState('kheer');



useEffect(() => {
  getRecipes();

 
}, [query]);

const getRecipes=async()=>{
  const response=await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${APP_KEY}`
  );
  const data=await response.json();
  setRecipes(data.hits);
};

const updateSearch=e=>{
  setSearch(e.target.value);
};

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
};




  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" placeholder='Search Your Recipes'  value={search} onChange={updateSearch}/>
        <button className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
