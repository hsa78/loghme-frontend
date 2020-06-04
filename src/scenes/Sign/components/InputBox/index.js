import React from 'react';
import './style.css';
import PropTypes from 'prop-types';



class InputBox extends React.Component{

    render(){
        return (
            <div className="inputBox"  style={this.props.style}>
                <i className={this.props.iconClassName}></i>
                <input 
                    type={this.props.inputType} 
                    name={this.props.name} 
                    onChange={(e) => this.props.onChange(e, this.props.setter)} 
                    value={this.props.value}
                />
                <label htmlFor={this.props.name}>{this.props.title}</label>
            </div>
        );
    }
}

InputBox.propTypes = {
    style: PropTypes.object,
    iconClassName: PropTypes.string,
    inputType: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    setter: PropTypes.func
}

InputBox.defaultProps = {
    style: null,
    iconClassName: '',
    inputType: 'text',
    name: '',
    onChange: (e,s)=>{},
    value: undefined,
    title: '',
    setter: (k)=>{}
}

export default InputBox