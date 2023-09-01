import LineTo, { SteppedLineTo } from "react-lineto";

function Liner() {
  return (
    <div>
            <div className="A">Element A</div>
            <div className="B">Element B</div>
            <SteppedLineTo from="A" to="B" orientation="v" />
        </div>
  );
}

export default Liner;
