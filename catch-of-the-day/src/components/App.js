import React from 'react';
import PropTypes from "prop-types"
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
import sampleFishes from "../sample-fishes"
import Fish from "./Fish"
import base from "../base";

class App extends React.Component {
static propTypes = {
    match: PropTypes.object
}

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        //first, reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)  })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        )
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //to set a State:
        //take copy of the existing state
        const fishes = {...this.state.fishes};
        //add our new fish to fishes variable:
        fishes[`fish${Date.now()}`] = fish;
        //set new fishes object to State
        this.setState({
            fishes: fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
      };

    deleteFish = (key) => {
        //take a copy of state
        const fishes = { ...this.state.fishes };
        //update the state
        fishes[key] = null;
        //update state
        this.setState({ fishes });
    }
      
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = (key) => {
        //take a copy of state
        const order = {...this.state.order};
        //add to the order, or update amount in order
        order[key] = order[key] +1 || 1;
        //call setState to update our state object
        this.setState({ order });
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                            <Fish 
                                key={key} 
                                index={key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder} 
                                />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                    /> 
            </div>
        )
    }
}

export default App;