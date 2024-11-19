const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=",
  "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

const button = document.querySelector(".generate_button");
const passwordField1 = document.querySelector(".password1");
const passwordField2 = document.querySelector(".password2");
const inputLength = document.querySelector(".input");
const wrongValue = document.getElementById("wrong_value");
const copiedPassword = document.querySelector(".copied");
const numberCheckbox = document.getElementById("switch_number");
const symbolCheckbox = document.getElementById("switch_symbols");

const filterNumbers = characters.filter((el) => isNaN(Number(el)));
const filterSymbols = characters.filter((el) => /[a-zA-Z0-9]/.test(el));
const onlyLetters = characters.filter((el) => /^[a-zA-Z]$/.test(el));


const generatePassword = () => {
  let result = [];
  for (let i = 0; i < checkLength(); i++) {
    
    if (numberCheckbox.checked === false && symbolCheckbox.checked === false) {
      let randomIndex = Math.floor(Math.random() * onlyLetters.length);
      result.push(onlyLetters[randomIndex]);
    } 
    else if (
      numberCheckbox.checked === false 
    ) {
      let randomIndex = Math.floor(Math.random() * filterNumbers.length);
      result.push(filterNumbers[randomIndex]);
    }  else if (symbolCheckbox.checked === false) {
      let randomIndex = Math.floor(Math.random() * filterSymbols.length);
      result.push(filterSymbols[randomIndex]);
    } 
    else {
      let randomIndex = Math.floor(Math.random() * characters.length);
      result.push(characters[randomIndex]);
    }
  }
  return result.join("");
};

const checkLength = () => {
  let lengthPassword = inputLength.value;

  if (lengthPassword === "") {
    wrongValue.style.opacity = "1";
    wrongValue.textContent = "Enter value";
    return null;
  } else if (lengthPassword < 5) {
    wrongValue.style.opacity = "1";
    wrongValue.textContent = "Value should be more than 3";
    return null;
  } else if (lengthPassword > 15) {
    wrongValue.style.opacity = "1";
    wrongValue.textContent = "The number of characters must not exceed 15";
    return null;
  } else {
    wrongValue.style.opacity = "0";
  }
  return lengthPassword;
};

button.addEventListener("click", () => {
  passwordField1.textContent = generatePassword();
  passwordField1.setAttribute("title","copy");
  passwordField2.textContent = generatePassword();
  passwordField2.setAttribute("title","copy");
});

function copyPassword(copyText) {
  navigator.clipboard.writeText(copyText.textContent);
  copiedPassword.textContent = `Copied to clipboard`;
  copiedPassword.style.display = "block";
  
  setTimeout(() => {
    copiedPassword.style.display = "none";
  }, 1000);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("password")) {
    copyPassword(event.target);
  }
});
