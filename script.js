// document.getElementById("answer").readOnly = true; //set this attribute in Html file
function call_button(str, answer) {
    if (str === "sin") return Math.sin(answer).toPrecision(4);
    else if (str === "cos") return Math.cos(answer).toPrecision(4);
    else if (str === "tan") return Math.tan(answer).toPrecision(4);
    else if (str === "pow") return Math.sqrt(answer).toPrecision(4);
}

window.onload = function () {
    let history = [];
    let history_ans = [];
    let firstNum = true;

    function showDiv() {
        const element = document.getElementById("welcomeDiv");
        var child = element.lastElementChild;
        while (child) {
            element.removeChild(child);
            child = element.lastElementChild;
        }
        for (let i = 0; i < history.length; i++) {
            const node = document.createElement("div");
            const element = document.createElement("div");
            const eq = document.createElement("div");
            const del = document.createElement("div");
            del.style.marginLeft = '13px';
            del.innerText = '❌';
            del.style.display = 'flex-end'
            eq.innerText = '='
            eq.style.marginRight = '6px';
            del.addEventListener('click', () => {
                node.remove();
                while (i < history.length) {
                    if (history[i] === element.innerText) {
                        history.splice(i, 1);
                        history_ans.splice(i, 1);
                    } else {
                        ++i;
                    }
                }
            });
            element.innerText = history[i]
            element.style.border = "1px solid #666666";
            element.style.padding = "2px 12px"
            node.style.display = "flex"
            node.style.paddingBottom = "10px"
            element.addEventListener('click', () => {
                screenValue = element.innerText;
                screen.value = screenValue;
            });
            const textnode_ans = document.createElement("div");
            textnode_ans.innerText = history_ans[i]
            textnode_ans.style.border = "1px solid #666666";
            textnode_ans.style.padding = "2px 12px"
            eq.style.marginLeft = "10px"
            node.appendChild(element);
            node.appendChild(eq)
            node.appendChild(textnode_ans);
            node.appendChild(del)
            document.getElementById("welcomeDiv").appendChild(node);
        }
    };

    const buttonRow = document.querySelectorAll("button");
    let screen = document.getElementById("answer");
    let screenValue = "";
    let trigno = ['sin', 'cos', 'tan', '√']
    let operators = ["+", "-", "/", "*"];

    for (item of buttonRow) {
        item.addEventListener("click", (e) => {
            buttonText = e.target.innerText;
            if (screenValue == "") firstNum = true;
            if (firstNum) {
                if (buttonText == ".") {
                    screenValue = `0.`
                    screen.value = screenValue
                }
                else if (buttonText == "+" || buttonText == '-') {
                    screenValue += buttonText
                    screen.value = screenValue
                    return
                }
                firstNum = false;

            }
            // return if the box already has a dot and clicked button is a dot
            if (screenValue.includes(".") && buttonText == ".") {
                return;
            }
            // maximum allowed numbers inputted are 20
            if (screenValue.length == 20) {
                return;
            }
            // if pressed dot and box already has a - sign, show -0.
            if (buttonText == "." && screenValue == "-") {
                screenValue = "-0" + ".";
            }
            else if (trigno.includes(buttonText)) {
                screenValue = `${buttonText}( `;
                screen.value = screenValue;
                firstNum = true;
            }
            else if (answer.value.includes(".") && buttonText == ".") return;
            else if (buttonText == "=") {
                if (screenValue.includes('sin(')) {
                    let exp = screenValue;
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        const myArray = words.split(" ");
                        let i = infixToPrefix(myArray);
                        const myArrayy = i.split(" ");
                        let e = evaluatePrefix(myArrayy);
                        screenValue = call_button('sin', e);
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                    }
                    else {
                        let exp = screenValue;
                        screenValue = 'Invalid Expression'
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('cos(')) {
                    let exp = screenValue;
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        const myArray = words.split(" ");
                        let i = infixToPrefix(myArray);
                        const myArrayy = i.split(" ");
                        let e = evaluatePrefix(myArrayy);
                        screenValue = call_button('cos', e);
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                    }
                    else {
                        let exp = screenValue;
                        screenValue = 'Invalid Expression'
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('tan(')) {
                    let exp = screenValue;
                    let words = screenValue.slice(3)
                    if (matchBrackets(words)) {
                        const myArray = words.split(" ");
                        let i = infixToPrefix(myArray);
                        const myArrayy = i.split(" ");
                        let e = evaluatePrefix(myArrayy);
                        screenValue = call_button('tan', e);
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                        console.log(history)
                    }
                    else {
                        let exp = screenValue;
                        screenValue = 'Invalid Expression'
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (screenValue.includes('√(')) {
                    let exp = screenValue;
                    let words = screenValue.slice(1)
                    if (matchBrackets(words)) {
                        const myArray = words.split(" ");
                        let i = infixToPrefix(myArray);
                        const myArrayy = i.split(" ");
                        let e = evaluatePrefix(myArrayy);
                        screenValue = call_button('pow', e);
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                    }
                    else {
                        let exp = screenValue;
                        screenValue = 'Invalid Expression'
                        screen.value = screenValue;
                        history_ans.push(screenValue)
                        history.push(exp);
                        screen.value = 'Invalid Expression';
                    }
                }
                else if (matchBrackets(screenValue)) {
                    let exp = screenValue;
                    const myArray = screenValue.split(" ");
                    let i = infixToPrefix(myArray);
                    const myArrayy = i.split(" ");
                    console.log(`infix to prefix: ${myArrayy}`);
                    let e = evaluatePrefix(myArrayy);
                    console.log(`evaluate prefix: ${e}`);
                    try {
                        screenValue = e.toPrecision(4);
                    } catch {
                        screenValue = e;
                    }
                    screen.value = screenValue;
                    history_ans.push(screenValue)
                    history.push(exp);

                }
                else {
                    let exp = screenValue;
                    screenValue = 'Invalid Expression'
                    screen.value = screenValue;
                    history_ans.push(screenValue)
                    history.push(exp);
                }
            }
            else if (buttonText == "e") {
                screenValue = 2.7182
                screen.value = screenValue
            }
            else if (buttonText == "pi") {
                screenValue = 3.1415
                screen.value = screenValue
            }
            else if (buttonText == "C") {
                screenValue = ""
                screen.value = screenValue;
            }
            else if (buttonText == "History") showDiv()
            else if (buttonText == ",") {
                var res = screenValue.charAt(screenValue.length - 1);
                res_num = screenValue.charAt(screenValue.length - 2);
                console.log(`res: ${res} and res_num: ${res_num}`)
                if (res == " " && operators.includes(res_num)) {
                    screenValue = screenValue.slice(0, -3)
                    screen.value = screenValue;
                }
                else if (res == " ") {
                    screenValue = screenValue.slice(0, -2)
                    screen.value = screenValue;
                }
                else {
                    screenValue = screenValue.slice(0, -1)
                    screen.value = screenValue;
                }
            }
            else {
                let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',]
                if (num.includes(buttonText)) {
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
                else if (buttonText == '(') {
                    screenValue += `${buttonText} `;
                    screen.value = screenValue;
                }
                else if (buttonText == ')') {
                    screenValue += ` ${buttonText}`;
                    screen.value = screenValue;
                }
                else {
                    let last_element = screenValue.slice(-2);
                    if (operators.includes(last_element)) console.log(`last element: ${last_element}`);
                    if (operators.includes(buttonText)) console.log(`element: ${buttonText}`);
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
        let operators = [];
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
        let op = ['+', '-', '/', '*', '^']
        if (op.includes(c)) return false
        else return true;
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
                Stack.push((exprsn[j]));
            }
            else {
                console.log('stack: ' + Stack[Stack.length - 1])
                let o1 = Stack[Stack.length - 1];
                Stack.pop();
                let o2 = Stack[Stack.length - 1];
                Stack.pop();
                console.log(`o1: ${o1} and o2: ${o2}`)
                switch (exprsn[j]) {
                    case '+':
                        Stack.push(parseInt(o1) + parseInt(o2));
                        break;
                    case '-':
                        Stack.push(parseInt(o1) - parseInt(o2));
                        break;
                    case '*':
                        Stack.push(parseInt(o1) * parseInt(o2));
                        break;
                    case '/':
                        Stack.push(parseInt(o1) / parseInt(o2));
                        break;
                    case '^':
                        // console.log('here: ' + parseInt(o1) ^ parseInt(o2));
                        Stack.push(parseInt(o1) ** parseInt(o2));
                        break;
                }
            }
        }
        return Stack[Stack.length - 1]
    }
}
