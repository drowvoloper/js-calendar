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
let indexYear = 1;
let chosenYear = currentYear;

// Elements which will be modified
const cellsGrid = document.getElementById("cellsGrid");
const rows = document.getElementsByClassName("grid-nums");

// --> USEFUL FUNCTIONS YAYYYYYYYYYYY!! <--
// move lists when the value is changed
const moveList = (element, value) => element.style.transform = "translateY(" + (-50 * value) + "px)";

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

// Get the first day of the chosen month!
const firstDay = (month, year) => {
  return (new Date(year, month).getDay());
};

// Check days in a month
const daysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();

// Show the chosen month
const showMonth = (month, year) => {
  clearMonth();
  const nDays = daysInMonth(month, year);
  const first = firstDay(month, year);
  let lastRow;
  let i = 0; // day in a week
  let x = 1 - first; // day in a month

  // It's time to generate cells!
  while (x <= nDays || i < 7)
    {
      if (i == 7) i = 0;
      if (i == 0) // if it's starting a new week, create a new row
        {
          let createRow = document.createElement("div");
          createRow.classList.add("grid-row", "grid-nums");
          cellsGrid.appendChild(createRow);
        }
      // create cells for each day and add them to the last row created
      lastRow = cellsGrid.lastChild;
      let createCell = document.createElement("div");
      createCell.classList.add("grid-cell");
      if (x > 0 && x <= nDays)
        {
          if (x == currentDate &&
              month == currentMonth &&
              year == currentYear)
            {
              createCell.classList.add("today");
            }
          createCell.classList.add("day-num");
          createCell.innerText = x;
        }
      lastRow.appendChild(createCell);
      x++;
      i++;
    }
};

// Clear the previous month when the dropdown is changed
const clearMonth = () => {
  while (rows.length > 0)
      rows[0].parentNode.removeChild(rows[0]);
};

// ############################# MONTHS #############################
// Style lists to show the default(or current) value
// months list
moveList(monthDropdown, chosenMonth);
months[currentMonth].classList.add("current");

// We show the current month and year by default
showMonth(chosenMonth, chosenYear);

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
      showMonth(chosenMonth, chosenYear);
    }
  });
}

// EventListener for next and prev buttons
// month changes when they are clicked
prevBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) closeList(monthDropdown, months, chosenMonth);
  if(chosenMonth > 0)
  {
    changeCurrent(monthDropdown, months, chosenMonth, --chosenMonth);
    showMonth(chosenMonth, chosenYear);
  }
});
nextBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) closeList(monthDropdown, months, chosenMonth);
  if(chosenMonth < 11)
  {
    changeCurrent(monthDropdown, months, chosenMonth, ++chosenMonth);
    showMonth(chosenMonth, chosenYear);
  }
});



// ############################# YEARS #############################
// We add previous, current and the next 5 years to the "year" dropdown list
let i = -1;
while (i <= 5)
  {
    let optionYear = document.createElement("li");
    optionYear.innerText = currentYear + i;
    optionYear.value = i + 1;
    optionYear.year = currentYear + i;
    optionYear.classList.add("year");
    if (optionYear.value == indexYear)
      optionYear.classList.add("current");
    yearDropdown.appendChild(optionYear);
    i++;
  }
// move list to show the current(default) year
moveList(yearDropdown, indexYear);

// add Event listeners to change year
for (let i = 0; i < years.length; i++)
{
  years[i].addEventListener("click", () => {
    // show the list when current/showed year is clicked
    if (years[i].value == indexYear && !yearDropdown.classList.contains("open"))
      openList(yearDropdown, years, indexYear);
    // and move the list when a different year is clicked
    else {
      closeList(yearDropdown, years, indexYear);
      changeCurrent(yearDropdown, years, indexYear, years[i].value);
      indexYear = years[i].value;
      chosenYear = years[i].year;
      showMonth(chosenMonth, chosenYear);
    }
  });
}
