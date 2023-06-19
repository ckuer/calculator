import "./ButtonBox.css";

// ButtonBox component for containing the calculator buttons
const ButtonBox = ({ children }) => {
    return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;