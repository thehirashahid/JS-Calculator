// document.getElementById("answer").readOnly = true; //set this attribute in Html file

function call_button(str, answer) {
    if (str === "sin") return Math.sin(answer).toPrecision(4);
    else if (str === "cos") return Math.cos(answer).toPrecision(4);
    else if (str === "tan") return Math.tan(answer).toPrecision(4);
    else if (str === "pow") return Math.sqrt(answer).toPrecision(4);
}

window.onload = function () {
    const buttonRow = document.querySelectorAll("button");
    let screen = document.getElementById("answer");
    let screenValue = "";
    let trigno = ['sin', 'cos', 'tan', '√']
    for (item of buttonRow) {
        item.addEventListener("click", (e) => {
            buttonText = e.target.innerText;
            if (buttonText === "." && answer.value.length == 0) {
                screenValue = `0.`
                screen.value = screenValue
            }
            else if (trigno.includes(buttonText)) {
                screenValue = `${buttonText}(`;
                screen.value = screenValue;
            }
            else if (answer.value.includes(".") && buttonText == ".") return;
            else if (buttonText == "=") {
                if (screenValue.includes('sin(')) {
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        let i = infixToPrefix(words);
                        let e = evaluatePrefix(i);
                        screen.value = call_button('sin', e);
                    }
                    else {
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('cos(')) {
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        let i = infixToPrefix(words);
                        let e = evaluatePrefix(i);
                        screen.value = call_button('cos', e);
                    }
                    else {
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('tan(')) {
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        let i = infixToPrefix(words);
                        let e = evaluatePrefix(i);
                        screen.value = call_button('tan', e);
                    }
                    else {
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('√(')) {
                    let words = screenValue.slice(1)
                    if (matchBrackets(words)) {
                        let i = infixToPrefix(words);
                        let e = evaluatePrefix(i);
                        screen.value = call_button('pow', e);
                    }
                    else {
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (matchBrackets(screenValue)) {
                    // let i = infixToPrefix(screenValue);
                    // console.log(`infix to prefix: ${i}`);
                    // let e = evaluatePrefix(i);
                    // console.log(`evaluate prefix: ${e}`);
                    // screen.value = e;
                }
                else {
                    screen.value = 'Invalid Expression';
                }
            }
            else if (buttonText == "e") screen.value = 2.7182
            else if (buttonText == "pi") screen.value = 3.1415
            else if (buttonText == "CE") screenValue = ""
            else if (buttonText == "C") window.location.reload()
            else if (buttonText == ",") {
                screenValue = screenValue.slice(0, -1)
                screen.value = screenValue;
            }
            else {
                screenValue += buttonText;
                screen.value = screenValue;
            }
        });
    }
    window.onerror = function () {
        alert("PLEASE INPUT VALID EXPRESSION");
        screenValue = "";
        screen.value = screenValue;
        console.clear();
    };

    function isOperator(c) {
        return (!(c >= 'a' && c <= 'z') &&
            !(c >= '0' && c <= '9') &&
            !(c >= 'A' && c <= 'Z'));
    }

    function getPriority(C) {
        if (C == '-' || C == '+')
            return 1;
        else if (C == '*' || C == '/')
            return 2;
        else if (C == '^')
            return 3;
        return 0;
    }


    function infixToPrefix(infix) {
        // stack for operators.
        let operators = [];
        // stack for operands.
        let operands = [];
        for (let i = 0; i < infix.length; i++) {
            if (infix[i] == '(') {
                operators.push(infix[i]);
            }
            else if (infix[i] == ')') {
                while (operators.length != 0 &&
                    operators[operators.length - 1] != '(') {
                    let op1 = operands.pop();
                    let op2 = operands.pop();
                    let op = operators.pop();
                    let tmp = op + op2 + op1;
                    operands.push(tmp);
                }
                operators.pop();
            }
            else if (!isOperator(infix[i])) {
                operands.push(infix[i] + "");
            }
            else {
                while (operators.length &&
                    getPriority(infix[i]) <=
                    getPriority(operators[operators.length - 1])) {
                    let op1 = operands.pop();
                    let op2 = operands.pop();
                    let op = operators.pop();
                    let tmp = op + op2 + op1;
                    operands.push(tmp);
                }
                operators.push(infix[i]);
            }
        }
        while (operators.length != 0) {
            let op1 = operands.pop();
            let op2 = operands.pop();
            let op = operators.pop();
            let tmp = op + op2 + op1;
            operands.push(tmp);
        }
        return operands[operands.length - 1];
    }


    // Javascript program to evaluate a prefix expression.

    function isOperand(c) {
        if (c.charCodeAt() >= 48 && c.charCodeAt() <= 57)
            return true;
        else
            return false;
    }

    function matchBrackets(s) {
        let x = "";
        let c = [];
        let ok = true;
        for (let i = 0; i < s.length; i++) {
            x = s.substr(i, 1);
            switch (x) {
                case "{":
                    c.unshift("}");
                    break;
                case "[":
                    c.unshift("]");
                    break;
                case "(":
                    c.unshift(")");
                    break;
                case "}":
                    if (c[0] == "}") {
                        c.shift();
                    } else {
                        ok = false;
                    }
                    break;
                case "]":
                    if (c[0] == "]") {
                        c.shift();
                    } else {
                        ok = false;
                    }
                    break;
                case ")":
                    if (c[0] == ")") {
                        c.shift();
                    } else {
                        ok = false;
                    }
                    break;
            }
            if (!ok) {
                break;
            }
        }
        if (c.length > 0) {
            ok = false;
        }
        return ok;
    }

    function evaluatePrefix(exprsn) {
        let Stack = [];
        for (let j = exprsn.length - 1; j >= 0; j--) {
            if (isOperand(exprsn[j]))
                Stack.push((exprsn[j].charCodeAt() - 48));
            else {
                let o1 = Stack[Stack.length - 1];

                Stack.pop();
                let o2 = Stack[Stack.length - 1];
                console.log(`o1: ${o1} and o2: ${o2}`)
                Stack.pop();
                console.log(exprsn[j])
                switch (exprsn[j]) {
                    case '+':
                        Stack.push(o1 + o2);
                        break;
                    case '-':
                        Stack.push(o1 - o2);
                        break;
                    case '*':
                        Stack.push(o1 * o2);
                        break;
                    case '/':
                        Stack.push(o1 / o2);
                        break;
                    case '^':
                        console.log('here: ' + o1 ^ o2);
                        Stack.push(o1 / o2);
                        break;
                }
            }
        }
        return Stack[Stack.length - 1];
    }
}
