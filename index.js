//--------------------------FETCH TESTING AREA-----------------------------------
//
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '92fd76dc14msha1db3133922d088p132954jsnbb0bff518b9a',
// 		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
// 	}
// };

// fetch('https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=kiruna&contentType=json&unitGroup=metric&shortColumnNames=0', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
//---------------------------FETCH TESTING AREA----------------------------------

// FETCH APi AREA (SKARPT LÄGE)
// window.addEventListener('load', () => {
//   const berlin = 'berlin'
//   const  stad = document.querySelector('.berlin')
//   const berlin1 = 'berlin'
//   const  stad1 = document.querySelector('.berlin2')
//   const newyork= 'newyork'
//   const stad2 = document.querySelector('.newyork')
//   const newyork1= 'newyork'
//   const stad3 = document.querySelector('.newyork2')
//   const tokyo= 'tokyo'
//   const stad4 = document.querySelector('.tokyo')
//   const tokyo1= 'tokyo'
//   const stad5 = document.querySelector('.tokyo2')
//   const istanbul= 'istanbul'
//   const stad6 = document.querySelector('.istanbul')
//   const istanbul2= 'istanbul'
//   const stad7 = document.querySelector('.istanbul2')
//   const istanbul3= 'istanbul'
//   const stad8 = document.querySelector('.istanbul3')

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '92fd76dc14msha1db3133922d088p132954jsnbb0bff518b9a',
// 		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
// 	}
// };

// fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${berlin}&contentType=json&unitGroup=metric&shortColumnNames=0`, options)
// 	.then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const {temp}= data.locations.berlin.currentConditions;
//     // DOM element från api
//     stad.textContent += Math.floor(temp) + '°';
//     stad1.textContent += Math.floor(temp) + '°';
//   })

//   fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${newyork}&contentType=json&unitGroup=metric&shortColumnNames=0`, options)
// 	.then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const {temp}= data.locations.newyork.currentConditions;
//     // DOM element från api
//     stad2.textContent += Math.floor(temp) + '°';
//     stad3.textContent += Math.floor(temp) + '°';
//   })

//   fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${tokyo}&contentType=json&unitGroup=metric&shortColumnNames=0`, options)
// 	.then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const {temp}= data.locations.tokyo.currentConditions;
//     // DOM element från api
//     stad4.textContent += Math.floor(temp) + '°';
//     stad5.textContent += Math.floor(temp) + '°';
//   })

//   fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${istanbul}&contentType=json&unitGroup=metric&shortColumnNames=0`, options)
// 	.then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const {temp}= data.locations.istanbul.currentConditions;
//     // DOM element från api
//     stad6.textContent += Math.floor(temp) + '°';
//     stad7.textContent += Math.floor(temp) + '°';
//     stad8.textContent += Math.floor(temp) + '°';
//   })

// });

// -----------   Form Section -----------

const baseURL = "https://avancera.app/cities/";

fetch(baseURL)
  .then((response) => response.json())
  .then((json) => {
    json.map((data) => {
      tbody.append(td_fun(data.name, data.population, data.id));
    });
  })
  .catch((error) => console.log(error));

let tbody = document.getElementById("tbody");

// Creates HTMLinputELement
// let ids = `${id}`

// console.log(ids)

function td_fun(name, population, id) {
  let td = document.createElement("tr");
  td.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
    <input type="radio" name="rare" value="${id}">
    <div class="flex items-center">
    <div class="flex-shrink-0 h-10 w-10"></div>
    </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
    ${name}
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
    ${population}
    </td>
    `;
  return td;
}

// --------SELECTED BUTTON-----------
function addButton() {
  var namE = document.getElementById("name").value;
  var poP = Number(document.getElementById("population").value);

  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({
      name: namE,
      population: poP,
    }),
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    if (response.ok) {
      document.getElementById("content").innerHTML = "POST was recorded";
      return;
    }
    throw new Error("Request failed.");
  });
}

function deleteButton() {
  var selectedBtn = document.querySelector('input[name="rare"]:checked');
  console.log(selectedBtn.value);
  if (selectedBtn.id != null) {
    document.getElementById("content").innerHTML = "You picked a city";
    var iD = selectedBtn.value;
  } else {
    document.getElementById("content").innerHTML = "You have not picked a city";
  }
  console.log(iD);
  fetch(baseURL + iD, { method: "DELETE" })
    .then(function (response) {
      if (response.ok) {
        document.getElementById("content").innerHTML = "Delete was recorded";
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function changeButton() {
  var namE = document.getElementById("name").value;
  var poP = Number(document.getElementById("population").value);
  var idenT = document.getElementById("id").value;

  fetch(baseURL + idenT, {
    method: "PUT",
    body: JSON.stringify({
      id: idenT,
      name: namE,
      population: poP,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (result) {
    if (result.ok) {
      document.getElementById("content").innerHTML = "POST was recorded";
      return;
    }
    throw new Error("Request failed.");
  });
}

// ---- CHART AREA ----
fetch("chart.json")
  .then((response) => response.json())
  .then((result) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const data = [],
      labels = [];

    for (let n = 0; n < result.length; n++) {
      const city = result[n];
      data.push(city.population);
      labels.push(city.name);
    }
    console.log("data", data);
    console.log("labels", labels);

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(119, 255, 148)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  });

// ----------------Burger (navbar) section----------------
const navSlide = () => {
  //Slidefunktion för hamburger menyn
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    // Burger animation
    burger.classList.toggle("toggle");
  });
};

navSlide();
//--------------Searchfield section------------------

var searchCity = document.getElementById("searchCity");
//Function för ENTER att fungera
searchCity.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    document.getElementById("send").click();
  }
});

function myOnClickFn() {
  var searchCity = document.getElementById("searchCity").value;

  let error = document.querySelector("#greeting");

  error.style.display = "none";

  if (searchCity.toLowerCase() === "berlin") {
    window.location.href = "berlin.html";
    //document.mainSearch.action = "berlin.html";
  } else if (searchCity.toLowerCase() === "tokyo") {
    window.location.href = "tokyo.html";
    //document.mainSearch.action = "tokyo.html";
  } else if (searchCity.toLowerCase() === "istanbul") {
    window.location.href = "istanbul.html";
    //document.mainSearch.action = "istanbul.html";
  } else if (searchCity.toLowerCase() === "new york") {
    window.location.href = "newyork.html";
    //document.mainSearch.action = "newyork.html";
  } else {
    error.style.display = "block";
  }

  return false;
}

/* -------------- POP-UP SECTION LAGT DETTA PÅ SEPARAT JS FIL------------- */
window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "block";
  }, 1000);
});

document.querySelector("#close").addEventListener("click", function () {
  // document.querySelector(".popup").style.display = "none";
  window.location.href = "error.html";
});

document.querySelector(".samtycke").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".container2").style.display = "block";
});

// ----------- Web Storage area -----

function count() {
  if (localStorage.count) {
    localStorage.count = Number(localStorage.count) + 1;
  } else {
    localStorage.count = 1;
  }
  document.getElementById("result").innerHTML =
    "Du har klickat " + localStorage.count + " gång(er).";
}

function deleteItems() {
  localStorage.clear();
}