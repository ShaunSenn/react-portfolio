import React from 'react';


const BlogFeaturedImage = props => { //we want to take in props here because we want to bring in the image prop
    if (!props.img) {
        return null;
    }

    return (
        <div className="featured-image-wrapper">
            <img src={props.img} />
        </div>
    );
};

export default BlogFeaturedImage;