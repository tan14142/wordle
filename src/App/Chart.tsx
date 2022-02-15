import { Container, Row, Col } from "react-bootstrap";
import stats from './getStats';

export default function Chart() {
  const scale = 100 / Math.max(...stats.dist) || 0;

  return (
    <Container id="chart">
      {stats.dist.map((val, key) => (
        <Row key={key}>
          {key + 1}
          <Col>
            <div style={{width: `${val * scale || 0}%`}}>{val}</div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}