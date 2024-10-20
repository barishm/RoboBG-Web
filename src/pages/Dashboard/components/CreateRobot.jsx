import { useCreateRobotMutation } from "../../../app/services/robotApiSlice";
import { useFormik } from 'formik';
import { cleanFormValues } from "../../../helpers/utils";
import { useSelector } from "react-redux";


const CreateRobot = () => {
    const { accessToken } = useSelector((state) => state.auth);

    const [createRobot] = useCreateRobotMutation();

    const create = async (robotBody) => {
        await createRobot({robotBody, accessToken}).unwrap();
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            brand: "",
            model: "",
            bests: "false",
            mapping: "null",
            mappingSensorType: "",
            highPrecisionMap: "null",
            frontCamera: "null",
            rechargeResume: "null",
            autoDockAndRecharge: "null",
            noiseLevel: "",
            display: "null",
            sideBrushes: "",
            voicePrompts: "null",
            cleaningFeatures: {
                suctionPower: "",
                cleaningArea: "",
                dustbinCapacity: "",
                disposableDustBagCapacity: "",
                autoDirtDisposal: "null",
                barrierCrossHeight: "",
                hepaFilter: "null",
                washableFilter: "null"
            },
            moppingFeatures: {
                wetMopping: "null",
                electricWaterFlowControl: "null",
                waterTankCapacity: "",
                vibratingMoppingPad: "null",
                autoMopLifting: "null",
                autoWaterTankRefilling: "null",
                autoMopWashing: "null"
            },
            battery: {
                batteryCapacity: "",
                batteryLife: "",
                chargingTime: "",
                ratedPower: ""
            },
            control: {
                scheduling: "null",
                wifiSmartphoneApp: "null",
                wifiFrequencyBand: "",
                amazonAlexaSupport: "null",
                googleAssistantSupport: "null",
                magneticVirtualWalls: "null",
                irRfRemoteControl: "null"
            },
            appFeatures: {
                realTimeTracking: "null",
                digitalBlockedAreas: "null",
                zonedCleaning: "null",
                multiFloorMaps: "null",
                manualMovementControl: "null",
                selectedRoomCleaning: "null",
                noMopZones: "null"
            },
            sensor: {
                carpetBoost: "null",
                cliffSensor: "null",
                dirtSensor: "null",
                fullDustbinSensor: "null"
            },
            otherSpecifications: {
                weight: "",
                width: "",
                height: "",
                inTheBox: "",
                releaseDate: ""
            }
        },
        onSubmit: values => {
          const robotBody = cleanFormValues(values);
          create(robotBody);
        },
    });



    return(
      <>
      <button
        type="button"
        className="btn btn-success btn-sm ml-2 me-1"
        data-bs-toggle="modal"
        data-bs-target="#create"
      >
        Create
      </button>
      <div
        className="modal fade"
        id="create"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Robot
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="form-inputs">
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Brand</label>
            <input className="form-control form-control-sm" type="text" name="brand" onChange={formik.handleChange} value={formik.values.brand}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Model</label>
            <input className="form-control form-control-sm" type="text" name="model" onChange={formik.handleChange} value={formik.values.model}></input>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">One of bests</label>
            <select className="form-control form-control-sm" name="bests" onChange={formik.handleChange} value={formik.values.bests}>
              <option value="false">NO</option>
              <option value="true">YES</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping</label>
            <select className="form-control form-control-sm" name="mapping" onChange={formik.handleChange} value={formik.values.mapping}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Mapping Sensor Type</label>
            <input className="form-control form-control-sm" type="text" name="mappingSensorType" onChange={formik.handleChange} value={formik.values.mappingSensorType} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">High Precision Map</label>
            <select className="form-control form-control-sm" name="highPrecisionMap" onChange={formik.handleChange} value={formik.values.highPrecisionMap}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Front Camera</label>
            <select className="form-control form-control-sm" name="frontCamera" onChange={formik.handleChange} value={formik.values.frontCamera}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Recharge Resume</label>
            <select className="form-control form-control-sm" name="rechargeResume" onChange={formik.handleChange} value={formik.values.rechargeResume}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dock And Recharge</label>
            <select className="form-control form-control-sm" name="autoDockAndRecharge" onChange={formik.handleChange} value={formik.values.autoDockAndRecharge}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Noise Level</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="noiseLevel" onChange={formik.handleChange} value={formik.values.noiseLevel} aria-label=".form-control-sm example"/>
            <span className="input-group-text">dB</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Display</label>
            <select className="form-control form-control-sm" name="display" onChange={formik.handleChange} value={formik.values.display}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Side Brushes</label>
            <input className="form-control form-control-sm" type="text" name="sideBrushes" onChange={formik.handleChange} value={formik.values.sideBrushes} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Voice Prompts</label>
            <select className="form-control form-control-sm" name="voicePrompts" onChange={formik.handleChange} value={formik.values.voicePrompts}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Suction Power</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="number" name="cleaningFeatures.suctionPower" onChange={formik.handleChange} value={formik.values.cleaningFeatures.suctionPower} aria-label=".form-control-sm example"/>
            <span className="input-group-text">Pa</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cleaning Area</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.cleaningArea" onChange={formik.handleChange} value={formik.values.cleaningFeatures.cleaningArea} aria-label=".form-control-sm example"/>
            <span className="input-group-text">m&sup2;</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dustbin Capacity</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="number" name="cleaningFeatures.dustbinCapacity" onChange={formik.handleChange} value={formik.values.cleaningFeatures.dustbinCapacity} aria-label=".form-control-sm example"/>
            <span className="input-group-text">ml</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Disposable Dust Bag Capacity</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.disposableDustBagCapacity" onChange={formik.handleChange} value={formik.values.cleaningFeatures.disposableDustBagCapacity} aria-label=".form-control-sm example"/>
            <span className="input-group-text">L</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Dirt Disposal</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.autoDirtDisposal" onChange={formik.handleChange} value={formik.values.cleaningFeatures.autoDirtDisposal}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Barrier Cross Height</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="cleaningFeatures.barrierCrossHeight" onChange={formik.handleChange} value={formik.values.cleaningFeatures.barrierCrossHeight} aria-label=".form-control-sm example"/>
            <span className="input-group-text">mm</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Hepa Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.hepaFilter" onChange={formik.handleChange} value={formik.values.cleaningFeatures.hepaFilter}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Washable Filter</label>
            <select className="form-control form-control-sm" name="cleaningFeatures.washableFilter" onChange={formik.handleChange} value={formik.values.cleaningFeatures.washableFilter}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wet Mopping</label>
            <select className="form-control form-control-sm" name="moppingFeatures.wetMopping" onChange={formik.handleChange} value={formik.values.moppingFeatures.wetMopping}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Electric Water Flow Control</label>
            <select className="form-control form-control-sm" name="moppingFeatures.electricWaterFlowControl" onChange={formik.handleChange} value={formik.values.moppingFeatures.electricWaterFlowControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Water Tank Capacity</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="number" name="moppingFeatures.waterTankCapacity" onChange={formik.handleChange} value={formik.values.moppingFeatures.waterTankCapacity} aria-label=".form-control-sm example"/>
            <span className="input-group-text">ml</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Vibrating Mopping Pad</label>
            <select className="form-control form-control-sm" name="moppingFeatures.vibratingMoppingPad" onChange={formik.handleChange} value={formik.values.moppingFeatures.vibratingMoppingPad}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>

            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Lifting</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopLifting" onChange={formik.handleChange} value={formik.values.moppingFeatures.autoMopLifting}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Water Tank Refilling</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoWaterTankRefilling" onChange={formik.handleChange} value={formik.values.moppingFeatures.autoWaterTankRefilling}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            <label htmlFor="exampleFormControlInput1" className="form-label">Auto Mop Washing</label>
            <select className="form-control form-control-sm" name="moppingFeatures.autoMopWashing" onChange={formik.handleChange} value={formik.values.moppingFeatures.autoMopWashing}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Capacity</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="battery.batteryCapacity" onChange={formik.handleChange} value={formik.values.battery.batteryCapacity} aria-label=".form-control-sm example"/>
            <span className="input-group-text">mAh</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Battery Life</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="battery.batteryLife" onChange={formik.handleChange} value={formik.values.battery.batteryLife} aria-label=".form-control-sm example"/>
            <span className="input-group-text">min</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Charging Time</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="battery.chargingTime" onChange={formik.handleChange} value={formik.values.battery.chargingTime} aria-label=".form-control-sm example"/>
            <span className="input-group-text">min</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Rated Power</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="battery.ratedPower" onChange={formik.handleChange} value={formik.values.battery.ratedPower} aria-label=".form-control-sm example"/>
            <span className="input-group-text">W</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Scheduling</label>
            <select className="form-control form-control-sm" name="control.scheduling" onChange={formik.handleChange} value={formik.values.control.scheduling}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Ir Rf RemoteControl</label>
            <select className="form-control form-control-sm" name="control.irRfRemoteControl" onChange={formik.handleChange} value={formik.values.control.irRfRemoteControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Smartphone App</label>
            <select className="form-control form-control-sm" name="control.wifiSmartphoneApp" onChange={formik.handleChange} value={formik.values.control.wifiSmartphoneApp}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Wifi Frequency Band</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="control.wifiFrequencyBand" onChange={formik.handleChange} value={formik.values.control.wifiFrequencyBand} aria-label=".form-control-sm example"/>
            <span className="input-group-text">GHz</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Amazon Alexa Support</label>
            <select className="form-control form-control-sm" name="control.amazonAlexaSupport" onChange={formik.handleChange} value={formik.values.control.amazonAlexaSupport}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Google Assistant Support</label>
            <select className="form-control form-control-sm" name="control.googleAssistantSupport" onChange={formik.handleChange} value={formik.values.control.googleAssistantSupport}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Magnetic Virtual Walls</label>
            <select className="form-control form-control-sm" name="control.magneticVirtualWalls" onChange={formik.handleChange} value={formik.values.control.magneticVirtualWalls}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Real Time Tracking</label>
            <select className="form-control form-control-sm" name="appFeatures.realTimeTracking" onChange={formik.handleChange} value={formik.values.appFeatures.realTimeTracking}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Digital Blocked Areas</label>
            <select className="form-control form-control-sm" name="appFeatures.digitalBlockedAreas" onChange={formik.handleChange} value={formik.values.appFeatures.digitalBlockedAreas}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Zoned Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.zonedCleaning" onChange={formik.handleChange} value={formik.values.appFeatures.zonedCleaning}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Multi Floor Maps</label>
            <select className="form-control form-control-sm" name="appFeatures.multiFloorMaps" onChange={formik.handleChange} value={formik.values.appFeatures.multiFloorMaps}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Manual Movement Control</label>
            <select className="form-control form-control-sm" name="appFeatures.manualMovementControl" onChange={formik.handleChange} value={formik.values.appFeatures.manualMovementControl}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Selected Room Cleaning</label>
            <select className="form-control form-control-sm" name="appFeatures.selectedRoomCleaning" onChange={formik.handleChange} value={formik.values.appFeatures.selectedRoomCleaning}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">No Mop Zones</label>
            <select className="form-control form-control-sm" name="appFeatures.noMopZones" onChange={formik.handleChange} value={formik.values.appFeatures.noMopZones}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Carpet Boost</label>
            <select className="form-control form-control-sm" name="sensor.carpetBoost" onChange={formik.handleChange} value={formik.values.sensor.carpetBoost}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Cliff Sensor</label>
            <select className="form-control form-control-sm" name="sensor.cliffSensor" onChange={formik.handleChange} value={formik.values.sensor.cliffSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Dirt Sensor</label>
            <select className="form-control form-control-sm" name="sensor.dirtSensor" onChange={formik.handleChange} value={formik.values.sensor.dirtSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Full Dustbin Sensor</label>
            <select className="form-control form-control-sm" name="sensor.fullDustbinSensor" onChange={formik.handleChange} value={formik.values.sensor.fullDustbinSensor}>
              <option value="null">N/A</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Weight</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.weight" onChange={formik.handleChange} value={formik.values.otherSpecifications.weight} aria-label=".form-control-sm example"/>
            <span className="input-group-text">kg</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Width</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.width" onChange={formik.handleChange} value={formik.values.otherSpecifications.width} aria-label=".form-control-sm example"/>
            <span className="input-group-text">cm</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Height</label>
            <div className="input-group">
            <input className="form-control form-control-sm" type="text" name="otherSpecifications.height" onChange={formik.handleChange} value={formik.values.otherSpecifications.height} aria-label=".form-control-sm example"/>
            <span className="input-group-text">cm</span>
            </div>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">In The Box</label>
            <textarea className="form-control form-control-sm" type="text" name="otherSpecifications.inTheBox" onChange={formik.handleChange} value={formik.values.otherSpecifications.inTheBox} aria-label=".form-control-sm example"/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Release Date</label>
            <input className="form-control form-control-sm" type="date" name="otherSpecifications.releaseDate" onChange={formik.handleChange} value={formik.values.otherSpecifications.releaseDate} aria-label=".form-control-sm example"/>
            </div>
            </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {formik.resetForm()}}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                Create
              </button>
            </div>
            </form>
          </div>
        </div>
        </div>
        </>
    )
}

export default CreateRobot;