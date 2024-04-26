import { render } from "@czechitas/render";
import { apiBaseURL } from "../lib/api";
import "../global.css";
import "./detail.css";

const recipeId = new URLSearchParams(window.location.search).get("recipeId");
const resp = await fetch(`${apiBaseURL}/api/recipe/${recipeId}`);
const recipeData = await resp.json();
const recipe = recipeData.data;

document.querySelector("#root").innerHTML = render(
  <div className="container">
    <header>
      <h1>Kuchtík</h1>
    </header>
    <main>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={`Ilustrační obrázek ${recipe.title}`} className="recipe-image" />
      <div>Počet porcí: {recipe.portions}</div>
      <h3>Ingredience</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Postup</h3>
      <ol>
        {recipe.directions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div><a href="/">Zpět na seznam receptů</a></div>
    </main>
    <footer>
      <p>Czechitas, Digitální akademie: Web</p>
    </footer>
  </div>
);
