import React, {Component} from "react";
import PropTypes from 'prop-types'


class PersianNumber extends Component {


   render() {
        if(! this.props.text && this.props.number === undefined)
            return <span></span>
        let en_number = this.props.text ? this.props.text : this.props.number.toString();
        let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        let persianMap = persianDigits.split("");
        let persian_number = en_number.replace(/\d/g, function (m) {
            return parseInt(m) !== NaN ? persianMap[parseInt(m)] : m;
        });

    return (
        <span>{persian_number}</span>
    )


  }

}


PersianNumber.propTypes = {
    number: PropTypes.number,
    text: PropTypes.string
}

PersianNumber.defaultProps = {
    number: undefined,
    text: ''
}

export default PersianNumber
