// Get the date (year, month and day)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

let chosenMonth = currentMonth;
let chosenYear = currentYear;

const moveList = (element, value) => {
  element.style.transform = "translateY(" + (-80 * value) + "px)";
};

// Style lists to show the default(or current) value
// months list
const monthDropdown = document.getElementById("chooseMonth");
moveList(monthDropdown, chosenMonth);
const months = document.getElementsByClassName("month");

for (let i = 0; i < months.length; i++)
{
  months[i].addEventListener("click", () => {
    chosenMonth = months[i].value;
    moveList(monthDropdown, chosenMonth);
  });
}

// EventListener for next and prev buttons
// month changes when they are clicked
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  if(chosenMonth > 0) moveList(monthDropdown, --chosenMonth)
});
nextBtn.addEventListener("click", () => {
  if(chosenMonth < 11) moveList(monthDropdown, ++chosenMonth)
});
