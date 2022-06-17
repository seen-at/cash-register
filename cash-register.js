let amountInCents = [
  ["PENNY", 1], ["NICKEL", 5], ["DIME", 10], 
  ["QUARTER", 25], ["ONE", 100], ["FIVE", 500], 
  ["TEN", 1000], ["TWENTY", 2000], ["ONE HUNDRED", 10000]
]
function checkCashRegister(price, cash, cid) {
  let amountToReturn = Math.round(cash * 100) - Math.round(price * 100);
  
// convert the contents of cid into key, value pairs
  let cashInDrawer = {};

  cid.forEach(item => {
    cashInDrawer[item[0]] = Math.round(item[1] * 100);
  })

// loop through amountInCents array to compare with amountToReturn
  let cashToGive = {};
  let index = amountInCents.length - 1;
  while (index >= 0 && amountToReturn > 0) {
    let moneyType = amountInCents[index][0];
    let moneyValue = amountInCents[index][1]

// only the contents in amountInCents smaller than the amountToReturn is extracted and passed to cashToGive
    if(amountToReturn - moneyValue > 0) {
      cashToGive[moneyType] = 0; 
      while(cashInDrawer[moneyType] > 0 && amountToReturn - moneyValue >= 0) {
// decrement the amount of cashInDrawer with corresponding cashInCents, decrement the amountToReturn, add the amount removed from cashInDrawer to cashToGive
        
        // console.log("amount to return =",amountToReturn, cashToGive)
        cashInDrawer[moneyType] -= moneyValue;
        cashToGive[moneyType] += moneyValue;
        amountToReturn -= moneyValue;
      }
    }
    index -= 1;
  }

  if (amountToReturn === 0) {
// check if the money in cashInDrawer is greater than the amountToReturn
    let isRegisterEmpty = true;
    Object.keys(cashInDrawer).forEach(moneyType => {
    if (cashInDrawer[moneyType] > 0) {
        isRegisterEmpty = false;
      }
    })

    let changeArray = [];
    if(isRegisterEmpty) {
      return {status: "CLOSED", change: cid}
    }
    else {
      // change cashToGive to an array and return the it in the desired object output format
    Object.keys(cashToGive).map(moneyType => {
      changeArray.push([moneyType, cashToGive[moneyType] / 100])
    })
    return {status: "OPEN", change: changeArray}
    }
  }
  
  return {status: "INSUFFICIENT_FUNDS", change: []}
}

let cid = [
  ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], 
  ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
  ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
  ]

let result = checkCashRegister(19.5, 20, cid);

console.log(result)
