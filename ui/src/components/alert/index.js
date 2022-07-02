import React, { Component } from "react";
import './style.css'


export default class Alert extends Component {

    state = {
        hasError:false,
        message : ''
    }

    componentDidCatch(error, info){
        this.setState({
            message: error.message,
            hasError:true
        });
    }


    render() {
        if (this.state.hasError) {
            return (
                <div id="error-box">
                <div className="message"><h1 className="alert">Error!</h1><p>{this.state.message}</p></div>
                <button className="button-box" onClick={()=>{
                    this.setState({
                        hasError: false,
                        message: ''
                    })
                }}><h1 className="red">try again</h1></button>
                </div> 
            )   
        }

        return this.props.children

    }
}