
import MathManager from "./MathManager.js";

class OperationManager {

  deleteOperation(index) {
    const operations = this.getOperations();
    operations.splice(index, 1);
    this.setOperations(operations);
  }

  getOperations() {
    return JSON.parse(sessionStorage.getItem("operations"));
  }
  
  getOpWithPrecedence(operations) {
    return (
      operations.findIndex((operation) => {
        return(
          operation.operator === "*" ||
          operation.operator === "/" ||
          operation.operator === "%"
        );
      })
    );
  }
  
  operate() {
    while (this.getOperations().length > 0) {
      if (this.getOpWithPrecedence(this.getOperations()) !== -1) {
        const opIndex = this.getOpWithPrecedence(this.getOperations());
        const result = this.processOperation(opIndex);
        this.updateOperations(opIndex-1, opIndex+1, result);
        this.deleteOperation(opIndex);
        if (this.getOperations().length === 0) {
          return +result.toFixed(2);
        }
      }
      else if (this.getOperations().length > 1) {
        const result = this.processOperation(0);
        this.updateOperations(-1, 1, result);
        this.deleteOperation(0);
      }
      else if (this.getOperations().length === 1) {
        const finalResult = this.processOperation(0);
        this.deleteOperation(0);
        return +finalResult.toFixed(2);
      }
    }
  }
  
  processOperation(index) {
    const mm = new MathManager();
    const operationProcessors = {
      "+": mm.add,
      "-": mm.substract,
      "*": mm.multiply,
      "/": mm.divide,
      "%": mm.remainder
    }
    const operations = this.getOperations();
    const operation = operations[index];
    const operator = operation.operator;
    const x = operation.x;
    const y = operation.y;
  
    const result = operationProcessors[operator](x, y);
    return result;
  }

  setOperations(operations) {
    sessionStorage.setItem("operations", JSON.stringify(operations));
  }
  
  storeOperation(operator, number) {
    let operations = this.getOperations();
    if (operations.length > 0) {
      operations[operations.length-1].y = +number;
    }
    if (operator !== "=") {
      const newOperation = {
        operator,
        x : +number
      };
      operations.push(newOperation);
    }
    this.setOperations(operations);
  }

  updateOperations(prevOpIndex, nextOpIndex, n) {
    let operations = this.getOperations();
    if (prevOpIndex >= 0) {
      operations[prevOpIndex].y = n;
      this.setOperations(operations);
    }
    if (nextOpIndex <= operations.length-1) {
      operations[nextOpIndex].x = n;
      this.setOperations(operations);
    }
  }
}

export default OperationManager;
