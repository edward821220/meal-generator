由於在做前一個 Twitch Project 時，發現自己對串接 API 和 AJAX 的部分很不熟，   
包含 callback function 、 request語法、DOM操作，都花了很多時間查資料重新建立觀念。   
有鑑於此，為了更熟悉這部分的技術，在 [100+ Project Idea Resources for Web Developers](https://dev.to/asheeshh/100-project-ideas-web-developers-2fn8?ref=jonas.io) 網站上，   
找了一個 meal-generator 的 project 來練習，也多學到了將Youtube影片嵌入網頁的方法。

用到的技術包含：
1.HTML+CSS 簡易排版
2.CSS 預處理器 SCSS
3.使用 JavaScript 串接 TheMealDB API 抓取食譜的照片、食材需求、步驟、示範影片連結
4.設定click的event，每按一下就會載入其他菜色
5.將示範影片連結以 iframe 的方式嵌入，直接將影片顯示在網頁上



## Project link
- [CodePen](https://codepen.io/edward821220/full/KKQxLeW)

以下是Project說明：
# Random Meal Generator

Generate a random meal from an API.

## User Stories

- [v] User can click a button that will get a random meal from an external API (see below)
- [v] The app should display: **Recipe name**, **Ingredients**, **Instructions** and a **Picture** of the meal
- [v] By clicking the button again, another meal will be generated

## Bonus features

- [v] The app should display a **YouTube Video**

## Resources

- [TheMealDB API](https://www.themealdb.com)


