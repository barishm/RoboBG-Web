
const InitialOptions = ({ actionProvider }) => {
  const options = [
    { text: 'Какъв робот да избера?', handler: actionProvider.handleChooseRobot },
    { text: 'Имам проблем с моя робот', handler: actionProvider.handleRobotIssue },
    { text: 'Как се поддържа робота?', handler: actionProvider.handleMaintenance },
    { text: 'Свържи се с екипа', handler: actionProvider.handleContactTeam },
    { text: 'Искам дa ползвам сервизните услуги на RoboBG', handler: actionProvider.handleMaintenanceServices },
  ];

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={option.handler}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default InitialOptions;
