import { Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  numToConvert = "111e";

  currentBase = 16;
  baseToConvert = 10;
  baseToConvertPublic = 10;

  result: string[] = [];
  resultPlaceValues: string[] = [];

  zoom = 1;

  log: string[] = []; //holds all items in the log so we can access them later
  logOut(text: string)
  { console.log(text); this.log.push(text); };

  convertNumbers()
  {
    const letterIndexString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterIndex = Array.from(letterIndexString);

    //we convert the numToConvert into deciaml so it is easy to work with
    //each number in this array has a place value, e.g. if the number is [4, 5] and is in base 10: we do 4 * (10^(1)) + 5 * (10^(0)), which gives us 45
    var numToConvertArray = Array.from(String(this.numToConvert)) ;
    //if the user is trying to input a hex number there will be strings in the number, we need to convert those strings to numbers using the letterIndex
    var i = 0;
    while (i != numToConvertArray.length)
    {
      numToConvertArray[i] = String(letterIndexString.indexOf(numToConvertArray[i].toUpperCase()));
      i += 1;
    }
    var placeValues: number[] = [];

    i = 0;
    while (i != numToConvertArray.length)
    { placeValues.unshift(Math.pow(this.currentBase, i)); i += 1; } //creates the placeValue array, for example is base 2 would be: [8, 4, 2, 1]

    var deciamlNum = 0;
    //now we just match each character in the numToConvertArray with the placeValues array
    i = 0;
    while (i != numToConvertArray.length)
    { deciamlNum += Number(numToConvertArray[i]) * placeValues[i]; i += 1; }

    //once we have the decimalNum we have to convert this to the wanted base, here are the steps:
    //1: start with i = 0, keep increasing until baseToConvert^(i) > decimalNum, then subtract 1 from i to get the starting placeValue
    //2: once we have the starting place value we set a = 0, and keep increasing a until baseToConvert^(i) * a > decimalNum, then subtract 1 from a, which gives us the actual digit
    //3: subtract baseToConvert^(i) * a from the decimal number, and repeat until decimalNumber == 0

    var startingPlaceValue = 0;
    while (Math.pow(this.baseToConvert, startingPlaceValue) <= deciamlNum)
    { startingPlaceValue += 1; }

    var returnNumList: number[] = [];
    while (deciamlNum != 0)
    {
      if (startingPlaceValue != 0) { startingPlaceValue -= 1; }

      var digit = 0;
      while (Math.pow(this.baseToConvert, startingPlaceValue) * digit <= deciamlNum)
      { digit += 1; }
      if (digit != 0) { digit -= 1; }
      
      //now we just add the digit to the list and then subtract it from decimalNum
      returnNumList.push(digit);
      deciamlNum -= Math.pow(this.baseToConvert, startingPlaceValue) * digit;
    }
    //at the end we check if the startingPlaceValue is != 0, if it is true it means that the number is not finished but it just needs a few 0s at the end
    while (startingPlaceValue != 0) { returnNumList.push(0); startingPlaceValue -= 1; }
    
    //finally we need to convert the higher numbers into strings, for example 60 in base 10 is 3C in base 16, however in the returnNumList it will be [3, 12] so we need to convert the 12 into C
    this.result = [];
    for (const n in returnNumList)
    { this.result.push(letterIndex[returnNumList[n]]); }

    if (parseInt(this.numToConvert) == 0) //if the decimalNum is 0 then the function won't give anything into the result
    { this.result = ["0"]; }
    this.baseToConvertPublic = this.baseToConvert; //since baseToConvert is connected to the result display with ngModel, it would change while the user is inputting the data, which does not look nice, so this one only gets updated whenever the user clicks convert
  };

  constructor() { }
}
