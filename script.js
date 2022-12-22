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
                        screenValue = call_button('sin', e);
                        screen.value = screenValue;
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
                        screenValue = call_button('cos', e);
                        screen.value = screenValue;
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
                        screenValue = call_button('tan', e);
                        screen.value = screenValue;
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
                        screenValue = call_button('pow', e);
                        screen.value = screenValue;
                    }
                    else {
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (matchBrackets(screenValue)) {
                    const myArray = screenValue.split(" ");
                    let i = infixToPrefix(myArray);
                    console.log(`infix to prefix: ${i}`);
                    const myArrayy = i.split(" ");
                    let e = evaluatePrefix(myArrayy);
                    console.log(`evaluate prefix: ${e}`);
                    screenValue = e;
                    screen.value = screenValue;
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
                let num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                if (num.includes(buttonText)) {
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
                else {
                    screenValue += ` ${buttonText} `;
                    screen.value = screenValue;
                }
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
        // return (!(c >= 'a' && c <= 'z') &&
        //     !(c >= '0' && c <= '9') &&
        //     !(c >= 'A' && c <= 'Z'));
        let op = ['+', '-', '/', '*', '^']
        if (op.includes(c)) return c
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
                operands.push(`${infix[i]} `);
                console.log(`operands: ${operands}`)
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
                operators.push(`${infix[i]} `);
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
        console.log(exprsn)
        let Stack = [];
        for (let j = exprsn.length - 1; j >= 0; j--) {
            if (isOperand(exprsn[j])) {
                console.log(exprsn[j])
                Stack.push((exprsn[j]));
                console.log(`stack: ${Stack}`)
            }
            else {
                console.log(`stack: ${Stack}`)
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
