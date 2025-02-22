async function fetchAndFilter(url, filterCallback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Apply the filtering logic using the provided callback function
    return data.filter(filterCallback);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Example usage:
const url = "cars.json";

// Example filter function: Get items with price > 50
fetchAndFilter(url, (item) => item.price > 50).then((filteredData) =>
  console.log(filteredData)
);
