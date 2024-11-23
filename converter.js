const allgoals = document.querySelector('.allgoals')

//render goal
const renderGoal = (data, id) => {

  const html = `
    <ul id="goalList" data-id="${id}">
      <li>${data.maintask} <button class="delete" data-id="${id}">Delete</button></li>
    </ul> 
  `;

  allgoals.innerHTML+= html

};
//remove goal
const removeGoal = (id) => {
  const tasks = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
}