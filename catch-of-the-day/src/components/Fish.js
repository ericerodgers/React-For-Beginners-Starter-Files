import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        addToOrder: PropTypes.func,
    };
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    //OR instead of creating a handClick function,
    //you could just use this event handler down in the button:
    //onClick={() => this.props.addToOrder(this.props.index)} 
    render () {
        //the below line is ES6 destructuring
        //it will create const image = this.props.details.image
        //and const name = this.props.details.name, etc
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status ==='available';
        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>
                    {isAvailable ? 'Add To Order' : 'Sold Out'}
                </button>
            </li>
        )
    }
}

export default Fish;