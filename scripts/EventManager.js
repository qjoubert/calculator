
import CalculatorManager from "./CalculatorManager.js";
const cm = new CalculatorManager();

class EventManager {

  addAllEventListeners() {
    const clear = document.getElementById("clear");
    const dot = document.getElementById("dot");
    const del = document.getElementById("del");
    const digits = document.querySelectorAll(".digit");
    const equals = document.getElementById("equals");
    const operators = document.querySelectorAll(".operator");

    this.listen("click", clear, cm.onClearEntry);
    this.listen("click", dot, cm.onDotEntry);
    this.listen("click", del, cm.onDelEntry);
    this.listen("click", digits, cm.onDigitEntry);
    this.listen("click", equals, cm.onEqualsEntry);
    this.listen("click", operators, cm.onOperatorEntry);
    this.addWindowLoadEventListener();
  }

  listen(event, target, action) {
    if (target.length === undefined) {
      target.addEventListener(event, (e) => {
        action(e);
      })
    }
    else {
      target.forEach(elmt => {
        elmt.addEventListener(event, (e) => {
          action(e);
        })
      })
    }
  }

  addWindowLoadEventListener() {
    window.addEventListener("load", () => {
      sessionStorage.setItem("newNum", "");
      sessionStorage.setItem("operations", JSON.stringify([]));
    });
  }
}

export default EventManager;