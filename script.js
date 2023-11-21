/********************** Characters **********************/
let currentPage = 1;
let planetUrl;
let speciesUrl;
let vehiclesUrl;
let starshipsUrl;

let planetBtn = document.getElementById('planetBtn');
let speciesBtn = document.getElementById('speciesBtn');
let vehiclesBtn = document.getElementById('vehiclesBtn');
let starshipsBtn = document.getElementById('starshipsBtn');

// Hämta alla knappar
let planetBtns = document.querySelectorAll("#planetBtn");
let speciesBtns = document.querySelectorAll("#speciesBtn");
let vehiclesBtns = document.querySelectorAll("#vehiclesBtn");
let starshipsBtns = document.querySelectorAll("#starshipsBtn");

// gör backPageBtn diabled när sidan startas
checkPageNumber();

// för att sidan ska visas i början
fetchData();

// knappen för att byta till nästa sida/url
document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    checkPageNumber();
    document.getElementById('charsPageCounter').textContent = `${currentPage} / 8`;
    document.getElementById('charactersList').innerHTML = '';
    document.getElementById('detailsList').innerHTML = '';
    document.getElementById('detailsBtnList').innerHTML = '';
    fetchData();

    console.log(currentPage);
})

// knappen för att byta till förgående sida/url
document.getElementById('backPageBtn').addEventListener('click', () => {
    currentPage--;
    checkPageNumber();
    document.getElementById('charsPageCounter').textContent = `${currentPage} / 8`;
    document.getElementById('charactersList').innerHTML = '';
    document.getElementById('detailsList').innerHTML = '';
    document.getElementById('detailsBtnList').innerHTML = '';
    fetchData();

    console.log(currentPage);
})

// kollar vilket värde currentPage har och gör knapparna disabled vid ett värde
function checkPageNumber() {
    document.getElementById('charsPageCounter').textContent = `${currentPage} / 8`;
    document.getElementById('nextPageBtn').disabled = currentPage === 9;
    document.getElementById('backPageBtn').disabled = currentPage === 1;
}

// återställer knapparna i details
function resetButtons() {
    let buttons = document.querySelectorAll('.main__detailsBtn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "rgb(235, 235, 235)";
      buttons[i].style.color = "rgba(140, 118, 0, 1)";
    }
  }

function fetchData() {

    // hämtade datan från APIn med fetch och base URL adressen
    // fetch är ett promice-baserat som vi hämtar/(consume) med .then() som är ett promice
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)

    // med .then() får vi ett svar (response) som vi kallar res
    // vi får in datan i form av json som vi sedan konverterar till js
    .then(res => res.json())

    // här hanmar den datan vi var ute efter (people) som vi konverterar till js i form av en array
    .then(data => {

        // vi har data i form av en array och vi vill göra en lista med namnen från 'people' i arrayen
        console.log(data);

        // gör en forEach loop på arrayen 'data.results' som går genom varje element i arrayen, varje element är ett objekt som representerar en profil 'user'
        data.results.forEach(user => {

            // vi gör varje 'name' i listan till en knapp med det specifika namnet i knappen
            const nameBtn = document.createElement('button');
            nameBtn.innerText = user.name;

            // gör så att knapparna hamnar i en lista
            const listItem = document.createElement('li');
            listItem.appendChild(nameBtn);

            // lägger vi listan i html
            document.getElementById('charactersList').appendChild(listItem);

            // sedan skapar vi en ny lista med element som vi kopplar till det specifika namnet och läggar listan under (detaljer) i html. Listan visas när man klickar på en knapp.
            nameBtn.addEventListener('click', () => {

                document.getElementById('detailsBtnList').innerHTML = '';

                const detailsDiv = document.getElementById('detailsList');
                detailsDiv.innerHTML = 
                `<li>${user.name}</li>
                <li>Height: ${user.height}cm</li>
                <li>Mass: ${user.mass}kg</li>
                <li>Hair color: ${user.hair_color}</li>
                <li>Skin color: ${user.skin_color}</li>
                <li>Eye color: ${user.eye_color}</li>
                <li>Birth year: ${user.birth_year}</li>
                <li>Gender: ${user.gender}</li>`;

                planetUrl = user.homeworld;
                speciesUrl = user.species;
                vehiclesUrl = user.vehicles;
                starshipsUrl = user.starships;
            });
        });

        // planet knappen
        planetBtns.forEach((button) => {
            button.onclick = function() {
                resetButtons();

                // knapparnas ursprungliga style
                planetBtns.forEach((button) => {
                button.style.backgroundColor = "rgb(235, 235, 235)";
                button.style.color = "rgba(140, 118, 0, 1)";
                });

                // stylen på knapparna efter onklick
                this.style.backgroundColor = "rgba(142, 142, 142, 1)";
                this.style.color = "rgba(255, 214, 0, 1)";

                fetch(planetUrl)
                .then(res => {
                    if (!res.ok) {
                        // hoppar direkt till catch-funktionen när planetUrl inte svarar
                        throw new Error('Något gick fel');
                    }
                    return res.json();
                })
                .then(planetData => {
                    console.log(planetData);
                    // vi skapar en lista av element från userns 'planet' och lägger listan i html
                    const detailsBtnDiv = document.getElementById('detailsBtnList');
                    detailsBtnDiv.innerHTML = 
                    `<li>${planetData.name}</li>
                    <li>Rotation period: ${planetData.rotation_period}h</li>
                    <li>Orbital period: ${planetData.orbital_period} days</li>
                    <li>Diameter: ${planetData.diameter}km</li>
                    <li>Climate: ${planetData.climate}</li>
                    <li>Gravity: ${planetData.gravity}</li>
                    <li>Terrain: ${planetData.terrain}</li>`;
                })
                .catch(error => {
                    // om planetUrl är undefined
                    console.log('Ingen planetinfo tillgänglig');
                    const detailsBtnList = document.getElementById('detailsBtnList');
                    detailsBtnList.innerHTML = '<p>No planetinfo available</p>';    
                });
            }
        })

        // species knappen
        speciesBtns.forEach((button) => {
            button.onclick = function() {
                resetButtons();

                // knapparnas ursprungliga style
                planetBtns.forEach((button) => {
                button.style.backgroundColor = "rgb(235, 235, 235)";
                button.style.color = "rgba(140, 118, 0, 1)";
                });

                // stylen på knapparna efter onklick
                this.style.backgroundColor = "rgba(142, 142, 142, 1)";
                this.style.color = "rgba(255, 214, 0, 1)";

                fetch(speciesUrl)
                .then(res => {
                    if (!res.ok) {
                        // hoppar direkt till catch-funktionen när speciesUrl inte svarar
                        throw new Error('Något gick fel');
                    }
                    return res.json();
                })
                .then(speciesData => {
                    console.log(speciesData);
                    // vi skapar en lista av element från userns 'species' och lägger listan i html
                    const detailsBtnDiv = document.getElementById('detailsBtnList');
                    detailsBtnDiv.innerHTML = 
                    `<li>${speciesData.name}</li>
                    <li>Classification: ${speciesData.classification}</li>
                    <li>Language: ${speciesData.language}</li>
                    <li>Average lifespan: ${speciesData.average_lifespan} years</li>`;
                })
                .catch(error => {
                    // om speciesUrl är undefined
                    console.log('Ingen speciesinfo tillgänglig');
                    const detailsBtnList = document.getElementById('detailsBtnList');
                    detailsBtnList.innerHTML = '<p>No speciesinfo available</p>';    
                });
            }
        })

        // vehicles knappen
        vehiclesBtns.forEach((button) => {
            button.onclick = function() {
                resetButtons();

                // knapparnas ursprungliga style
                planetBtns.forEach((button) => {
                button.style.backgroundColor = "rgb(235, 235, 235)";
                button.style.color = "rgba(140, 118, 0, 1)";
                });

                // stylen på knapparna efter onklick
                this.style.backgroundColor = "rgba(142, 142, 142, 1)";
                this.style.color = "rgba(255, 214, 0, 1)";

                Promise.all(vehiclesUrl.map(url =>
                    fetch(url).then(res => {
                        if (!res.ok) {
                            // hoppar direkt till catch-funktionen när speciesUrl inte svarar
                            throw new Error('Något gick fel');
                        }
                        return res.json();
                    })
                ))
                .then(vehiclesDataArray => {
                    console.log(vehiclesDataArray);
                    // vi skapar en lista av element från userns 'vehicles' och lägger listan i html
                    const detailsBtnDiv = document.getElementById('detailsBtnList');
                    if (vehiclesDataArray.length === 0) {
                        detailsBtnDiv.innerHTML = 'No vehiclesinfo available';
                        } else {
                        detailsBtnDiv.innerHTML = ''; // Rensa innan vi lägger till nya element
                        vehiclesDataArray.forEach(vehiclesData => {
                            // Nu är vehiclesData ett objekt från arrayen
                            detailsBtnDiv.innerHTML += 
                            `<li>${vehiclesData.name}</li>
                            <li>Vehicle class: ${vehiclesData.vehicle_class}</li>
                            <li>Model: ${vehiclesData.model}</li>
                            <li>Max atmospheric speed: ${vehiclesData.max_atmosphering_speed}km/h</li>
                            <li>Crew: ${vehiclesData.crew}</li>
                            <li>Passengers: ${vehiclesData.passengers}</li>
                            <li>Manufacturer: ${vehiclesData.manufacturer}</li>
                            <li>Cost in credits: ${vehiclesData.cost_in_credits} imperial credits</li><br><br>`;
                        });
                    }
                })
                .catch(error => {
                    console.log('Ingen vehiclesinfo tillgänglig');
                    const detailsBtnList = document.getElementById('detailsBtnList');
                    detailsBtnList.innerHTML = '<p>No vehiclesinfo available</p>';                
                });
            }
        })

        // starships knappen
        starshipsBtns.forEach((button) => {
            button.onclick = function() {
                resetButtons();

                // knapparnas ursprungliga style
                planetBtns.forEach((button) => {
                button.style.backgroundColor = "rgb(235, 235, 235)";
                button.style.color = "rgba(140, 118, 0, 1)";
                });

                // stylen på knapparna efter onklick
                this.style.backgroundColor = "rgba(142, 142, 142, 1)";
                this.style.color = "rgba(255, 214, 0, 1)";

                Promise.all(starshipsUrl.map(url =>
                    fetch(url).then(res => {
                        if (!res.ok) {
                            // hoppar direkt till catch-funktionen när speciesUrl inte svarar
                            throw new Error('Något gick fel');
                        }
                        return res.json();
                    })
                ))
                .then(starshipsDataArray => {
                    console.log(starshipsDataArray);
                    // vi skapar en lista av element från userns 'starships' och lägger listan i html
                    const detailsBtnDiv = document.getElementById('detailsBtnList');
                    if (starshipsDataArray.length === 0) {
                        detailsBtnDiv.innerHTML = 'No starshipsinfo available';
                        } else {
                        detailsBtnDiv.innerHTML = ''; // Rensa innan vi lägger till nya element
                        starshipsDataArray.forEach(starshipsData => {
                            // Nu är starshipsData ett objekt från arrayen
                            detailsBtnDiv.innerHTML += 
                            `<li>${starshipsData.name}</li>
                            <li>Starship class: ${starshipsData.starship_class}</li>
                            <li>Model: ${starshipsData.model}</li>
                            <li>Length: ${starshipsData.length}m</li>
                            <li>Max atmospheric speed: ${starshipsData.max_atmosphering_speed}km/h</li>
                            <li>Hyperdrive rating: ${starshipsData.hyperdrive_rating}</li>
                            <li>Crew: ${starshipsData.crew}</li>
                            <li>Passengers: ${starshipsData.passengers}</li>
                            <li>Manufacturer: ${starshipsData.manufacturer}</li>
                            <li>Cost in credits: ${starshipsData.cost_in_credits} imperial credits</li><br><br>`;
                        });
                    }
                })
                .catch(error => {
                    console.log('Ingen starshipsinfo tillgänglig');
                    const detailsBtnList = document.getElementById('detailsBtnList');
                    detailsBtnList.innerHTML = '<p>No starshipsinfo available</p>';                
                });
            }
        })
    })

    .catch(error => console.log(error));
}