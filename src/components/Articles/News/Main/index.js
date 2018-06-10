import React from 'react';
import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList'

const NewsMain = (props) => {
    return(
        <div>
            <NewsSlider
                type="featured"
                settings={{dots:false}}
                start={0}
                amount={3}
            />
            <NewsList
                type="main"
                loadmore={true}
                start={3}
                amount={3}
            />
        </div>
    );
}

export default NewsMain;