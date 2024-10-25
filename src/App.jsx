import { useState, useEffect, useDebugValue } from "react";
import Button from "./components/Form/Button";
import Dropdown from "./components/Form/Dropdown";
import Textbox from "./components/Form/Textbox";
import Checkbox from "./components/Form/Checkbox";
import ParagraphBox from "./components/Form/ParagraphBox";
import NumberBox from "./components/Form/NumberBox";
import Shields from "./components/Form/Shields";

import Sign from "./components/legacy/Sign";
import ExitTab from "./components/legacy/ExitTab";
import Panel from "./components/legacy/Panel";
import Shield from "./components/legacy/Shield";

import { classConcat, removeObjPropertyImmutably } from "./lib";

import "./style/page.css";
import "./style/form.css";
import "./style/signs.css";
import "./style/shields.css";

function App() {
  const [polePosition, setPolePosition] = useState("left");
  const [lanesWide, setLanesWide] = useState(1);
  const [panels, setPanels] = useState([
    //new Panel(new Sign({ controlText: "NewSign" }), undefined, new ExitTab()),
    { sign: { controlCities: ["New Sign"], shields: [] }, color: "green", corner: "round" },
  ]);
  const [selectedPanel, setSelectedPanel] = useState(0);

  useDebugValue(panels);

  useEffect(() => {
    console.log(`panels: ${JSON.stringify(panels)}`);
  }, panels);

  const app = {
    newPanel: () => {
      const newSign = { controlCities: ["New Sign"], shields: [] };
      const newPanel = { sign: newSign, color: "green", corner: "round" };
      setPanels((prevPanels) => [...prevPanels, newPanel]);
    },
    duplicatePanel: (panelIndex) => {
      const existingPanel = panels[panelIndex];
      const newShields = [];
      // const newShields = existingPanel.sign.shields.map((shield) =>
      //   Object.assign(new Shield(), shield)
      // );
      const newSign = new Sign({
        controlCities: existingPanel.sign.controlCities,
        shieldPosition: existingPanel.sign.shieldPosition,
        sheildBacks: existingPanel.sign.sheildBacks,
        guideArrow: existingPanel.sign.guideArrow,
        guideArrowLanes: existingPanel.sign.guideArrowLanes,
        actionMessage: existingPanel.sign.actionMessage,
        shields: newShields,
      });
      const newExitTab = {}; //Object.assign(new ExitTab(), existingPanel.exitTab);
      const newPanel = Object.assign(new Panel(), existingPanel);
      newPanel.sign = newSign;
      newPanel.exitTab = newExitTab;
      setPanels((prevPanels) => [
        ...prevPanels.slice(0, panelIndex + 1),
        newPanel,
        ...prevPanels.slice(panelIndex + 1),
      ]);
    },
    deletePanel: (panelIndex) => {
      setPanels((prevPanels) =>
        prevPanels.filter((_, index) => index !== panelIndex)
      );
    },
    shiftLeft: (panelIndex) => {
      if (panelIndex <= 0) {
        return panelIndex;
      }
      setPanels((prevPanels) => {
        const updatedPanels = [...prevPanels];
        [updatedPanels[panelIndex], updatedPanels[panelIndex - 1]] = [
          updatedPanels[panelIndex - 1],
          updatedPanels[panelIndex],
        ];
        return updatedPanels;
      });
      return panelIndex - 1;
    },
    shiftRight: (panelIndex) => {
      if (panelIndex >= panels.length - 1) {
        return panelIndex;
      }
      setPanels((prevPanels) => {
        const updatedPanels = [...prevPanels];
        [updatedPanels[panelIndex], updatedPanels[panelIndex + 1]] = [
          updatedPanels[panelIndex + 1],
          updatedPanels[panelIndex],
        ];
        return updatedPanels;
      });
      return panelIndex + 1;
    },
    handlePosition: (val) => {
      setPolePosition(val);
    },
    changePanelColor: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = { ...panel, color: val };
          }
          return panel;
        })
      );
    },
    changePanelCorner: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = { ...panel, corner: val };
          }
          return panel;
        })
      );
    },
    changeExitTab: (val) => {
      const text = val.split(" ")[0].toUpperCase();
      const numeral = val.slice(text.length).toUpperCase();

      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            if (panel.exitTab === undefined) {
              panel =
                text === "" && numeral === ""
                  ? removeObjPropertyImmutably(panel, "exitTab")
                  : {
                      ...panel,
                      exitTab: {
                        position: "left",
                        size: "narrow",
                        text: text,
                        numeral: numeral,
                      },
                    };
            } else {
              panel =
                text === "" && numeral === ""
                  ? removeObjPropertyImmutably(panel, "exitTab")
                  : {
                      ...panel,
                      exitTab: {
                        ...panel.exitTab,
                        text: text,
                        numeral: numeral,
                      },
                    };
            }
          }
          return panel;
        })
      );
    },
    changeExitPosition: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = { ...panel, exitTab: { ...panel.exitTab, position: val } };
          }
          return panel;
        })
      );
    },
    changeExitSize: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = { ...panel, exitTab: { ...panel.exitTab, size: val } };
          }
          return panel;
        })
      );
    },
    /* --SHIELDS-- */
    newShield: () => {
      setPanels((prevPanels) => {
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            console.log(`panel.sign: ${JSON.stringify(panel.sign)}`);
            if (!panel.sign["shields"]) {
              panel.sign["shields"] = [];
            }
            panel.sign["shields"] = [...panel.sign.shields, {
              type: "I",
              routeNumber: "00",
              position: "above",
              bannerType: "none"
            }];
          }
          return panel;
        })
      });
      console.log("New Shield");
      console.log(`panels3: ${JSON.stringify(panels)}`);
    },
    deleteShield: (shieldIndex) => {
      setPanels((prevPanels) => {
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel.sign.shields = panel.sign.shields.filter((_, i) => i !== shieldIndex);
          }
          return panel;
        })
      });
    },
    /*  */
    changeControlCities: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = {
              ...panel,
              sign: { ...panel.sign, controlCities: val.split("\n") },
            };
          }
          console.log(JSON.stringify(panel));
          return panel;
        })
      );
    },
    changeActionMessage: (val) => {
      setPanels((prevPanels) =>
        prevPanels.map((panel, index) => {
          if (index === parseInt(selectedPanel)) {
            panel = {
              ...panel,
              sign: { ...panel.sign, actionMessage: val },
            };
          }
          console.log(JSON.stringify(panel));
          return panel;
        })
      );
    },
  };

  return (
    <>
      <header>
        <h1>Sign Maker</h1>
      </header>

      <main>
        <div
          id="postContainer"
          className={classConcat(
            "polePosition" +
              polePosition.charAt(0).toUpperCase() +
              polePosition.slice(1)
          )}
        >
          <div className="post"></div>
          <div id="panelContainer">
            {console.log(`panels2: ${JSON.stringify(panels)}`)}
            {panels?.map((panel, index) => (
              <div
                key={index}
                className={classConcat("panel", panel.color, panel.corner)}
              >
                <div
                  className={classConcat(
                    "exitTabContainer",
                    panel.exitTab !== undefined
                      ? panel.exitTab.position
                      : "left",
                    panel.exitTab !== undefined ? panel.exitTab.size : "full"
                  )}
                >
                  {panel.exitTab ? (
                    <div
                      className="exitTab"
                      style={
                        panel.exitTab?.text ? { visibility: "visible" } : {}
                      }
                    >
                      <span>{panel.exitTab.text}</span>
                      <span className="numeral">{panel.exitTab.numeral}</span>
                    </div>
                  ) : (
                    <div className="exitTab"></div>
                  )}
                </div>
                <div className="signContainer exit-narrow exit-center">
                  <div
                    className="sign exit-narrow exit-center"
                    style={
                      panel.sign.actionMessage
                        ? {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                            borderBottomWidth: "0px",
                          }
                        : {}
                    }
                  >
                    <div className="sideLeftArrow">h</div>
                    <div className="signContentContainer shieldPositionAbove">
                      <div className="shieldsContainer">
                        {panel.sign.shields?.map((shield, index) => (
                          <>
                            <p className="to">TO</p>
                            <div className={`bannerShieldContainer ${shield.type} ${shield.bannerType} bannerPosition${shield.position.toUpperCase()} one`}>
                              <p className="banner"></p>
                              <div className="shield">
                                <object type="image/svtg+xml" className="shieldImg" data="img/shields-without-backs/I-2.svg" />
                                <p className="routeNumber">{shield.routeNumber}</p>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                      <p className="controlText">
                        {panel.sign.controlCities.map((line, index) => (
                          <span key={index}>
                            {line}
                            {panel.sign.controlCities.length - 1 > index && (
                              <br />
                            )}
                          </span>
                        ))}
                        <br />
                      </p>
                    </div>
                    <div className="sideRightArrow">H</div>
                  </div>
                  <div
                    className="guideArrows none"
                    style={
                      panel.sign.actionMessage
                        ? { display: "block", visibility: "visible" }
                        : {}
                    }
                  >
                    <div className="otherSymbols none">
                      <div className="oSNum"></div>
                    </div>
                    {panel.sign.actionMessage ? (
                      <div
                        className="actionMessage action_message"
                        style={{
                          fontFamily: "Series E",
                          visibility: "visible",
                          display: "inline-flex",
                        }}
                      >
                        {panel.sign.actionMessage}
                      </div>
                    ) : (
                      <div
                        className="actionMessage"
                        style={{ display: "none" }}
                      ></div>
                    )}
                    <div className="arrowContainer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="post"></div>
        </div>
        <form name="signMaker">
          <h2>Sign Editor</h2>
          {/* Panel Editing Commands */}
          <div>
            <Button text="New Panel" onClick={app.newPanel} />
            <Button text="Duplicate" onClick={app.duplicatePanel} />
            <Button text="Delete" variant="danger" onClick={app.deletePanel} />
            <Button
              text="<<"
              width="half"
              onClick={app.shiftLeft}
              className="shiftButton"
            />
            <Button
              text=">>"
              width="half"
              onClick={app.shiftRight}
              className="shiftButton"
            />
          </div>
          {/* <input type="button" value="New Panel" onClick={app.newPanel} />
      <input type="button" value="Duplicate" onClick={app.duplicatePanel} />
      <input type="button" value="Delete" onClick={app.deletePanel} />
      <input
        type="button"
        value="<<"
        onClick={app.shiftLeft}
        className="shiftButton"
      />
      <input
        type="button"
        value=">>"
        onClick={app.shiftRight}
        className="shiftButton"
      /> */}
          {/* Post Position */}
          {/* <label htmlFor="postPosition">Post Position</label>
      <select id="postPosition" onChange={app.readForm}></select>
      <br /> */}
          <Dropdown
            label="Post Position:"
            options={[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
              { label: "Overhead", value: "overhead" },
              { label: "Rural", value: "rural" },
              { label: "Center", value: "center" },
            ]}
            onChange={(evt) => app.handlePosition(evt)}
          />
          {/* Panel Choice */}
          {/* <label htmlFor="panelEditing">Editing Panel:</label>
      <select id="panelEditing" onChange={app.changeEditingPanel}></select>
      <br /> */}
          <Dropdown
            label="Editing Panel:"
            options={panels?.map((p, i) => {
              return { label: `Panel ${i + 1}`, value: i };
            })}
            onChange={(val) => setSelectedPanel(val)}
          />
          {/* Color */}
          {/* <label htmlFor="panelColor">Panel Color:</label>
      <select id="panelColor" onChange={app.readForm}></select> */}
          <Dropdown
            label="Panel Color:"
            options={[
              { label: "Green", value: "green" },
              { label: "Blue", value: "blue" },
              { label: "Brown", value: "brown" },
              { label: "Yellow", value: "yellow" },
              { label: "White", value: "white" },
              { label: "Black", value: "black" },
            ]}
            onChange={(val) => app.changePanelColor(val)}
          />
          {/* Corner */}
          {/* <label htmlFor="panelCorner">Panel Corners:</label>
      <select id="panelCorner" onChange={app.readForm}></select>
      <br /> */}
          <Dropdown
            label="Panel Corners:"
            options={[
              { label: "Round", value: "round" },
              { label: "Sharp", value: "sharp" },
            ]}
            onChange={(val) => app.changePanelCorner(val)}
          />
          {/* Exit tab */}
          <div>
            <Textbox
              placeholder="Exit 00"
              label="Exit:"
              onChange={(evt) => {
                app.changeExitTab(evt.target.value);
              }}
            />
            <Dropdown
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
              onChange={(evt) => app.changeExitPosition(evt)}
            />
            <Dropdown
              options={[
                { label: "Narrow", value: "narrow" },
                { label: "Wide", value: "wide" },
                { label: "Full", value: "full" },
                { label: "Edge", value: "edge" },
              ]}
              onChange={(evt) => app.changeExitSize(evt)}
            />
          </div>

          {/* <label htmlFor="exitNumber">Exit:</label>
      <input
        type="text"
        id="exitNumber"
        name="exitNumber"
        placeholder="Exit 00"
        onChange={app.readForm}
      /> */}
          {/* <select id="exitTabPosition" onChange={app.readForm}></select>
      <select id="exitTabWidth" onChange={app.readForm}></select>
      <br /> */}
          <Shields app={app} />
          {/* Position of Shields */}
          <div>
            <Dropdown
              label="Shield Position:"
              options={[
                { label: "Above", value: "above" },
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ]}
            />
            <Checkbox label="Shield Backs:" />
          </div>
          {/* <label htmlFor="shieldsPosition">Shield Positions:</label>
      <select id="shieldsPosition" onChange={app.readForm}></select>
      <label htmlFor="shieldBacks" id="shieldBacksLabel">
        Shield Backs:{" "}
      </label>
      <input
        type="checkbox"
        id="shieldBacks"
        name="shieldBacks"
        value="shieldBacks"
        onChange={app.readForm}
      />
      <br /> */}
          {/* Control Cities */}
          {/* <label htmlFor="controlText" id="controlCitiesLabel">
        Control Cities:
      </label>
      <textarea
        id="controlText"
        wrap="hard"
        rows="4"
        onBlur={app.readForm}
      ></textarea>
      <br /> */}
          <ParagraphBox
            label="Control Cities:"
            defaultValue="New Sign"
            onChange={(evt) => app.changeControlCities(evt.target.value)}
          />
          {/* Arrows */}
          {/* <label htmlFor="guideArrow">Arrows:</label>
      <select id="guideArrow" onChange={app.readForm}></select> */}
          {/* <input
            type="number"
            id="guideArrowLanes"
            name="guideArrowLanes"
            min={1}
            max={6}
            onBlur={app.readForm}
        /> */}
          <div>
            <Dropdown
              label="Arrows:"
              options={[
                { label: "None", value: "none" },
                { label: "Side Left", value: "sideLeft" },
                { label: "Side Right", value: "sideRight" },
                { label: "Exit Only", value: "exitOnly" },
                { label: "Left/Down Arrow", value: "leftDown" },
                { label: "Left Arrow", value: "left" },
                { label: "Left/Up Arrow", value: "leftUp" },
                { label: "Right/Down Arrow", value: "rightDown" },
                { label: "Right Arrow", value: "right" },
                { label: "Right/Up Arrow", value: "rightUp" },
                { label: "Down Arrow", value: "down" },
                { label: "Up Arrow", value: "up" },
              ]}
            />
            <NumberBox min={1} max={6} />
          </div>
          {/* <br /> */}
          {/* <label htmlFor="otherSymbol">Other Bottom Symbols:</label>
      <select id="otherSymbol" onChange={app.readForm}>
        <input
          type="text"
          id="oSNum"
          name="oSNum"
          placeholder="Exit Num"
          onBlur={app.readForm}
        />
      </select> */}
          <Dropdown
            label="Other Bottom Symbols:"
            options={[
              { label: "None", value: "none" },
              { label: "Quebec-Style Exit Marker", value: "quebecExit" },
              { label: "Quebec-Left", value: "quebecLeft" },
            ]}
          />
          <Textbox
            placeholder="Action Message"
            label="Action Message:"
            onChange={(evt) => app.changeActionMessage(evt.target.value)}
          />
          {/* <br /> */}
          {/* <label htmlFor="actionMessage" id="actionMessageLabel">
        Action Message:{" "}
      </label>
      <input
        type="text"
        id="actionMessage"
        name="actionMessage"
        placeholder="Action Message"
        onBlur={app.readForm}
      />
      <br /> */}
        </form>
      </main>
    </>
  );
}

export default App;
