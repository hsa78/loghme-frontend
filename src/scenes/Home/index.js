import React from 'react'
import HomeTitle from './components/HomeTitle'
import HomeContent from './components/HomeContent'

function Home(props){
    return (
        <React.Fragment>
            <HomeTitle />
            <HomeContent />
        </React.Fragment>
    );
}

export default Home