import { useEffect, useState } from "@wordpress/element";

function Frontend({ attributes }) {
  const { filter, search } = attributes;
  const [meals, setMeals] = useState([]);
  const [areas, setAreas] = useState([]);
  const [text, setText] = useState(search);

  async function fetchAreas() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const data = await response.json();
      setAreas(data.meals || []);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  }

  useEffect(() => {
    fetchAreas();
  }, []);

  async function fetchMeals(area = filter, searchQuery = search) {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      if (searchQuery) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, [filter, search]);

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    setText("");
    setMeals([]);
    fetchMeals(selectedArea);
  };

  const handleSearch = () => {
    fetchMeals(filter, text);
  };

  return (
    <div className="swiggy-plugin-block">
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

document.addEventListener("DOMContentLoaded", () => {
  const blockElements = document.querySelectorAll(
    ".wp-block-create-block-swiggy-plugin"
  );

  blockElements.forEach((block) => {
    if (!block.getAttribute("data-rendered")) {
      const attributes = JSON.parse(block.getAttribute("data-attributes"));
      wp.element.render(<Frontend attributes={attributes} />, block);
      block.setAttribute("data-rendered", "true");
    }
  });
});
