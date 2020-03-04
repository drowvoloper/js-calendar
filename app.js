// Get the date (year, month and day)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

// declarate elements
const yearDropdown = document.getElementById("chooseYear");
const monthDropdown = document.getElementById("chooseMonth");
const months = document.getElementsByClassName("month");
const years = document.getElementsByClassName("year");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Set default values
let chosenMonth = currentMonth;
let chosenYear = 1;

// --> USEFUL FUNCTIONS YAYYYYYYYYYYY!! <--
// move lists when the value is changed
const moveList = (element, value) => element.style.transform = "translateY(" + (-80 * value) + "px)";

// show / hide lists
const openList = (list, elements, current) => {
  list.classList.add("open");
  for (let j = 0; j < elements.length; j++)
    if (j != current) elements[j].classList.add("current");
};
const closeList = (list, elements, current) => {
  list.classList.remove("open");
  for (let j = 0; j < elements.length; j++)
    if (j != current) elements[j].classList.remove("current");
};

// change to show the currentValue
const changeCurrent = (list, elements, current, next) => {
  elements[current].classList.remove("current");
  elements[next].classList.add("current");
  moveList(list, next);
}

// ############################# MONTHS #############################
// Style lists to show the default(or current) value
// months list
moveList(monthDropdown, chosenMonth);
months[currentMonth].classList.add("current");

// addEventListener to each element of the months list
for (let i = 0; i < months.length; i++)
{
  months[i].addEventListener("click", () => {
    // show the list when current/showed month is clicked
    if (months[i].value == chosenMonth && !monthDropdown.classList.contains("open"))
      openList(monthDropdown, months, chosenMonth);
    // and move the list when a different month is clicked
    else {
      closeList(monthDropdown, months, chosenMonth);
      changeCurrent(monthDropdown, months, chosenMonth, months[i].value);
      chosenMonth = months[i].value;
    }
  });
}

// EventListener for next and prev buttons
// month changes when they are clicked
prevBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) closeList();
  if(chosenMonth > 0)
    changeCurrent(monthDropdown, months, chosenMonth, --chosenMonth);
});
nextBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) closeList();
  if(chosenMonth < 11)
    changeCurrent(monthDropdown, months, chosenMonth, ++chosenMonth);
});

// ############################# YEARS #############################
// We add previous, current and the next 5 years to the "year" dropdown list
let i = -1;
while (i <= 5)
  {
    let optionYear = document.createElement("li");
    optionYear.innerText = currentYear + i;
    optionYear.value = i + 1;
    optionYear.classList.add("year");
    if (optionYear.value == chosenYear)
      optionYear.classList.add("current");
    yearDropdown.appendChild(optionYear);
    i++;
  }
// move list to show the current(default) year
moveList(yearDropdown, chosenYear);

// add Event listeners to change year
for (let i = 0; i < years.length; i++)
{
  years[i].addEventListener("click", () => {
    // show the list when current/showed year is clicked
    if (years[i].value == chosenYear && !yearDropdown.classList.contains("open"))
      openList(yearDropdown, years, chosenYear);
    // and move the list when a different year is clicked
    else {
      closeList(yearDropdown, years, chosenYear);
      changeCurrent(yearDropdown, years, chosenYear, years[i].value);
      chosenYear = years[i].value;
    }
  });
}
