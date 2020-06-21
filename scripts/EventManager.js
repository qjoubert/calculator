
import CalculatorManager from "./CalculatorManager.js";
const cm = new CalculatorManager();

class EventManager {

  addAllEventListeners() {
    this.addClearEventListener();
    this.addDotEventListener();
    this.addDelEventListener();
    this.addDigitEventListener();
    this.addEqualsEventListener();
    this.addOperatorEventListener();
    this.addWindowLoadEventListener();
  }

  addClearEventListener() {
    const clear = document.getElementById("clear");
    clear.addEventListener("click", cm.onClearEntry);
  }

  addDotEventListener() {
    const dot = document.getElementById("dot");
    dot.addEventListener("click", cm.onDotEntry);
  }

  addDelEventListener() {
    const del = document.getElementById("del");
    del.addEventListener("click", cm.onDelEntry);
  }

  addDigitEventListener() {
    const digits = document.querySelectorAll(".digit");
    digits.forEach(digit => {
      digit.addEventListener("click", (e) => {
        cm.onDigitEntry(e);
      });
    });
  }

  addEqualsEventListener() {
    const equals = document.getElementById("equals");
    equals.addEventListener("click", cm.onEqualsEntry);
  }

  addOperatorEventListener() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operator => {
      operator.addEventListener("click", (e) => {
        cm.onOperatorEntry(e);
      });
    });
  }

  addWindowLoadEventListener() {
    window.addEventListener("load", () => {
      sessionStorage.setItem("newNum", "");
      sessionStorage.setItem("operations", JSON.stringify([]));
    });
  }
}

export default EventManager;