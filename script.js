// // URL of the API endpoint
const url = 'https://api.cricapi.com/v1/currentMatches?apikey=7cad1ac8-3a78-45b7-8434-31067243b52b&offset=0';

// const series_id="47eb876f-23a7-4e97-ac7f-4bfdf0bd41c1"
// Function to fetch data from the API
async function fetchCurrentMatches() {
  try {
    // Making the GET request to the API
    const response = await fetch(url);
    // console.log(response)
    // Checking if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parsing the JSON data from the response
    const data = await response.json();
    console.log(data)
    const matchesList = data.data;

    if(!matchesList)return [];
    
    matchesList.sort((a, b) => new Date(a.date) - new Date(b.date));

    // const relevantData = matchesList.map(match => `${match.name}, ${match.status}`);
    const relevantData = matchesList.filter(match => match.series_id == "5f2573bb-a50b-44da-a908-a4ee58700176").map(match => `
    <li>
      <div class="match-name">${match.name.split(',')[0]}</div>
      <div class="match-details">${match.date}, ${match.name.split(',')[1]}</div>
      <div class="match-status">${match.status}</div>
    </li> 
  `);;

    console.log({relevantData});
    

    document.querySelector("#matches").innerHTML=relevantData.map(match=>`<li>${match}</li>`).join('');

  } catch (error) {
    // Handling any errors that occurred during the fetch
    console.error('Error fetching the data:', error);
  }
}

// Calling the function to fetch and log the API data
fetchCurrentMatches();
