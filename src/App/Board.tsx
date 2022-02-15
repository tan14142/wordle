import { Container, Row, Col } from "react-bootstrap";
import { BoardType, PosType } from "./Types";

interface BoardProps {
  board: BoardType
  pos: PosType
  isVictory: boolean
}

export default function Board({board, pos, isVictory}: BoardProps) {
  return (
    <div id="board">
    <Container>
      {board.map((row, krow) => (
        <Row className="mx-auto" key={krow}>
          {row.map((tile, kcol) => {
            let className = "tile";

            if (krow < pos.row) {
              className += ` ${tile[1]}`;

              if (isVictory) {
                className += " rotateX";
              }
              else if (krow + 1 === pos.row) {
                className += " rotateY";
              }
            }
            else if (krow === pos.row && tile[1]) {
              className += ` ${tile[1]}`;
            }

            return (
              <Col
               className={className}
               key={kcol}>
                {tile[0]}
              </Col>
            );
          })}
        </Row>
      ))}
    </Container>
    </div>
  );
}