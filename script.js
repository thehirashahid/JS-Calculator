let operators = ["+", "-", "/", "*"];
let input = null;
let history = null;
let operator = null;
let equal = null;
let dot = null;
let firstNum = true;
let numbers = [];
let operator_value;
let last_button;
let calc_operator;
let total;

function button_value(value) {
    document.getElementById("input").innerText = value;
}


function calculate(num1, num2, operator) {
    if (operator === "+") {
        total = (parseFloat)(num1) + (parseFloat)(num2)
    }
    else if (operator === "-") {
        total = (parseFloat)(num1) - (parseFloat)(num2)
    }
    else if (operator === "*") {
        total = (parseFloat)(num1) * (parseFloat)(num2)
    }
    else if (operator === "/") {
        total = (parseFloat)(num1) / (parseFloat)(num2)
    }
    else {
        if (total == input.innerText) {
            return total
        }
        else {
            return input.innerText
        }
    }
    if (!Number.isInteger(total)) {
        total = total.toPrecision(4);
    }
    return parseFloat(total);
}

//////////////// clear ////////////////////
function clear_button() {
    window.location.reload()
}

//////////////// BackSpace ////////////////////
function backspace() {
    input = document.getElementById("input");
    let last_num = input.innerText;
    last_num = last_num.slice(0, -1)
    input.innerText = last_num
    if (input.innerText.length == 0) {
        input.innerText = 0
        firstNum = true
    }
}

//////////////// Exponential ////////////////////
function exponential_button() {
    input = document.getElementById("input");
    let result = Math.exp(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

//////////////// sin ////////////////////
function sin_button() {
    input = document.getElementById("input");
    let result = Math.sin(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

//////////////// cos ////////////////////
function cos_button() {
    input = document.getElementById("input");
    let result = Math.cos(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

//////////////// sin ////////////////////
function tan_button() {
    input = document.getElementById("input");
    let result = Math.tan(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

//////////////// Square-Root ////////////////////
function square_root() {
    input = document.getElementById("input");
    let result = Math.sqrt(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

//////////////// Power-Of ////////////////////
function power_of() {
    input = document.getElementById("input");
    let result = Math.pow(input.innerText);
    result = result.toPrecision(4);
    input.innerText = result
    numbers.push(result);
}

////////////////////////// Clear-Entry ///////////////////////
function clear_entry() {
    input = document.getElementById("input");
    if (numbers.length > 0 && typeof last_operator != "undefined") {
        input.innerText = 0
        numbers = []
        numbers.push(numbers[0])
        firstNum = true;
    }
}

function button_number(button) {
    operator = document.getElementsByClassName("operator");
    input = document.getElementById("input");
    newOp = document.getElementById("newOp").value;
    history = document.getElementById("history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    last_button = button;


    // if button is not an operator or = sign
    if (!operators.includes(button) && button != equal && button != newOp) {
        // if it is the first button clicked
        if (firstNum) {
            // and it's a dot, show 0.
            if (button == dot) {
                input.innerText = "0" + dot;
            }
            // else clear input and show the number
            else {
                input.innerText = button;
            }
            firstNum = false;
        }
        else {
            // return if the input value is 0
            if (input.innerText.length == 1 && input.innerText == 0) {
                if (button == dot) {
                    input.innerText += button;
                }
                return;
            }
            // return if the input already has a dot and clicked button is a dot
            if (input.innerText.includes(dot) && button == dot) {
                return;
            }
            // maximum allowed numbers inputted are 20
            if (input.innerText.length == 20) {
                return;
            }

            // if pressed dot and input already has a - sign, show -0.
            if (button == dot && input.innerText == "-") {
                input.innerText = "-0" + dot;
            }
            // else append number
            else {
                input.innerText += button;
            }
        }
    }
    // if it's an operator or = sign
    else {
        // return if newOp pressed at first
        if (input.innerText == 0 && button == newOp) {
            alert('Nothing has been calculated');
            return
        }
        // return if operator is already pressed
        if (operator_value != null && button == operator_value) {
            alert('Operator is already pressed');
            return
        }
        // show minus sign if it's the first value selected and finally return
        if (button == "-" && input.innerText == 0) {
            input.innerText = button;
            firstNum = false;
            operator_value = button
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && input.innerText == "-") {
            alert('Operator is already pressed');
            return
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operator_value == "-" && history.innerText.includes("=")) {
            alert('Expression has been calculated');
            return
        }
        // set value of operator if it's one
        if (operators.includes(button)) {
            if (typeof last_operator != "undefined" && last_operator != null) {
                calc_operator = last_operator
            }
            else {
                calc_operator = button
            }
            if (button == "*") {
                last_operator = "×"
            }
            else if (button == "/") {
                last_operator = "÷"
            }
            else {
                last_operator = button
            }
            operator_value = button
            firstNum = true
        }
        // add first number to numbers array and show it on history
        if (numbers.length == 0) {
            numbers.push(input.innerText)
            if (typeof last_operator != "undefined" && last_operator != null) {
                history.innerText = input.innerText + " " + last_operator
            }
        }
        // rest of calculations
        else {
            if (numbers.length == 1) {
                numbers[1] = input.innerText
            }
            var temp_num = input.innerText
            // calculate total
            if (button == equal && calc_operator != null) {
                var total = calculate(numbers[0], numbers[1], calc_operator)
                input.innerText = total;
                // append second number to history
                if (!history.innerText.includes("=")) {
                    history.innerText += " " + numbers[1] + " ="
                }
                temp_num = numbers[0]
                numbers[0] = total
                operator_value = null
                // replace first number of history with the value of total
                var history_arr = history.innerText.split(" ")
                history_arr[0] = temp_num
                history.innerText = history_arr.join(" ")
            }
            // update history with the value on screen and the pressed operator
            else if (calc_operator != null) {
                history.innerText = temp_num + " " + last_operator
                calc_operator = button
                numbers = []
                numbers.push(input.innerText)
            }
        }
    }

}