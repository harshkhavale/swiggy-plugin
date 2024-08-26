/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

const { state } = store("create-block", {
  actions: {
    init: function* () {
      const context = getContext();
      
      try {
        const response = yield fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        );
        const data = yield response.json();

        context.mealsData = data.meals;
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    },

    handleInputChange: (e) => {
      const inputValue = e.target.value;
      const context = getContext();
      
      try {
        context.searchText = inputValue;
        console.log("search:", context.searchText);
      } catch (error) {
        console.error("Error updating search text:", error);
      }
    },
    
  },

  callbacks: {
    loadMeals: function* () {
      const context = getContext();

      try {
        const response = yield fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${context.searchText}`
        );
        const data = yield response.json();
        console.log(data.meals);
        console.log(context);
        
        context.mealsData = data.meals;
        window.dispatchEvent(new Event('render-request'));

      } catch (error) {
        console.error("Error loading meals:", error);
      }
    },
  },
});
