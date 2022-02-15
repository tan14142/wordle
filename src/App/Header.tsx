import { ReactComponent as ChartSVG } from '../chart.svg';
import { ReactComponent as GearSVG } from '../gear.svg';
import { ReactComponent as PlusSVG } from '../plus.svg';
import { ReactComponent as QuestionSVG } from '../question.svg';

interface HeaderProps {
  handleClickInfo: () => void
  handleClickNew: () => void
  handleClickStats: () => void
  handleClickSettings: () => void
  message: string
}

export default function Header({
  handleClickInfo,
  handleClickNew,
  handleClickStats,
  handleClickSettings,
  message
}: HeaderProps) {
  return (
    <header
     id="header"
     className="row">
      <button
       onClick={handleClickNew}
       title="new game">
        <PlusSVG className="col" />
      </button>
      <button
       onClick={handleClickStats}
       title="statistics">
        <ChartSVG className="col" />
      </button>
      <div className="col">
        <h1 className={message === "" ? "" : "slideY"}>Wordle</h1>
        <span id="message" className={(message === "" ? "" : "slideY")}>{message}</span>
      </div>
      <button
       onClick={handleClickInfo}
       title="how to play">
        <QuestionSVG className="col" />
      </button>
      <button
       onClick={handleClickSettings}
       title="settings">
        <GearSVG className="col" />
      </button>
    </header>
  );
}