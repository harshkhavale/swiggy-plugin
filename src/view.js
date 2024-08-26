/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";
store("create-block", {
  actions: {
    init: async () => {
      const context = getContext();
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
      );
	 
      const data = await response.json();

      context.attributes.meals = data.meals;

    },

    handleInputChange: (e) => {
      const inputValue = e.target.value;
      const context = getContext();
      context.attributes.search = inputValue;
      console.log("search:",inputValue);
    },
    loadMeals: async () => {
      const context = getContext();

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${context.attributes.search}`
      );
      const data = await response.json();
      context.attributes.meals = data.meals;
      console.log(context.attributes.meals);
    },
  },

  callbacks: {},
});

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata - search by meal
// https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian - area
