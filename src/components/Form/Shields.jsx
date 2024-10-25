import { useReducer } from "react";
import Button from "./Button";
import Textbox from "./Textbox";

const Shields = ({ app }) => {
  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_SHIELD":
        return [...state, action.payload];
      case "REMOVE_SHIELD":
        return state.filter((shield) => shield.id !== action.payload.id);
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <fieldset>
      <legend>Sign Shields:</legend>
      <div id="shields">
        {state.map((shield) => (
          <div key={shield.id}>
            <input
              type="checkbox"
              id={`shield${shield.id}_to`}
              name={`shield${shield.id}_to`}
            />
            <label htmlFor={`shield${shield.id}_to`}> TO </label>
            <select id={`shield${shield.id}_type`}>
              <option value="I">I-</option>
              <option value="US">US</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="rec2">CT</option>
              <option value="cir">DE</option>
              <option value="DC">DC</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="cir">IA</option>
              <option value="KS">KS</option>
              <option value="cir">KY</option>
              <option value="LA">LA</option>
              <option value="rec">ME</option>
              <option value="MD">MD</option>
              <option value="rec">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="elp">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="MT2">MT 2nd</option>
              <option value="NB">NB</option>
              <option value="NE">NE</option>
              <option value="NL">NL</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="elp">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="cir">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="PEI">PEI</option>
              <option value="QC">QC</option>
              <option value="QC 2nd">QC 2nd</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TN2">TN 2nd</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VT2">VT 2nd</option>
              <option value="VA">VA</option>
              <option value="VA2">VA 2nd</option>
              <option value="WA">WA</option>
              <option value="rec2">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
              <option value="C">C-</option>
            </select>
            <Textbox
              placeholder="00"
              onChange={(e) => console.log(e.target.value)}
            />
            <select id={`shield${shield.id}_bannerType`}>
              <option value="none">None</option>
              <option value="arterial">Arterial</option>
              <option value="north">North</option>
              <option value="east">East</option>
              <option value="south">South</option>
              <option value="west">West</option>
              <option value="jct">Jct</option>
              <option value="begin">Begin</option>
              <option value="end">End</option>
              <option value="spur">Spur</option>
              <option value="alt">Alt</option>
              <option value="truck">Truck</option>
              <option value="trunk">Trunk</option>
              <option value="bus">Bus</option>
              <option value="byp">Byp</option>
              <option value="loop">Loop</option>
              <option value="express">Express</option>
              <option value="local">Local</option>
              <option value="inner">Inner</option>
              <option value="outer">Outer</option>
              <option value="future">Future</option>
              <option value="toll">Toll</option>
              <option value="city">City</option>
              <option value="conn">Conn</option>
              <option value="to">To</option>
            </select>
            <select id={`shield${shield.id}_bannerPosition`}>
              <option value="above">Above</option>
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
            <Button
              text="Delete"
              variant="danger"
              onClick={() => {
                dispatch({ type: "REMOVE_SHIELD", payload: shield });
                app.deleteShield(shield.id);
              }}
            />
          </div>
        ))}
        <Button
          text="Add Shield"
          onClick={() => {
            dispatch({
              type: "ADD_SHIELD",
              payload: { id: Date.now(), name: "Shield" },
            });
            app.newShield();
          }}
        />
      </div>
    </fieldset>
  );
};

export default Shields;
