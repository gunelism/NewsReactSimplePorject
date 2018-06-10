import React from 'react';
import FontAwesome from 'react-fontawesome';
import './cardInfo.css';

const cardInfo = (props) => {
    const teamName = (teams,team_id) =>{
        let data = teams.find((item)=>{
            return item.id===team_id
        })
        return (data ? data.name : null);
    }
    return(
        <div className="cardNfo">
            <span className="teamName">
                {teamName(props.teams,props.team)}
            </span>
            <span className="date">
                <FontAwesome name="clock-o" /> 
                {props.date}
            </span>
        </div>
    );
}

export default cardInfo;