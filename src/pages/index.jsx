import { render } from "@czechitas/render";
import { apiBaseURL } from "../lib/api";
import "../global.css";
import "./index.css";

const resp = await fetch(apiBaseURL + "/api/recipe");
const data = await resp.json();
const recipes = data.data;
recipes.reverse();

const handleAppendFormSubmit = async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const portions = document.getElementById("portions").valueAsNumber;
  const ingredients = document.getElementById("ingredients").value;
  const directions = document.getElementById("directions").value;

  const recipe = {
    title,
    image: imageUrl,
    portions,
    ingredients: ingredients
      .trim()
      .split("\n")
      .filter((line) => line !== ""),
    directions: directions
      .trim()
      .split("\n")
      .filter((line) => line !== ""),
  };

  const resp = await fetch(apiBaseURL + "/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (resp.ok) {
    window.location.reload();
  } else {
    alert("Přidání receptu se nezdařilo. Zkuste to za chvíli znovu.");
  }
};

const handleRecipeDelete = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;

  const resp = await fetch(apiBaseURL + `/api/recipe/${id}`, {
    method: "DELETE",
  });

  if (resp.ok) {
    window.location.reload();
  } else {
    alert("Smazání receptu se nezdařilo. Zkuste to za chvíli znovu.");
  }
};

const handleRecipeShow = async (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;

  window.location = `/detail.html?recipeId=${id}`;
};

const RecipeCard = ({ recipe }) => (
  <li className="recipe-card">
    <h2>{recipe.title}</h2>
    <img
      className="recipe-card__image"
      src={recipe.image}
      alt={`ilustrační obrázek ${recipe.title}`}
    />
    <div>
      <button className="action__show-detail" data-id={recipe.id}>
        Zobrazit recept
      </button>
      <button className="action__delete" data-id={recipe.id}>
        Smazat recept
      </button>
    </div>
  </li>
);

const AppendForm = () => (
  <form id="appendForm">
    <div className="append-form__row">
      <label htmlFor="title" className="append-form__label">
        Title:
      </label>
      <input type="text" required id="title" />
    </div>
    <div className="append-form__row">
      <label htmlFor="imageUrl" className="append-form__label">
        Image URL:
      </label>
      <input type="url" required id="imageUrl" />
    </div>
    <div className="append-form__row">
      <label htmlFor="portions" className="append-form__label">
        Portions:
      </label>
      <input type="number" min="1" required defaultValue="4" id="portions" />
    </div>
    <div className="append-form__row">
      <label htmlFor="ingredients" className="append-form__label">
        Ingredients:
      </label>
      <textarea id="ingredients" rows="5" required></textarea>
    </div>
    <aside>One ingradient on line.</aside>
    <div className="append-form__row">
      <label htmlFor="directions" className="append-form__label">
        Directions:
      </label>
      <textarea id="directions" rows="5" required></textarea>
    </div>
    <aside>One step on line.</aside>
    <div>
      <button type="submit">Append recipe</button>
    </div>
  </form>
);

document.querySelector("#root").innerHTML = render(
  <div className="container">
    <header>
      <h1>Kuchtík</h1>
    </header>
    <main>
      <menu className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </menu>
      <AppendForm />
    </main>
    <footer>
      <p>Czechitas, Digitální akademie: Web</p>
    </footer>
  </div>
);

document
  .getElementById("appendForm")
  .addEventListener("submit", handleAppendFormSubmit);

document
  .querySelectorAll(".action__delete")
  .forEach((deleteButton) =>
    deleteButton.addEventListener("click", handleRecipeDelete)
  );

document
  .querySelectorAll(".action__show-detail")
  .forEach((deleteButton) =>
    deleteButton.addEventListener("click", handleRecipeShow)
  );
