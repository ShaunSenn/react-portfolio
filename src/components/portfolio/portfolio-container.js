import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";



export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: []
    };
    //I must ALWAYS bind my functions inside of a constructor()
    this.handleFilter = this.handleFilter.bind(this);
    this.getPortfolioItems = this.getPortfolioItems.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

  getPortfolioItems() {
    axios.get('https://shaunsenn.devcamp.space/portfolio/portfolio_items')
  .then(response => {
    // handle success
    console.log("response data", response);
    this.setState({
      data: response.data.portfolio_items // I traverse this in the browser console to understand the transition from response to data to portfolio_items
    })
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
  }
//Below is implementation of the "key" prop
  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }


componentDidMount() {
   this.getPortfolioItems();
}

// Notice my componentDidMount() lifecycle is written right before 
// the render call.

  render() {
    if(this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="portfolio-items-wrapper">
        <button className='btn' onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
        <button className='btn' onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
        <button className='btn' onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
        {this.portfolioItems()}
      </div>
    );
  }
}



// // What's happening here?

// // First I import React and Component
// import React, { Component } from "react";

// import PortfolioItem from './portfolio-item';

// export default class PortfolioContainer extends Component {
//     constructor() {
//         super();

//         this.state = {
//             pageTitle: "Welcome to my portfolio",
//             data: [
//                 {title: "Quip"},
//                 {title: "Eventbrite"},
//                 {title: "Ministry Safe"},
//                 {title: "SwingAway"}
//             ]
//         };
//     }

// // custom function using map to loop over data
//     portfolioItems(){
//         const data = ["Quip", "Eventbrite", "Ministry Safe"];

//         return data.map(item => {
            
//         });
//     }
// //(15)Great Example of how to Change State Values
//     handlePageTitleUpdate() {
//         this.setState({
//             pageTitle: "Something Else"
//         });
//     }
//(15)Click Handler below so we can click on a button and have React
//listen for that event...

//     render() {
//         return (
//             <div>
//                 <h2>{this.state.pageTitle}</h2>

//                 {this.portfolioItems()}

//                 <hr/>

//                 <button onClick={this.handlePageTitleUpdate}>Change Title</button>            
            
//             </div>
//         );
//     }
// }
// Then I want to define the class
// Then I need a render method, whenever using class based components
// I always need a render method.
// Then I will use JSX, which looks a lot like HTML
// The <h2></h2> tag doesn't show up because I have only defined
// the class, I've created the component.

// To call this I need to go to app.js
// To get it to show up on the page I have to call it from 
// wherever I want it to show up.
// So I can call this component by importing it and calling it 
// directly in our application.

// WHEN IMPORTING SOMETHING FROM A FILE THAT I'VE CREATED 
// I NEED TO PASS IN THE ACTUAL PATH FOR THAT FILE.