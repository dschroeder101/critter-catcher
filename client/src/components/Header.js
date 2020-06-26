import React, { Component } from 'react';

class Header extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Welcome to current-critters!</h1>
                    <h4>Select a hemisphere below to see which critters are currently available for you to catch in Animal Crossing: New Horizons</h4>
                </header>
            </div>
        );
    }
}

export default Header;