let url =
  "https://raw.githubusercontent.com/kilerzi/objects1/dd48ff2bb97063fe33488c178aa2094372999e80/cars.json";
let allData = [];

//fetcnuvam url
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching data");

    allData = await response.json();
    populateDropdowns(allData);
    displayData(allData);
  } catch (error) {
    console.error("Error:", error);
  }
}

//ova e za dropdownsot isto taka tie tockite aka ... se za da dobieme unique vrednosti
function populateDropdowns(data) {
  const filters = {
    typeFilter: [...new Set(data.map((item) => item.type))],
    brandFilter: [...new Set(data.map((item) => item.brand))],
    gasTypeFilter: [...new Set(data.map((item) => item.gasType))],
    colorFilter: [...new Set(data.map((item) => item.color))],
  };
  //loop za sekoj entry preky filters object
  Object.entries(filters).forEach(([id, values]) => {
    //zemi go dropdown elementot preky negovoto id
    const select = document.getElementById(id);
    //ova gi zima valuesot i gi prefrla vo drop downsot
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  });
}

// funkcija da filtera i da prikazuva data
function filterData() {
  const selectedFilters = {
    type: document.getElementById("typeFilter").value,
    brand: document.getElementById("brandFilter").value,
    model: document.getElementById("modelFilter").value.toLowerCase(),
    doors: document.getElementById("doorsFilter").value,
    gasType: document.getElementById("gasTypeFilter").value,
    color: document.getElementById("colorFilter").value,
    condition: document.querySelector("input[name='condition']:checked")
      ? document.querySelector("input[name='condition']:checked").value
      : "",
    minHorsepower: document.getElementById("horsepowerFilter").value,
    maxHorsepower: document.getElementById("maxHorsepowerFilter").value,
  };
  //kako raboti filteranjeto
  const filteredData = allData.filter((item) => {
    return (
      //checknuva ako itemot e ednakov so type filterot prvo go stava prazno ba go dobiva od pogore kodot koga go selektiras filterite i potoa go sporeduva dali ima takva kola slicen nacin rabotat i tie podole osven horsepower horsepower samo proveruva dali e pogolemo ili pomalo
      (selectedFilters.type === "" || item.type === selectedFilters.type) &&
      (selectedFilters.brand === "" || item.brand === selectedFilters.brand) &&
      (selectedFilters.model === "" ||
        item.model.toLowerCase().includes(selectedFilters.model)) &&
      (selectedFilters.doors === "" || item.doors == selectedFilters.doors) &&
      (selectedFilters.gasType === "" ||
        item.gasType === selectedFilters.gasType) &&
      (selectedFilters.color === "" || item.color === selectedFilters.color) &&
      (selectedFilters.condition === "" ||
        item.isNew === (selectedFilters.condition === "true")) &&
      (selectedFilters.minHorsepower === "" ||
        item.horsepower >= parseInt(selectedFilters.minHorsepower)) &&
      (selectedFilters.maxHorsepower === "" ||
        item.horsepower <= parseInt(selectedFilters.maxHorsepower))
    );
  });

  displayData(filteredData);
}

// funkcija da gi displaynes stvarite vo tabela
function displayData(data) {
  const outputTable = document.getElementById("outputTable");
  outputTable.innerHTML = ""; // Clear previous data

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.type}</td>
            <td>${item.brand}</td>
            <td>${item.model}</td>
            <td>${item.doors}</td>
            <td>${item.gasType}</td>
            <td>${item.color}</td>
            <td>${item.isNew}</td>
            <td>${item.horsepower}</td>
        `;
    outputTable.appendChild(row);
  });
}

//event listener za search buttonot
document.getElementById("searchButton").addEventListener("click", filterData);

// fetcnuva data koga se uklucuva stranicata
fetchData();
