import React from 'react';
import FontAwesome from 'react-fontawesome';
import './cardInfo.css';
import moment from 'moment';

const cardInfo = (props) => {
    const teamName = (teams,team_id) =>{
        let data = teams.find((item)=>{
            return item.teamId===team_id
        })
        return (data ? data.name : null);
    }
    const formDate = (date) =>{
        return moment(date).format(' DD-MM-YYYY');
    }
    return(
        <div className="cardNfo">
            <span className="teamName">
                {teamName(props.teams,props.team)}
            </span>
            <span className="date">
                <FontAwesome name="clock-o" /> 
                {formDate(props.date)}
            </span>
        </div>
    );
}

export default cardInfo;