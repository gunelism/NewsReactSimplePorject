import React from 'react';
import '../articles.css';
import moment from 'moment';

const formDate = (date) => {
    return moment(date).format(' DD-MM-YYYY')
}

const postData = (props) => (
    <div className="articlePostData">
        <div>
            Date: <span>{formDate(props.data.date)}</span>
        </div>
        <div>
            Author: <span>{props.data.author}</span>
        </div>
    </div>
)

export default postData;