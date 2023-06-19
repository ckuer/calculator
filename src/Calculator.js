import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

// array for the data to map through and render the buttons in the ButtonBox
const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

/* Input Formatting functions */
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// Calculator component
const Calculator = () => {
    // initialize all states in an object calc to zero/empty
    let [calc, setCalc] = useState({
        sign: "", // sign = the selected sign
        num: 0, // num = the entered number
        res: 0, // res = the calculated result
    });

    /* Click Handler Functions for handling button clicks */

    // numClickHandler fired when a number button (0-9) is pressed
    // adds value of Button to the current num value
    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
                    ? toLocaleString(Number(removeSpaces(calc.num + value)))
                    : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            })
        }
    };

    // commaClickHandler fired when decimal point (.) is pressed
    // adds decimal point to the current num value
    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    // signClickHandler fired when a sign (+, -, *, or /) is pressed
    // sets as the current sign value in the calc object
    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    // equalsClickHandler fired when equals (=) button is pressed
    // calculates the result which it sets as the new res value
    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                    ? a - b
                    : sign === "X"
                    ? a * b
                    : a / b;

            setCalc({
                ...calc,
                res: 
                    calc.num === "0" && calc.sign === "/"
                    ? "Can't divide with 0"
                    : toLocaleString(
                        math(
                            Number(removeSpaces(calc.res)),
                            Number(removeSpaces(calc.num)),
                            calc.sign
                        )
                    ),
                sign: "",
                num: 0,
            });
        }
    };

    // invertClickHandler checks for num or res then inverts them by multiplying with -1
    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : 0,
            sign: "",
        });
    };

    // percentClickHandler checks for num or res then calculates the percentage using Math.pow (which returns the base to the exponent power)
    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    // resetClickHandler defaults all initial values of calc back to how they began (zero/empty)
    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res} />
            <ButtonBox>
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className={btn === "=" ? "equals" : ""}
                            value={btn}
                            onClick={
                                btn === "C"
                                    ? resetClickHandler
                                    : btn === "+-"
                                    ? invertClickHandler
                                    : btn === "%"
                                    ? percentClickHandler
                                    : btn === "="
                                    ? equalsClickHandler
                                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                    ? signClickHandler
                                    : btn === "."
                                    ? commaClickHandler
                                    : numClickHandler
                                }
                            />
                        );
                    })
                }
            </ButtonBox>
        </Wrapper>
    );
};

export default Calculator;