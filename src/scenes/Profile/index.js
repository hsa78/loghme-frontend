import React from 'react';
import InfoBox from './components/InfoBox'
import TabFolderContainer from './components/TabFolderContainer'


function Profile(props){
    return (
        <React.Fragment>
            <InfoBox />
            <TabFolderContainer />
        </React.Fragment>
    );
}

export default Profile