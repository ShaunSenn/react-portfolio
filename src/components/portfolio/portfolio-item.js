import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
  constructor(props){
    super(props); //super is here to bring in all of the behavior from the Component class
  
    this.state = {
      portfolioItemClass: ""
    };
  }
  //Below are the methods that handle the events.
  handleMouseEnter() {
    this.setState({portfolioItemClass: 'image-blur'});
  }

  handleMouseLeave() {
    this.setState({ portfolioItemClass: ""});
  }
  // Data that we'll need
  // - background image: thumb_image_url
  // - logo
  // - description: description
  // - id: id
  //!!REMEMBER!! class components need a render method
render(){
  const {id, description, thumb_image_url, logo_url} = this.props.item;
  //destructuring is being done on line 27
  return (
    <div className="portfolio-item-wrapper"
    onMouseEnter={() => this.handleMouseEnter()}
    onMouseLeave={() => this.handleMouseLeave()}
    >

      <div
        className={"portfolio-img-background " + this.state.portfolioItemClass}
        style={{
          backgroundImage: "url(" + thumb_image_url + ")"
        }}
      />

      <div className="img-text-wrapper">
        <div className="logo-wrapper">
          <img src={logo_url} />
        </div>

        <div className="subtitle">{description}</div>
      </div>
    </div>
  );
  }
}
// Code between lines 11 and 16 makes it to where we don't have
//to use props because we're only calling it one time.
// Instead of hard coding the names we now have the ability to pass 
//in the item directly.