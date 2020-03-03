// Get the date (year, month and day)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

// declarate elements
const monthDropdown = document.getElementById("chooseMonth");
const months = document.getElementsByClassName("month");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Set default values
let chosenMonth = currentMonth;
let chosenYear = currentYear;

// --> USEFUL FUNCTIONS YAYYYYYYYYYYY!! <--
// move lists when the value is changed
const moveList = (element, value) => element.style.transform = "translateY(" + (-80 * value) + "px)";

// show / hide months list
const hideMonths = () => {
  monthDropdown.classList.remove("open");
  for (let j = 0; j < months.length; j++)
    if (j != chosenMonth) months[j].classList.remove("current-month");
};
const showMonths = () => {
  monthDropdown.classList.add("open");
  for (let j = 0; j < months.length; j++)
    if (j != chosenMonth) months[j].classList.add("current-month");
};

// Style lists to show the default(or current) value
// months list
moveList(monthDropdown, chosenMonth);
months[currentMonth].classList.add("current-month");

// addEventListener to each element of the months list
for (let i = 0; i < months.length; i++)
{
  months[i].addEventListener("click", () => {
    // show the list when current/showed month is clicked
    if (months[i].value == chosenMonth)
      showMonths();
    // and move the list when a different month is clicked
    else {
      hideMonths();
      months[chosenMonth].classList.remove("current-month");
      chosenMonth = months[i].value;
      months[chosenMonth].classList.add("current-month");
      moveList(monthDropdown, chosenMonth);
    }
  });
}

// EventListener for next and prev buttons
// month changes when they are clicked
prevBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) hideMonths();
  if(chosenMonth > 0)
  {
    months[chosenMonth].classList.remove("current-month");
    moveList(monthDropdown, --chosenMonth);
    months[chosenMonth].classList.add("current-month");
  }
});
nextBtn.addEventListener("click", () => {
  if (monthDropdown.classList.contains("open")) hideMonths();
  if(chosenMonth < 11)
  {
    months[chosenMonth].classList.remove("current-month");
    moveList(monthDropdown, ++chosenMonth);
    months[chosenMonth].classList.add("current-month");
  }
});
