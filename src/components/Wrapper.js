import "./Wrapper.css";

// define Wrapper component, which holds all the children components in place
const Wrapper = ({children}) => {
    return <div className="wrapper">{children}</div>;
};

export default Wrapper;