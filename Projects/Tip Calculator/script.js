
// bill input, tip input, number of people div, and per person total div

const TotalBill = document.getElementById("billTotalinput");
const TotalTip = document.getElementById("tipInput");
const NumberofPersonsDiv = document.getElementById("numberofPeople");
const perPersonTotalDiv = document.getElementById("perpersonTotal");

// Get number of people from number of people div
let numberofPeople = Number(NumberofPersonsDiv.innerText);

// ** Calculate the total bill per person **
const calculateBill = () => {
    // get bill from user input & convert it into a number
    const bill = Number(TotalBill.value);
  
    // get the tip from user & convert it into a percentage (divide by 100)
    const tipPercent = Number(TotalTip.value) / 100
  
    // get the total tip amount
    const tipAmount = bill * tipPercent
  
    // calculate the total (tip amount + bill)
    const total = tipAmount + bill;
  
    // calculate the per person total (total divided by number of people)
    const perperson = total / numberofPeople;
  
    // update the perPersonTotal on DOM & show it to user
    perPersonTotalDiv.innerText = `₹${perperson.toFixed(2)}`
  }
  
  // ** Splits the bill between more people **
  const increasePeople = () => {
    // increment the amount of people
    numberofPeople += 1;
  
    // update the DOM with the new number of people
    NumberofPersonsDiv.innerText = numberofPeople;
  
    // calculate the bill based on the new number of people
    calculateBill();
  }
  
  // ** Splits the bill between fewer people **
  const decreasePeople = () => {
    // guard clause
    // if amount is 1 or less simply return
    // (a.k.a you can't decrease the number of people to 0 or negative!)
    if(numberofPeople <= 1) {
        return
    }
    
    // decrement the amount of people
    numberofPeople -= 1
  
    // update the DOM with the new number of people
    NumberofPersonsDiv.innerText = numberofPeople;
  
    // calculate the bill based on the new number of people
    calculateBill()
  }