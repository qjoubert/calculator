
class ValuesManager {
  
  deleteLastChar(string) {
    let array = string.split("");
    array.pop();
    const processedString = array.join("");
    return processedString;
  }

  getDisplayVal() {
    return document.getElementById("display-val").value;
  }

  getNewNum() {
    return sessionStorage.getItem("newNum");
  }
  
  isNum(n) {
    return !isNaN(+n);
  }

  isOperator(operator) {
    return (
      operator === "+" ||
      operator === "-" ||
      operator === "*" ||
      operator === "/" ||
      operator === "%"
    );
  }

  isSafeChar(char) {
    const regex = /^[-\+\*\./%\d]+$/;
    return regex.test(char);
  }
  
  resetDisplayVal() {
    document.getElementById("display-val").value = "";
  }
  
  setDisplayVal(val) {
    document.getElementById("display-val").value = val;
  }

  setNewNum(n) {
    sessionStorage.setItem("newNum", n);
  }
  
  updateDisplayVal = (char) => {
    const displayVal = this.getDisplayVal();
    if (!this.isSafeChar(char) && char !== "del") {
      return;
    }
    const val =
      char === "del" ?
      this.deleteLastChar(displayVal) :
      displayVal + char;
  
    this.setDisplayVal(val);
  }
  
  updateNewNum(digit) {
    const newNum = this.getNewNum();
    const n =
      digit === "del" ?
      this.deleteLastChar(newNum) :
      newNum + digit;
    this.setNewNum(n);
  }
}

export default ValuesManager;
