import React from 'react';
import './TabSelector.css';

const tabSelector = (props) => {
    const tabs = props.tabs ? props.tabs.map(tab => <div className={`${props.selected === tab ? 'selected' : ''} tab`} onClick={() => props.click(tab)} key={tab} >{tab}</div>) : null;

    return (
        <div className="TabSelector">
            {tabs}
        </div>
    )
}

export default tabSelector;