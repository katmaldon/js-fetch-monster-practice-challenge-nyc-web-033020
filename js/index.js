document.addEventListener("DOMContentLoaded", () => {

  const monsterContainer = document.getElementById("monster-container")
  const createMonster = document.getElementById("create-monster")

  const newForm = document.createElement('form')
  newForm.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age">
    <label for="description">Description:</label>
    <input type="text-field" id="description" name="description">
    <input type="submit" value="Create Monster">
  `
  createMonster.appendChild(newForm)

  const addMonster = (monster) => {
    let monsterDiv = document.createElement("div")
    monsterDiv.className = "monster"
    monsterDiv.innerHTML = `
      <h3>Name: ${monster.name}</h3>
      <h5>Age: ${monster.age}</h5>
      <p>${monster.description}</p>
      <br><br>
      `
    monsterContainer.appendChild(monsterDiv)
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault()
    const form = event.target

    const formData = {
      name: form.name.value,
      age: parseInt(form.age.value),
      description: form.description.value
    }

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
      }
    )
    .then(resp => resp.json())
    .then(json => {
      addMonster(json)
    })

    form.reset()
  });


});
