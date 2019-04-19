import React from 'react';

const todo = (props) => {
    return (
        <div>
            <span onClick={function () {props.setName()}} >COMPONENT - TODO - LOADED</span>
        </div>
    )
}

export default todo;
