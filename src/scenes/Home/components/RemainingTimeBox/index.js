import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import PersianNumber from '../../../../util/util';

class RemainingTimeBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {counDownTimer: ()=>{}}
    }
    
    componentDidMount(){
        this.setState({counDownTimer: setInterval(()=>{
            const curMinute = this.props.remainingTime.minutes;
            const curSecond = this.props.remainingTime.seconds;
    
            if(curSecond > 0){
                this.props.timeSetter({minutes: curMinute, seconds: curSecond - 1});
            }
            else if(curSecond === 0){
                if(curMinute === 0){
                    clearInterval(this.state.counDownTimer);
                }
                else{
                    this.props.timeSetter({minutes: curMinute - 1, seconds: 59});
                }
            }
        }, 1000)})
    }

    componentWillUnmount(){
        clearInterval(this.state.counDownTimer);
    }
    
    render(){

        return(
            <div className={styles['remaining-time-box']}>
                زمان باقی‌مانده:
                <p className={`${styles['remaining-time']}`}>
                    <PersianNumber 
                        text = {`${this.props.remainingTime.minutes}:${this.props.remainingTime.seconds < 10 
                        ? `0${this.props.remainingTime.seconds}` 
                        : this.props.remainingTime.seconds}`}
                    />
                </p>
            </div>
        );
    }
}

RemainingTimeBox.propTypes = {
    remainingTime: PropTypes.object,
    timeSetter: PropTypes.func
}

RemainingTimeBox.defaultProps = {
    remainingTime: {minutes:0, seconds:0},
    timeSetter: (obj) => {}
}

export default RemainingTimeBox