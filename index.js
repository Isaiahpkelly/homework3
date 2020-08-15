// Create constant arrays for the four different types of characters
const lowerArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numberArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialArray = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', '{', ']', '}', '\\', '|', ';', ':', "'", '"', ',', '<', '.', '>', '/', '?'];

// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// This function handles the prompts and validation for the password length
function getPasswordLength() {
  var isValidLength = false; // Used to determine if user selected valid length
  var pwdLength = 0; // Initialize return value

  // This loop gets user input on password length and validates it
  while (!isValidLength) {
    pwdLength = prompt("How many characters would you like in your password (8-128)?");

    // If user presses cancel, end function and return 0
    if (!pwdLength) {
      return 0;
    }
    // otherwise, convert input to a number
    else {
      pwdLength = parseInt(pwdLength);
    }

    // Have to verify that it is a number and is between 8 and 128, inclusive
    isValidLength = (((typeof pwdLength) == "number") && (pwdLength >= 8) && (pwdLength <= 128));

    // If user entered something other than a number, or a number < 8 or > 128, ask if they want to continue
    if (!isValidLength) {
      // If user presses cancel, end function and return 0
      if (!confirm("That is not a valid password length. Continue?")) {
        return 0;
      }
    }
  } // while !isValidLength

  return pwdLength;
} // function getPasswordLength

function createPassword(pwdLength, hasLower, hasUpper, hasNumeric, hasSpecial) {
  var newPwd = ''; // Initialize return value
  var charArray = []; // Initialize list of possible characters

  // If user selected lowercase, add all of the letters
  if (hasLower) {
    charArray = charArray.concat(lowerArray);
  }

  // If user selected uppercase, add all of the letters
  if (hasUpper) {
    charArray = charArray.concat(upperArray);
  }

  // If user selected numbers, add all digits
  if (hasNumeric) {
    charArray = charArray.concat(numberArray);
  }

  // If user selected special characters, add them
  if (hasSpecial) {
    charArray = charArray.concat(specialArray);
  }

  // Add the specified number of characters to the password
  for (var i = 0; i < pwdLength; i++) {
    // Get random integer to index the charArray
    var arrayIndex = Math.floor(Math.random() * charArray.length);

    // Add character at the random position to the end of the password string
    newPwd = newPwd + charArray[arrayIndex];
  } // for loop

  return newPwd;
} // function createPassword

function generatePassword() {
  var hasSelection = false; // Used to ensure user selected at least one character type

  var pwdLength = getPasswordLength(); // Prompt user for password length

  // if pwdLength = 0 then the user quit without enter a valid length
  if (pwdLength !== 0) {
    // This loop gets user input on types of characters and validates
    while (!hasSelection) {
      var hasLower = confirm("Would you like to include lowercase characers?");
      var hasUpper = confirm("Woud you like to include uppercase characters?");
      var hasNumeric = confirm("Would you like to include numbers?");
      var hasSpecial = confirm("Would you like to include special characters?");

      hasSelection = (hasLower || hasUpper || hasNumeric || hasSpecial);

      // If user has not selected at least one type, confirm that they want to continue
      if ((!hasSelection) && (!confirm("You must have at least one type of character. Continue?"))) {
        return '';
      }
    } // while !hasSelection
  } // if pwdLenth <> 0

  return createPassword(pwdLength, hasLower, hasUpper, hasNumeric, hasSpecial);
} // function generatePassword

// Write password to the #password input
function writePassword() {
  passwordText.value = generatePassword();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);