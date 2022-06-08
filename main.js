const request = new XMLHttpRequest();

function getData(cb) {
  request.open(
    "GET",
    "https://www.themealdb.com/api/json/v1/1/random.php",
    true
  );
  request.onload = function (e) {
    if (this.status >= 200 && this.status < 400) {
      console.log("success");
      let datas = JSON.parse(this.response).meals[0];
      cb(datas);
    } else {
      console.log("err");
      console.log(e);
    }
  };

  request.onerror = function (e) {
    console.log("error");
    console.log(e);
  };

  request.send();
}

function addHTML(results) {
  const meal = document.querySelector(".meal");
  meal.innerHTML = "";
  meal.innerHTML += `
  <figure class="meal">
    <h3>${results.meal}</h3>
    <img
      src=${results.meal_img}
      alt="meal-picture"
    />
    <figcaption>Catagory:${results.catgory}</figcaption>
    <figcaption>Area:${results.area}</figcaption>
  </figure>
  `;
  const ingredients = document.querySelector(".ingredients ul");
  ingredients.innerHTML = "";
  for (let i = 0; i < results.ingredients.length; i++) {
    ingredients.innerHTML += `<li>${results.ingredients[i]}</li>`;
  }
  const instructions = document.querySelector(".instructions p");
  instructions.innerHTML = "";
  instructions.innerHTML += results.instructions;
  const video = document.querySelector(".video");
  video.innerHTML = "";
  video.innerHTML += `
  <iframe
    width="800"
    height="480"
    src=${results.youtube_link.replace("watch?v=", "embed/")}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  `;
}

const meal_btn = document.querySelector(".btn button");
meal_btn.addEventListener("click", () => {
  getData((datas) => {
    let results = {};
    results.meal = datas.strMeal;
    results.meal_img = datas.strMealThumb;
    results.catgory = datas.strCategory;
    results.area = datas.strArea;
    results.instructions = datas.strInstructions;
    results.youtube_link = datas.strYoutube;
    results.ingredients = [];
    console.log(results);
    for (let i = 1; i <= 20; i++) {
      if (datas[`strIngredient${i}`]) {
        results.ingredients.push(
          datas[`strIngredient${i}`] + " " + datas[`strMeasure${i}`]
        );
      }
    }
    addHTML(results);
  });
});
