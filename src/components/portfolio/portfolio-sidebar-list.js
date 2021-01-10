import React from 'react';

const PortfolioSidebarList = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
            <div className="portfolio-item-thumb">
                <div className="portfolio-thumb-image">
                    <img src={portfolioItem.thumb_image_url} />
                    <h1 className="title">{portfolioItem.name}</h1>
                    <h2>{portfolioItem.id}</h2>
                </div>
            </div>
        )
    }) //whenever we want to iterate over a collection of data to build up a full component of data, like a column with imgs running down it then we use the map method like above

    return(
        <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>
    )
}

export default PortfolioSidebarList;