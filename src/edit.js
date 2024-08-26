import { useBlockProps } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
  const { meals, filter, search } = attributes;
  const [areas, setAreas] = useState([]); 
  const [text, setText] = useState(search); 

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        setAreas(data.meals);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }

    fetchAreas();
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      try {
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
        if (search) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setAttributes({ meals: data.meals || [] });
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }

    fetchMeals();
  }, [filter, search, setAttributes]);

  const handleAreaChange = (e) => {
    setAttributes({ filter: e.target.value, search: "" });
    setText("");
  };

  const handleSearch = () => {
    setAttributes({ search: text });
  };

  return (
    <div {...useBlockProps()}>
        <div className="header">

      <div className="area-filter">
        <label htmlFor="area-select">Select an Area:</label>
        <select id="area-select" onChange={handleAreaChange} value={filter}>
          {areas.map((area, index) => (
            <option key={index} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>
      </div>
      <div className="search">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="meal-search"
          placeholder="Search for a meal..."
        />
        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      </div>

      <div className="food-menu">
        <div className="food-items">
          {meals && meals.length > 0 ? (
            meals.map((meal, index) => (
              <div key={index} className="food-item">
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
            ))
          ) : (
            <p>No meals available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
