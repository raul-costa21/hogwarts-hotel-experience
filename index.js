// Intro animation
$(".home-titles").fadeIn(2500);
$(".navbar").fadeIn(2500);

// Activities animation
var actAnimation = 0;

// actAnimation 1
$("#library-img").addClass("order-2 offset-3");
function firstAnimation() {
  $("#library").fadeOut(250).fadeIn(250);
  setTimeout(function () {
    $("#library-img").removeClass("order-2 offset-3");
  }, 251);
}

// actAnimation 2
$("#gastronomy").removeClass("justify-content-end");
$("#gastronomy-text").addClass("order-2");
function secondAnimation() {
  $("#gastronomy").fadeOut(250).fadeIn(250);
  setTimeout(function () {
    $("#gastronomy").addClass("justify-content-end");
    $("#gastronomy-text").removeClass("order-2");
  }, 251);
}

// actAnimation 3
$("#train-img img").attr("src", "images/potions.jpg");
$("#potions-img img").attr("src", "images/train.jpg");
function thirdAnimation() {
  $("#train-img").fadeOut(250).fadeIn(250);
  $("#potions-img").fadeOut(250).fadeIn(250);
  setTimeout(function () {
    $("#train-img img").attr("src", "images/train.jpg");
    $("#potions-img img").attr("src", "images/potions.jpg");
  }, 251);
}

// Activities animation triggers when scroll bar goes bellow the h2
var h2margin = parseFloat($(".activities-title").css("margin").slice(8, 15)) * 1.5;

$(window).scroll(function () {
  if ($(window).scrollTop() > $(".activities-title").offset().top - h2margin && actAnimation == 0) {
    firstAnimation();
    actAnimation++;
  }
  if ($(window).scrollTop() > $("#library").offset().top && actAnimation == 1) {
    secondAnimation();
    actAnimation++;
  }
  if ($(window).scrollTop() > $("#gastronomy").offset().top && actAnimation == 2) {
    thirdAnimation();
    actAnimation++;
  }
});

// Testimonials, slider animation
// Select all h3 and h4

var testNames = $(".no-display h4");
var testTestimonials = $(".no-display h3");

// Check if button press
var slideNumber = 0;
$(".slider-show h3").text($(testTestimonials[slideNumber]).text());
$(".slider-show h4").text($(testNames[slideNumber]).text());

$(".arrow-img-2").click(function () {
  animeSlide("left");
  slideNumber++;
  setTimeout(function () {
    slideNumber = checkSlide(slideNumber);
  }, 1500);
});

$(".arrow-img-1").click(function () {
  animeSlide("right");
  slideNumber--;
  setTimeout(function () {
    slideNumber = checkSlide(slideNumber);
  }, 1500);
});

function checkSlide(slideNumber) {
  if (slideNumber > 2 || slideNumber < -2) {
    slideNumber = 0;
  }
  if (slideNumber <= 2 && slideNumber >= 0) {
    $(".slider-show h3").text($(testTestimonials[slideNumber]).text());
    $(".slider-show h4").text($(testNames[slideNumber]).text());
    $(".testimonials-img").attr("src", "images/person" + slideNumber + ".jpg");
  } else if (slideNumber >= -2) {
    $(".slider-show h3").text($(testTestimonials[Math.abs(slideNumber)]).text());
    $(".slider-show h4").text($(testNames[Math.abs(slideNumber)]).text());
    $(".testimonials-img").attr("src", "images/person" + Math.abs(slideNumber) + ".jpg");
  }
  return slideNumber;
}

function animeSlide(side) {
  var awaitTime = (sec) =>
    new Promise((resolve) => {
      var milSec = 1000 * sec;
      setTimeout(resolve, milSec);
    });

  awaitTime(0)
    .then(() => {
      $("#testimonials h3").addClass(`test-anime-1-${side}`);
      $(".testimonials-img").css("animation-play-state", "paused");
      return awaitTime(0.5);
    })
    .then(() => {
      $("#testimonials h3").addClass(`test-anime-2-${side}`);
      $(".slider-show").fadeOut(1010);
      return awaitTime(1);
    })
    .then(() => {
      $("#testimonials h3").removeClass(`test-anime-1-${side} test-anime-2-${side}`);
      $(".testimonials-img").css("animation-play-state", "running");
      $(".slider-show").fadeIn(1000);
    });
}

// Form
// Multiple functions that get the input value and then copy to the letter, this functions are call and their return values save when an input in the form happens

formNames = () => {
  let fName = $("#fName").val();
  $("#letterFName").text(fName);

  let lName = $("#lName").val();
  $("#letterLName").text(lName);

  return [fName, lName];
};

formHouse = () => {
  let houses = $(".radio-form div input");
  let houseSelected = houses.filter(":checked").attr("id");
  $("#letterHouse").text($(`#label-${houseSelected}`).text());

  return houseSelected;
};

formNumPeople = () => {
  let numberPeople = $("#nPessoas option:selected").text();
  if (numberPeople == "One") {
    $("#letterPeople").text(`${numberPeople} person`);
  } else {
    $("#letterPeople").text(`${numberPeople} people`);
  }

  return numberPeople;
};

formDates = () => {
  // Dates in unix timestamp
  let currentDate = Date.now();
  let checkInDate = new Date($("#data1").val()).getTime();
  let checkOutDate = new Date($("#data2").val()).getTime();

  // Dates in dd/mm/yyyy format
  let dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  let checkIn = new Date(checkInDate).toLocaleString("pt-PT", dateOptions);
  let checkOut = new Date(checkOutDate).toLocaleString("pt-PT", dateOptions);

  $("#letterDate").text(checkIn);
  $("#letterDate2").text(checkOut);

  return [currentDate, checkInDate, checkOutDate];
};

formActivities = () => {
  let activitiesChosen = "";
  let activitiesNumber = 0;
  for (let i = 1; i < 5; i++) {
    let chosenAct = $(`#check-${i}`);
    if (chosenAct.prop("checked") == true) {
      activitiesNumber += 1;
      if (activitiesChosen === "") {
        activitiesChosen += $(`#labelCheck-${i}`).text();
      } else {
        activitiesChosen += `, ${$(`#labelCheck-${i}`).text()}`;
      }
    }
  }
  $("#letterActiv").text(activitiesChosen);

  return activitiesNumber;
};

formCalcPrice = (checkInDate, checkOutDate, activitiesNumber, numberPeople) => {
  // Calcular o preço mediantes n de pessoas e atividades seleccioandase nº de dias
  // person = 100; activity = 50; day = 100

  let priceAct = 50 * activitiesNumber;
  let pricePerson = 0;

  // convert milseconds to days (1000*60*60*24)
  let priceDay = ((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)) * 100;

  switch (numberPeople) {
    case "One":
      pricePerson = 100;
      break;
    case "Two":
      pricePerson = 200;
      break;
    case "Three":
      pricePerson = 300;
      break;
    case "Four":
      pricePerson = 400;
      break;
  }

  let totalCost = priceAct + priceDay + pricePerson;
  $("#letterMoney").text(`${totalCost}`);

  return totalCost;
};

formSubmit = (fName, lName, houseSelected, currentDate, checkInDate, checkOutDate, totalCost) => {
  // If every input has valid date when submit button alert(ok) else alert(error)
  let alertMessage = "";
  let everythingOk = 0;

  if (!fName) {
    alertMessage += "Please tell us your first name\n";
  } else {
    everythingOk++;
  }
  if (!lName) {
    alertMessage += "Please tell us your last name\n";
  } else {
    everythingOk++;
  }
  if (!houseSelected) {
    alertMessage += "Please select the room decoration\n";
  } else {
    everythingOk++;
  }

  let secInYear = 1000 * 60 * 60 * 24 * 365;

  if (currentDate >= checkInDate || currentDate >= checkOutDate) {
    alertMessage += `Invalid Date: check-in/check-out date cannot be prior to the current date`;
  } else if (checkInDate >= checkOutDate) {
    alertMessage += `Invalid Date: check-out date cannot be prior to the check-in`;
  } else if (checkInDate >= currentDate + secInYear || checkOutDate >= currentDate + secInYear) {
    alertMessage += "Bookings cannot be made 1 year in advance";
  } else if (!$("#data1").val() || !$("#data2").val()) {
    alertMessage += "Please select a date for your reservation";
  } else {
    everythingOk++;
  }

  if (everythingOk == 4) {
    alertMessage = `Reservation successfully made!\nThe price of your tuition will be of ${totalCost}$ !\nThank you very much.`;
  }

  alert(alertMessage);
};

// Create empty variables, tha are going to store the return values of the functions

let [fName, lName] = [];
let houseSelected = "";
let numberPeople = "";
let [currentDate, checkInDate, checkOutDate] = [];
let activitiesNumber = "";
let totalCost = 0;

// Everytime a input happens all of this functions are trigger

$("#form").on("input", () => {
  [fName, lName] = formNames();
  houseSelected = formHouse();
  numberPeople = formNumPeople();
  [currentDate, checkInDate, checkOutDate] = formDates();
  activitiesNumber = formActivities();
  totalCost = formCalcPrice(checkInDate, checkOutDate, activitiesNumber, numberPeople);
});

// When user clicks confirm reservation, we check if the mandatory fields are correct (if used inside the #form input above, the alert message is display for each time a input is made)
$(".u-f-buttom").on("click", () => {
  formSubmit(fName, lName, houseSelected, currentDate, checkInDate, checkOutDate, totalCost);
});
