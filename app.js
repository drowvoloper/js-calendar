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
months[currentMonth].classList.add("current-month");

const showMonths = index => months[index].style.opacity = "1";

for (let i = 0; i < months.length; i++)
{
  months[i].addEventListener("click", () => {
    // show the list when current/showed month is clicked
    if (months[i].value == chosenMonth && !monthDropdown.classList.contains("open"))
    {
      monthDropdown.classList.add("open");
      for (let j = 0; j < months.length; j++)
        months[j].classList.add("current-month");
    }
    // and move the list when a different month is clicked
    else {
      monthDropdown.classList.remove("open");
      for (let j = 0; j < months.length; j++)
        months[j].classList.remove("current-month");
      //months[chosenMonth].classList.remove("current-month");
      chosenMonth = months[i].value;
      months[chosenMonth].classList.add("current-month");
      moveList(monthDropdown, chosenMonth);
    }
  });
}

// EventListener for next and prev buttons
// month changes when they are clicked
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  monthDropdown.classList.remove("open");
  for (let j = 0; j < months.length; j++)
    months[j].classList.remove("current-month");
  if(chosenMonth > 0)
  {
    months[chosenMonth].classList.remove("current-month");
    moveList(monthDropdown, --chosenMonth);
    months[chosenMonth].classList.add("current-month");
  }
});
nextBtn.addEventListener("click", () => {
  monthDropdown.classList.remove("open");
  for (let j = 0; j < months.length; j++)
    months[j].classList.remove("current-month");
  if(chosenMonth < 11)
  {
    months[chosenMonth].classList.remove("current-month");
    moveList(monthDropdown, ++chosenMonth);
    months[chosenMonth].classList.add("current-month");
  }
});
