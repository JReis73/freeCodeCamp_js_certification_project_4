const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const checkInput = () => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
  if (userInput.value === ""){
    alert("Please provide a phone number");
  }else if (regex.test(userInput.value)){
    resultsDiv.innerHTML = "Valid US number: " + userInput.value;
  }else{
    resultsDiv.innerHTML = "Invalid US number: " + userInput.value;
  }
}

const clear = () => {
  resultsDiv.innerHTML = ""
}

checkBtn.addEventListener("click", checkInput);
clearBtn.addEventListener("click", clear);