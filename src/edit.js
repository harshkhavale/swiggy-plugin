import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const { meals } = attributes;

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
            const data = await response.json();
            setAttributes({ meals: data.meals });
        }

        fetchMeals();
    }, []);

    return (
        <div {...useBlockProps()}>
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
                        <p>Loading meals...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
