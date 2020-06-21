
import OperationManager from "./OperationManager.js";
import ValuesManager from "./ValuesManager.js";

const om = new OperationManager();
const vm = new ValuesManager();

class CalculatorManager {

  onClearEntry() {
    vm.resetDisplayVal();
    vm.setNewNum("");
  }

  onDelEntry() {
    vm.updateDisplayVal("del");
    vm.updateNewNum("del");
  }
  
  onDigitEntry(e) {
    const newDigit = e.target.textContent;
    if (!vm.isNum(newDigit)) return;
    vm.updateNewNum(newDigit);
    vm.updateDisplayVal(newDigit);
  }

  onDotEntry() {
    if (vm.getNewNum().includes(".")) {
      return;
    }
    vm.updateDisplayVal(".");
    vm.updateNewNum(".");
  }

  onEqualsEntry() {
    const operations = om.getOperations();
    const newNum = vm.getNewNum();

    if (operations.length === 0 || !newNum){
      return;
    }
    om.storeOperation("=", newNum);
    vm.setNewNum("");
    const finalResult = om.operate();
    vm.setDisplayVal(finalResult);
    vm.setNewNum(finalResult);
  }

  onOperatorEntry(e) {
    const operator = e.target.textContent;
    const newNum = vm.getNewNum();
    const lastEntry = vm.getDisplayVal().split("").pop();
    console.log(lastEntry);
    if (!vm.isNum(newNum) || !vm.isOperator(operator) || vm.isOperator(lastEntry)) {
      return;
    }
    if (operator !== "+" && operator !== "-" && !newNum) {
      return;
    }
    om.storeOperation(operator, newNum);
    vm.setNewNum("");
    vm.updateDisplayVal(operator);
  }
}

export default CalculatorManager;
