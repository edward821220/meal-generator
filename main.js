const request = new XMLHttpRequest();

// 先寫一個取得資料的 function
function getData(cb) {
// 連接 API
  request.open(
    "GET",
    "https://www.themealdb.com/api/json/v1/1/random.php",
    true
  );
// 載入完成後執行，如果連接成功就將 JSON 資料轉成 object，失敗的話就印出錯誤訊息 
  request.onload = function (e) {
    if (this.status >= 200 && this.status < 400) {
      console.log("success");
      let datas = JSON.parse(this.response).meals[0];
// 資料轉成 object 後丟到 callback function 處理
      cb(datas);
    } else {
      console.log("err");
      console.log(e);
    }
  };
// requests 發生錯誤就印出來 
  request.onerror = function (e) {
    console.log("error");
    console.log(e);
  };

  request.send();
}

// 藉由 DOM 操作將資料加到 HTML 的函數
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

// 對按鈕增加一個 click 事件
const meal_btn = document.querySelector(".btn button");
meal_btn.addEventListener("click", () => {
//   click 後就執行 getData function
  getData((datas) => {
//   把取得的資料 datas 整理成想要的 results
    let results = {};
    results.meal = datas.strMeal;
    results.meal_img = datas.strMealThumb;
    results.catgory = datas.strCategory;
    results.area = datas.strArea;
    results.instructions = datas.strInstructions.replaceAll(".", ".<br>");
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
//  把 results 丟到 addHTML function 去執行，將資料加到 HTML 內
    addHTML(results);
  });
});
