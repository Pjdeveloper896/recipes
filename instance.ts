export class Recipe {
  id: number;
  title: string;
  image: string;
  procedure: string;
  category: string;

  constructor(id: number, title: string, image: string, procedure: string, category: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.procedure = procedure;
    this.category = category;
  }
}

function getInputValue(id: string): string {
  const el = document.getElementById(id);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value;
  }
  throw new Error(`Input with id '${id}' not found or is not an input`);
}

function getInputFile(id: string): File | null {
  const el = document.getElementById(id) as HTMLInputElement;
  if (el && el.files) {
    return el.files[0];
  }
  return null;
}

function createRecipeCard(recipe: Recipe): HTMLElement {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.id = `recipe-${recipe.id}`;

  const title = document.createElement('h2');
  title.textContent = recipe.title;

  const image = document.createElement('img');
  image.src = recipe.image;
  image.alt = recipe.title;

  const procedure = document.createElement('p');
  procedure.textContent = recipe.procedure;

  const category = document.createElement('span');
  category.textContent = recipe.category;
  category.className = 'recipe-category';

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(procedure);
  card.appendChild(category);

  return card;
}

const button = document.getElementById('submit');
const container = document.getElementById('container');

if (button && container) {
  button.addEventListener('click', () => {
    try {
      // Handle file input separately
      const file = getInputFile('image');
      let imageSrc = '';
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Create the recipe once the image is read
          const recipe = new Recipe(
            Date.now(),
            getInputValue('title'),
            event.target?.result as string,  // Use FileReader result (base64)
            getInputValue('procedure'),
            getInputValue('category')
          );

          const card = createRecipeCard(recipe);
          container.appendChild(card);

          // Clear inputs after adding the recipe
          clearInput('title');
          clearInput('image');
          clearInput('procedure');
          clearInput('category');
        };
        reader.readAsDataURL(file);  // Convert the file to base64
      } else {
        // If no image is provided, continue with a default placeholder or empty string
        const recipe = new Recipe(
          Date.now(),
          getInputValue('title'),
          '', // No image
          getInputValue('procedure'),
          getInputValue('category')
        );

        const card = createRecipeCard(recipe);
        container.appendChild(card);

        // Clear inputs after adding the recipe
        clearInput('title');
        clearInput('image');
        clearInput('procedure');
        clearInput('category');
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function clearInput(id: string) {
  const el = document.getElementById(id);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    el.value = '';
  }
}
