import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    static propTypes ={
        history: PropTypes.object
    }
    myInput = React.createRef();

    goToStore = (event) => {
        //Stop form from submitting
        event.preventDefault();
        //get text from input
        const storeName = this.myInput.current.value;
        //change page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);

    }
    render() {
        return (
        <React.Fragment>
            { /* comments must go in curly braces
                with JS block comment notation */ }
            <p>Fish!</p>
        <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input 
                type="text" 
                ref={this.myInput}
                required 
                placeholder="Store Name" 
                defaultValue={getFunName()}/>
            <button type="submit">Visit Store>></button>
        </form>
        </React.Fragment>
        )
    }
}

export default StorePicker;