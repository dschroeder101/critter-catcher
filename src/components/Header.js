import React, { Component } from 'react';

class Header extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Welcome to critter-catcher!</h1>
                    <p>Select a hemisphere below to see which critters are currently available for you to catch in Animal Crossing: New Horizons</p>
                </header>
            </div>
        );
    }
}

export default Header;