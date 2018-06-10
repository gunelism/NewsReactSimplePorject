import React from 'react';
import TeamInfo from '../../Elements/teamInfo';

const header = (props) => {
    const teamInfo = (info) => {
        return info ? 
        <TeamInfo team={info}/>
        : null;
    }
    return (
        <div>
            {teamInfo(props.teamData)}
        </div>
    );
}

export default header;