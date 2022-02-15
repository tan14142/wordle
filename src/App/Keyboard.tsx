import { Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import { KeysType } from "./Types";

interface KeyboardProps {
  handleClickKeyboard: (c: string) => void,
  keys: KeysType
}

export default function Keyboard({ handleClickKeyboard, keys }: KeyboardProps) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
  ];
  
  return (
    <Container id="keyboard">
      {rows.map((row, rkey) => (
        <Row
         className={"flex-nowrap mx-auto"}
         key={rkey}
         >
          {row.map((key, ckey) => {
            return (
              <Fragment key={ckey}>
                {(rkey === 1 && ckey === 0) ? <div className="col spacer" /> : ""}
                <button
                 onClick={() => handleClickKeyboard(key)}
                 className={"col" + (keys[key] ? ` ${keys[key]}` : "")}>
                  {key === "Backspace"
                    ? "\u232B"
                    : key
                  }
                </button>
                {(rkey === 1 && ckey === 8) ? <div className="col spacer" /> : ""}
              </Fragment>
            );
          })}
        </Row>
      ))}
    </Container>
  );
}