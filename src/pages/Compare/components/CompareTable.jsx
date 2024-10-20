import { useSelector } from "react-redux";
import { addRobot,deleteRobotById } from "../../../app/redux/compareSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import { useLazyGetRobotByIdQuery, useGetAllRobotsQuery } from "../../../app/services/robotApiSlice";
import { useState, useEffect } from "react";
import ReleaseDateDisplay from "../../../components/ReleaseDateDisplay";
import SpecsRenderer from "../../../components/SpecsRenderer";

const CompareTable = () => {
  const queryParams = {
    fields: "model"
  };
  const noImage = "images/no-image.jpg";
  const lang = useSelector((state) => state.language.lang);
  const { robots } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const { data: allModels } = useGetAllRobotsQuery(queryParams);
  const [Model, setModel] = useState("");
  const [triggerAdd] = useLazyGetRobotByIdQuery();

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
  }, []);



  const deleteHandler = (e) => {
    const id = parseInt(e.target.dataset.id, 10);
    dispatch(deleteRobotById(id));
  };



  function handleAdd() {
    const foundItem = allModels.content.find((item) => item.model === Model);
    if (foundItem) {
      const id = foundItem.id;
      triggerAdd({id}).then((response) => {
        console.log("Response data:", response.data);
        dispatch(addRobot(response.data));
      });
    }
    setModel("");
  }

  const renderRow = (field) => {
    return robots.map((item) => {
      let value = field.includes('.') ? getFieldByPath(item, field) : item[field];
      return (
        <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border">
          {value === null ? (
            <span style={{ color: "grey" }}>N/A</span>
          ) : value === true ? (
            <span style={{ color: "green" }}>{lang === "en" ? "YES" : "ДА"}</span>
          ) : value === false ? (
            <span style={{ color: "red" }}>{lang === "en" ? "NO" : "НЕ"}</span>
          ) : (
            value
          )}
        </td>
      );
    });
  };
  const renderStringRow = (field,addition) => {
    return robots.map((item) => {
      let value = field.includes('.') ? getFieldByPath(item,field) : item[field];
      return(
        <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border">
          {value === null ? (
            <span style={{ color: "grey" }}>N/A</span>
          ) : (
            <>
              {value} {addition === "m²" ? <>m&sup2;</> : addition}
            </>
          )}
        </td>
      )
    });
  }
  function getFieldByPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    return value;
  }


  return (
    <div className="table-container" style={{overflowX: "auto",marginBottom:"50px",maxWidth:"1000px",marginLeft:"auto",marginRight:"auto"}}>
      {robots ? (
        <div className="table-responsive">
          <div style={{ display: "flex",maxWidth:"350px",marginLeft:"auto",marginRight:"auto" }} className="mb-1 mt-5" >
                <input
                  className="form-control me-2"
                  value={Model}
                  name="Model"
                  list="datalistOptions"
                  id="Model"
                  placeholder={lang === "en" ? "Choose robot from the list" : "Изберете робот от списъка"}
                  onChange={(e) => setModel(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleAdd}
                >
                  {lang === "en" ? "Add" : "Добави"}
                </button>
                <datalist id="datalistOptions">
                  {allModels.content.map((item) => (
                    <option key={item.id} value={item.model} />
                  ))}
                </datalist>
              </div>
          <table className="table table-comparison" style={{width:"auto",marginLeft:"auto",marginRight:"auto"}}>
            <thead>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                {robots.map((item) => (
                    <td key={item.id} className="border" style={{backgroundColor:"#212529",color: "#F5F5F5"}}>{item.model}</td>
                )
                )}
              </tr>
              <tr>
                <th scope="row">
                  
                </th>
                {robots.map((item) => (
                  <td key={item.id} style={{height:"90px",verticalAlign: "bottom", textAlign: "left"}} className="border">
                    <div className="image d-flex">
                      <img src={item.image || noImage} alt="..." style={{width:"70px",display:"block"}} ></img>
                      <div className="image-overlay ms-1">
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "#D60000", fontSize: "25px",cursor:"pointer"}}
                          data-id={item.id}
                          onClick={deleteHandler}
                        ></i>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "mapping" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "mappingDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("mapping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "mappingSensorType" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "mappingSensorTypeDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("mappingSensorType")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "highPrecisionMap" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "highPrecisionMapDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("highPrecisionMap")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "frontCamera" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "frontCameraDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("frontCamera")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "rechargeResume" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "rechargeResumeDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("rechargeResume")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "autoDockAndRecharge" })}  <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "autoDockAndRechargeDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("autoDockAndRecharge")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "noiseLevel" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "noiseLevelDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("noiseLevel","dB")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "display" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "displayDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("display")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "sideBrushes" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "sideBrushesDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sideBrushes")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "voicePrompts" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "voicePromptsDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("voicePrompts")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Cleaning Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "suctionPower" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "suctionPowerDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.suctionPower","Pa")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "cleaningArea" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "cleaningAreaDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.cleaningArea","m²")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "dustbinCapacity" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "dustbinCapacityDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.dustbinCapacity","ml")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "disposableDustBagCapacity" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "disposableDustBagCapacityDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.disposableDustBagCapacity","L")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "autoDirtDisposal" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "autoDirtDisposalDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.autoDirtDisposal")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "barrierCrossHeight" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "barrierCrossHeightDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("cleaningFeatures.barrierCrossHeight","mm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "hepaFilter" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "hepaFilterDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.hepaFilter")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "washableFilter" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "washableFilterDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("cleaningFeatures.washableFilter")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Mopping Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "wetMopping" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "wetMoppingDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.wetMopping")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "electricWaterFlowControl" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "electricWaterFlowControlDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.electricWaterFlowControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "waterTankCapacity" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "waterTankCapacityDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("moppingFeatures.waterTankCapacity","ml")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "vibratingMoppingPad" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "vibratingMoppingPadDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.vibratingMoppingPad")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "autoMopLifting" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "autoMopLiftingDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoMopLifting")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "autoWaterTankRefilling" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "autoWaterTankRefillingDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoWaterTankRefilling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "autoMopWashing" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "autoMopWashingDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("moppingFeatures.autoMopWashing")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Battery</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "batteryCapacity" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "batteryCapacityDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.batteryCapacity","mAh")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "batteryLife" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "batteryLifeDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.batteryLife","min")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "chargingTime" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "chargingTimeDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.chargingTime","min")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "ratedPower" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "ratedPowerDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("battery.ratedPower","W")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Control</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "scheduling" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "schedulingDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.scheduling")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "wifiSmartphoneApp" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "wifiSmartphoneAppDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.wifiSmartphoneApp")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "wifiFrequencyBand" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "wifiFrequencyBandDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("control.wifiFrequencyBand","GHz")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "amazonAlexaSupport" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "amazonAlexaSupportDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.amazonAlexaSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "googleAssistantSupport" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "googleAssistantSupportDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.googleAssistantSupport")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "magneticVirtualWalls" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "magneticVirtualWallsDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.magneticVirtualWalls")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "irRfRemoteControl" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "irRfRemoteControlDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("control.irRfRemoteControl")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>App Features</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "realTimeTracking" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "realTimeTrackingDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.realTimeTracking")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "digitalBlockedAreas" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "digitalBlockedAreasDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.digitalBlockedAreas")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "zonedCleaning" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "zonedCleaning" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.zonedCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "multiFloorMaps" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "multiFloorMapsDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.multiFloorMaps")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "manualMovementControl" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "manualMovementControlDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.manualMovementControl")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "selectedRoomCleaning" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "selectedRoomCleaningDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.selectedRoomCleaning")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "noMopZones" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "noMopZonesDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("appFeatures.noMopZones")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Sensor</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "carpetBoost" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "carpetBoostDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.carpetBoost")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "cliffSensor" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "cliffSensorDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.cliffSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "dirtSensor" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "dirtSensorDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.dirtSensor")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "fullDustbinSensor" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "fullDustbinSensorDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderRow("sensor.fullDustbinSensor")}
              </tr>
              <tr>
                <th></th>
                <td colSpan={robots.length} style={{backgroundColor:"#212529",color: "#F5F5F5"}}>Other Specifications</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "weight" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "weightDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("otherSpecifications.weight","kg")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "width" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "widthDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {renderStringRow("otherSpecifications.width","cm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "height" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "heightDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                
                {renderStringRow("otherSpecifications.height","cm")}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "inTheBox" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "inTheBoxDesc" })}
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {robots.map((item) => (
                    <td key={item.id} style={{paddingTop:"30px",verticalAlign: "bottom", textAlign: "left",width:"50px"}} className="border text-break">{item.otherSpecifications.inTheBox ? item.otherSpecifications.inTheBox : 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">
                  <span className="stickycell">{SpecsRenderer({ textKey: "releaseDate" })} <a tabIndex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" 
                  data-bs-content={SpecsRenderer({ textKey: "releaseDateDesc" })} 
                  style={{color:"#000000",cursor:"pointer"}}><i className="fa-regular fa-circle-question fa-xs"></i></a></span>
                </th>
                {robots.map((item) => (
                  <td key={item.id} style={{ height: "80px", verticalAlign: "bottom", textAlign: "left", whiteSpace: "normal" }} className="border"><ReleaseDateDisplay releaseDate={item.otherSpecifications.releaseDate} /></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default CompareTable;
