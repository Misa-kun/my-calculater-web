const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete');
const allClearButtons = document.querySelector('[data-all-clear]');

const currentScreenTextElement = document.querySelector('[data-operand-current]');
const previousScreenTextElement = document.querySelector('[data-operand-previous]');

class Calculater{
    constructor(currentScreenTextElement, previousScreenTextElement){
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    flushOperator(operation){
        if (this.currentOperand === "") return;
        if (this.currentOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        //if (isNuN(previous) || isNuN(current)) return;
        switch(this.operation) {
            case "+":
                computation = previous + current;
            break;
            case "-":
                computation = previous - current;
            break;
            case "x":
                computation = previous * current;
            break;
            case "÷":
                computation = previous / current;
            break;

            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}

const calculater = new Calculater(
    currentScreenTextElement, 
    previousScreenTextElement,
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculater.appendNumber(button.innerText);
        calculater.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculater.flushOperator(button.innerText);
        calculater.updateDisplay();
    });
})

equalsButtons.addEventListener("click", () =>{
    calculater.compute();
    calculater.updateDisplay();
});

allClearButtons.addEventListener("click", ()=>{
    calculater.clear();
    calculater.updateDisplay();
});

deleteButtons.addEventListener("click", () =>{
    calculater.delete();
    calculater.updateDisplay();
});