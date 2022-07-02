import React from 'react'


export default function ThemeProvider(props) {

    return (
        <>
        <img id="icon" src='logo.png' alt='icon' />
        {props.children}
        <div className="status-block">
        </div>
        </>
    )
}