import ReleaseDateDisplay from "../../../components/ReleaseDateDisplay";

const RobotDetails = (props) => {
  const { robot } = props;

  const renderBooleanTableRow = (label, value) => (
    <tr>
      <th style={{ width: '50%' }}>{label}</th>
      <td
        style={{
          width: '50%',
          color: value === true ? 'green' : value === false ? 'red' : 'gray',
        }}
      >
        {value === true ? 'YES' : value === false ? 'NO' : 'N/A'}
      </td>
    </tr>
  );
  const renderStringTableRow = (label, value, addition) => (
    <tr>
      <th style={{ width: "50%" }}>{label}</th>
      <td>
        {value === null ? (
          "N/A"
        ) : (
          <span dangerouslySetInnerHTML={{ __html: `${value} ${addition}` }} />
        )}
      </td>
    </tr>
  );

  return (
    <div className="mt-4">
      {robot && (
        <>
          <h5 className="fw-bolder" style={{ marginBottom: "10px" }}>
            {robot.model} Specs & Features
          </h5>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                  🧭 Navigation
                </th>
              </tr>
            </thead>
            <tbody>
              {renderBooleanTableRow("Mapping / Path planning", robot.mapping)}
              {renderStringTableRow("Mapping Sensor Type",robot.mappingSensorType,"")}
              {renderBooleanTableRow("High-Precision Map",robot.highPrecisionMap)}
              {renderBooleanTableRow("Objects recognition (front camera)",robot.frontCamera)}
              {renderBooleanTableRow("Magnetic/Optical Virtual Walls",robot.control.magneticVirtualWalls)}
              {renderStringTableRow("Barrier-cross Height",robot.cleaningFeatures.barrierCrossHeight,"mm")}
              {renderStringTableRow("Сleaning Area",robot.cleaningFeatures.cleaningArea,"m&sup2;")}
              {renderBooleanTableRow("Anti-drop / Cliff Sensor",robot.sensor.cliffSensor)}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2"style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                  🧹 Cleaning Features
                </th>
              </tr>
            </thead>
            <tbody>
            {renderStringTableRow("Suction Power",robot.cleaningFeatures.suctionPower,"Pa")}
            {renderStringTableRow("Dustbin Capacity",robot.cleaningFeatures.dustbinCapacity,"ml")}
            {renderBooleanTableRow("Automatic Dirt Disposal",robot.cleaningFeatures.autoDirtDisposal)}
            {renderBooleanTableRow("Disposable dustbag capacity",robot.cleaningFeatures.disposableDustBagCapacity)}
            {renderBooleanTableRow("HEPA filter",robot.cleaningFeatures.hepaFilter)}
            {renderBooleanTableRow("Washable Filter",robot.cleaningFeatures.washableFilter)}
            {renderStringTableRow("Side Brushes (one or two)",robot.sideBrushes,"")}
            {renderBooleanTableRow("Carpet Boost", robot.sensor.carpetBoost)}
            {renderBooleanTableRow("Dirt Sensor", robot.sensor.dirtSensor)}
            {renderBooleanTableRow("Full Dustbin Sensor",robot.sensor.fullDustbinSensor)}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                  🧽 Mopping features
                </th>
              </tr>
            </thead>
            <tbody>
              {renderBooleanTableRow("Wet Mopping",robot.moppingFeatures.wetMopping)}
              {renderBooleanTableRow("Electric water flow control",robot.moppingFeatures.electricWaterFlowControl)}
              {renderStringTableRow("Water Tank Capacity",robot.moppingFeatures.waterTankCapacity,"ml")}
              {renderBooleanTableRow("Vibrating mopping pad",robot.moppingFeatures.vibratingMoppingPad)}
              {renderBooleanTableRow("Automatic mop lifting",robot.moppingFeatures.autoMopLifting)}
              {renderBooleanTableRow("Auto water tank refilling",robot.moppingFeatures.autoWaterTankRefilling)}
              {renderBooleanTableRow("Auto mop washing",robot.moppingFeatures.autoMopWashing)}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                  🔋 Battery
                </th>
              </tr>
            </thead>
            <tbody>
            {renderStringTableRow("Battery Capacity",robot.moppingFeatures.waterTankCapacity,"")}
            {renderStringTableRow("Battery life",robot.battery.batteryLife,"")}
            {renderBooleanTableRow("Recharge & Resume", robot.rechargeResume)}
            {renderBooleanTableRow("Charging Time", robot.battery.chargingTime)}
            {renderBooleanTableRow("Autocally Docks and Recharges",robot.autoDockAndRecharge)}
            {renderBooleanTableRow("Rated Power (Watts)",robot.battery.ratedPower)}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th
                  colSpan="2"
                  style={{ backgroundColor: "rgb(240, 240, 240)" }}
                >
                  ⚙ Usability & Control
                </th>
              </tr>
            </thead>
            <tbody>
              {renderBooleanTableRow("Wi-Fi / Smartphone App",robot.control.wifiSmartphoneApp)}
              {renderBooleanTableRow("Scheduling", robot.control.scheduling)}
              {renderBooleanTableRow("IR/RF Remote Control",robot.control.irRfRemoteControl)}
              {renderStringTableRow("Wi-Fi Frequency Band",robot.control.wifiFrequencyBand,"")}
              {renderBooleanTableRow("Amazon Alexa Support",robot.control.amazonAlexaSupport)}
              {renderBooleanTableRow("Google Assistant Support",robot.control.googleAssistantSupport)}
              {renderBooleanTableRow("Display", robot.display)}
              {renderBooleanTableRow("Voice Prompts", robot.voicePrompts)}
              {renderStringTableRow("Noise Level",robot.noiseLevel,"")}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                  📱 App Features
                </th>
              </tr>
            </thead>
            <tbody>
              {renderBooleanTableRow("Real-time tracking",robot.appFeatures.realTimeTracking)}
              {renderBooleanTableRow("Digital Blocked Areas",robot.appFeatures.digitalBlockedAreas)}
              {renderBooleanTableRow("Zoned cleaning",robot.appFeatures.zonedCleaning)}
              {renderBooleanTableRow("Multi-floor maps",robot.appFeatures.multiFloorMaps)}
              {renderBooleanTableRow("Manual movement control",robot.appFeatures.manualMovementControl)}
              {renderBooleanTableRow("Selected Room Cleaning",robot.appFeatures.selectedRoomCleaning)}
              {renderBooleanTableRow("No-mop zones",robot.appFeatures.noMopZones)}
            </tbody>
          </table>
          <table className="table table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
                 Other Specifications
                </th>
              </tr>
            </thead>
            <tbody>
            {renderStringTableRow("Weight",robot.otherSpecifications.weight,"kg")}
            {renderStringTableRow("Width",robot.otherSpecifications.width,"cm")}
            {renderStringTableRow("Height",robot.otherSpecifications.height,"cm")}
            {renderStringTableRow("In the box",robot.otherSpecifications.inTheBox,"")}
            <tr>
                <th>Release Date</th>
                <td>
                  <ReleaseDateDisplay
                    releaseDate={robot.otherSpecifications.releaseDate}/>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RobotDetails;
