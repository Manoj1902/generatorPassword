import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { MdContentCopy } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";

function App() {
  const [length, setLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symboleAllowed, setSymboleAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [color, setColor] = useState("#242424");

  const passwordRef = useRef(null);

  const randomColor = () => {
    let symbols = "0123456789ABCDEF";

    let rang = "#";

    for (let i = 0; i < 6; i++) {
      rang = rang + symbols[Math.floor(Math.random() * 16)];
    }
    setColor(rang);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "~`!@#$%^&*()_+-=[]{};':<>?/|";

    if (uppercaseAllowed) str += uppercase;
    if (lowercaseAllowed) str += lowercase;
    if (numberAllowed) str += numbers;
    if (symboleAllowed) str += symbols;

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [
    length,
    uppercaseAllowed,
    lowercaseAllowed,
    numberAllowed,
    symboleAllowed,
    setPassword,
  ]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 51);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    uppercaseAllowed,
    lowercaseAllowed,
    numberAllowed,
    symboleAllowed,
    passwordGenerator,
  ]);

  return (
    <>
      <Container>
        <div
          style={{
            backgroundColor: color,
          }}
          className="mainBox"
        >
          <div className="passwordInput">
            <input
              type="text"
              placeholder="Password"
              readOnly
              value={password}
              ref={passwordRef}
            />

            <TbRefresh
              className="refreshIcon"
              onClick={() => {
                passwordGenerator();
                randomColor();
              }}
              style={{ cursor: "pointer" }}
            />
            <MdContentCopy
              className="copyIcon"
              onClick={() => {
                copyPasswordToClipboard();
              }}
              style={{ cursor: "pointer" }}
            />
          </div>

          <PasswordSettings
            style={{
              backgroundColor: color,
            }}
          >
            <h1>Generate your password</h1>
            <div
              style={{
                backgroundColor: color,
              }}
              className="settings"
            >
              <div className="passwordLength">
                <label htmlFor="numberInput">Password Length ({length}) </label>
                <input
                  className="numberSlider"
                  type="range"
                  min={8}
                  max={50}
                  value={length}
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                />
              </div>
              <div className="checkboxes">
                <div className="uppercaseCheckbox checkbox">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    defaultChecked={uppercaseAllowed}
                    id="uppercaseInput"
                    onChange={() => {
                      setUppercaseAllowed((prev) => !prev);
                    }}
                  />
                  <label htmlFor="uppercaseInput">Uppercase</label>
                </div>
                <div className="lowercaseCheckbox checkbox">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    defaultChecked={lowercaseAllowed}
                    id="lowercaseInput"
                    onChange={() => {
                      setLowercaseAllowed((prev) => !prev);
                    }}
                  />
                  <label htmlFor="lowercaseInput">Lowercase</label>
                </div>
                <div className="numberCheckbox checkbox">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    defaultChecked={numberAllowed}
                    id="numberInput"
                    onChange={() => {
                      setNumberAllowed((prev) => !prev);
                    }}
                  />
                  <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="symbolsCheckbox checkbox">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    defaultChecked={symboleAllowed}
                    id="symboleInput"
                    onChange={() => {
                      setSymboleAllowed((prev) => !prev);
                    }}
                  />
                  <label>Symbols</label>
                </div>
              </div>
            </div>
          </PasswordSettings>
        </div>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  height: 100vh;

  * {
    /* background-color: ; */
  }
  .mainBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* background-color: red; */
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
    width: 100vh;
    height: 60vh;
    border-radius: 10px;
  }

  .passwordInput {
    margin: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border-radius: 10px;
    margin-top: 28px;
  }

  .passwordInput input {
    width: 538px;
    background-color: white;
    padding: 14px 10px;
    border: 0px solid black;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right-width: 0px;
    font-size: 16px;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }

  .passwordLength {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 14px;
    height: 80px;
    padding: 2px 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }
  .passwordLength label {
    font-size: 18px;
    font-weight: 700;
  }

  h1 {
    background-color: white;
    margin: 16px auto;
    padding: 5px 15px;
    border-radius: 10px;
    font-family: "Salsa", cursive;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }

  .copyIcon {
    border: 0px solid black;
    padding: 14px 10px;
    background-color: #242424;
    color: white;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left-width: 0px;
    font-size: 16px;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }
  .refreshIcon {
    border: 0px solid black;
    padding: 14px 10px;
    background-color: #ffa49e;
    color: #242424;
    border-left-width: 0px;
    font-size: 16px;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }
`;

const PasswordSettings = styled.div`
  display: flex;
  flex-direction: column;

  /* background-color: red; */

  * {
    /* background-color: red; */
  }

  div {
    /* background-color: white; */
  }
  label {
    /* background-color: white; */
  }
  input {
    background-color: white;
  }
  .settings {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* background-color: white; */
    margin: 20px 50px 20px 50px;
    gap: 210px;
  }

  .numberSlider {
    cursor: pointer;
  }

  .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 24px -6px rgba(0, 0, 0, 0.75);
  }

  .checkboxes input {
    height: 15px;
    width: 15px;
    margin-right: 10px;
    background-color: white;
  }

  .checkbox {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin: 8px;
  }
  .checkbox label {
    font-size: 18px;
  }
`;
