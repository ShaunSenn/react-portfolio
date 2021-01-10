import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

export default class App extends Component {
  constructor(props) { // I pass props here so I can pass all of the parent's data down to the child components
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [<Route path="/portfolio-manager" component={PortfolioManager}/>];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                this.authorizedPages()
              ) : null}
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import axios from 'axios';

// import NavigationContainer from './navigation/navigation-container';
// import Home from "./pages/home";
// import About from "./pages/about";
// import Contact from "./pages/contact";
// import Blog from "./pages/blog";
// import PortfolioDetail from "./portfolio/portfolio-detail";
// import Auth from "./pages/auth";
// import NoMatch from "./pages/no-match";


// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loggedInStatus: "NOT_LOGGED_IN"
//     }

//     this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
//     this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
//   }

//   handleSuccessfulLogin() {
//     this.setState({
//       loggedInStatus: "LOGGED_IN"
//     });
//   }

//   handleUnsuccessfulLogin() {
//     this.setState({
//       loggedInStatus: "NOT_LOGGED_IN"
//     });
//   }

//   checkLoginStatus() {
//     return axios
//       .get("https://api.devcamp.space/logged_in", { 
//         withCredentials: true
//     //axios returns a promise, with any promise we need to call "then"
//       })
//       .then(response => {
//         const loggedIn = response.data.logged_in;
//         const loggedInStatus = this.state.loggedInStatus;
//         console.log("logged_in return", response);
//       });
//   }
//  componentDidMount() {
//    this.checkLoginStatus();
//  }

//   //Code below is an API request

//   render() {
//     return (
//       <div className='container'>
//         <Router>
//           <div>
//             <NavigationContainer />

//             <h2>{this.state.loggedInStatus}</h2>

//               <Switch>
                
//                 <Route exact path="/" component={Home} />

//                 <Route 
//                   path="/auth" 
//                   render={props => (
//                     <Auth
//                       {...props}
//                       handleSuccessfulLogin={this.handleSuccessfulLogin}
//                       handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
//                     />
//                   )} 
//                 />

//                 <Route path="/about-me" component={About}/>
//                 <Route path="/contact" component={Contact}/>
//                 <Route path="/blog" component={Blog}/>
//                 <Route 
//                   exact 
//                   path="/portfolio/:slug" 
//                   component={PortfolioDetail}
//                 />
//                 <Route component={NoMatch}/>
//               </Switch>
//           </div>
//         </Router>
//       </div>
//     ); // My catch-all Route is always on the bottom in my switch component
//   }
// }    // Switch statements act like conditionals


// To get it to show up on the page I have to call it from 
// wherever I want it to show up. Here it's app.js in the 
// components file.
// So I can call this component by importing it and calling it 
// directly in our application.
//
// WHEN IMPORTING SOMETHING FROM A FILE THAT I'VE CREATED 
// I NEED TO PASS IN THE ACTUAL PATH FOR THAT FILE LIKE BELOW
// AND ABOVE IN LINE 4:
// import PortfolioContainer from "./portfolio-container"
// Line 11 I am actually calling the component