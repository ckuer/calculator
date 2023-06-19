import { Textfit } from "react-textfit"; // to shrink longer values in display output
import "./Screen.css";

const Screen = ({ value }) => {
    return (
        <Textfit className="screen" mode="single" max={70}>
            {value}
        </Textfit>
    );
};

export default Screen;