import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'

function UnderLinedTitle(props){
    return (
        <h4 className={styles.title}>{props.text }</h4>
    )
}

UnderLinedTitle.propTypes = {
    text: PropTypes.string
}

UnderLinedTitle.defaultProps = {
    text: ''
}

export default UnderLinedTitle