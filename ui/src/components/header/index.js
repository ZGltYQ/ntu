import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'


export default function Header (){

    return (
        <header className="menu-header">
            <div className="menu">
                <Link id="first" className="menu-button" to='/docx'>Генерировать docx</Link>
                <Link id="second" className="menu-button" to='/pdf'>Генерировать pdf</Link>
            </div>
        </header>
    )
}