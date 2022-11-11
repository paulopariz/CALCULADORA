const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // adiciona dígito na tela da calculadora
  addDigit(digit) {
    console.log(digit);
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processa todas as operações da calculadora
  processOperation(operation) {
    
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;


      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;


      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;


      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;


        
      case "DEL":
        this.processDelOperator();
        break;


      case "CE":
        this.processClearCurrentOperator();
        break;


      case "C":
        this.processClearOperator();
        break;


      case "=":
        this.processEqualOperator();
        break;

        
      default:
        return;
    }
  }

  // Alterar valores da tela da calculadora

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      
      if (previous === 0) {
        operationValue = current;
      }
      
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deletar um dígito

  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // limpar operação atual

  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpar todas as operações

  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //Processar uma operação

  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});



// Dark mode
function dark() {
  var element = document.body;
  element.classList.toggle("dark-mode");  


}