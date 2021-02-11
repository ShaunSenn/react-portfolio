import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

//hello


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);
        //the name, description, url, category, position, etc. all come from the Devcamp Space API
        //these attributes would be given to me in a real world application so I do not have to worry about where they come from
        this.state = {
            name: "",
            description: "",
            category: "eCommerce",
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();

    }

//handleThumbDrop must return specific set of items 
    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        };
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file })
        };
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file })
        };
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1 // I'm gonna have three files, each broken up into their own components. That's why I want to only allow for a max file size of one.
        };
    }

    buildForm() {
        let formData = new FormData(); //here i'm telling JS I want to create a new FormData object, once I have this I can add all of the other data points into it by using the append function supplied by JS
        //The append function is specially built for formData
        formData.append("portfolio_item[name]", this.state.name); // inside of the parens on the left side of the comma the function takes in a Key. After the comma is the Value.
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);
        
        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }

        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        
        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
        }

        return formData;
    }
//the state updates every single time a character is entered 
//into a form in react. the handler below allows the typed text
//to be rendered on the screen in the form being filled
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value //this line updates the state in the forms, allowing me to type and see letters show up in the form, remember there would otherwise be issue of not being able to see text typed into the form
        });
    }

    //Below code is to prevent the default behavior of HTML. 
    //In JavaScript and HTML the default behavior if I were to 
    //submit the form it would re-render, causing the page to 
    //refresh, the entire page which is not what you want in 
    //react.
    //What we want is React to be in charge of making changes on the pages. 
    handleSubmit(event) {
        axios.post("https://shaunsenn.devcamp.space/portfolio/portfolio_items", 
        this.buildForm(), 
        { withCredentials: true }
        ).then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
    
            this.setState({
                name: "",
                description: "",
                category: "eCommerce",
                position: "",
                url: "",
                thumb_image: "",
                banner_image: "",
                logo: ""
            });
    
            [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                ref.current.dropzone.removeAllFiles();
            })
        }).catch(error => {
            console.log("portfolio form handleSubmit error", error)
        });

        event.preventDefault();//THIS LINE KEEPS THE PAGE FROM REFRESHING
    }

    render() {
        return (            
                <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                    <div className="two-column">
                        <input
                        type="text"
                        name="name"
                        placeholder="Portfolio Item Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        />

                        <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleChange}
                        />
                    </div>

                    <div className="two-column">
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handleChange}
                        />

                        <select
                        name="category"                        
                        value={this.state.category}
                        onChange={this.handleChange}
                        className="select-element"
                        >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>

                    <div className="one-column">
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                    </div>

                    <div className="image-uploaders">
                        
                    <DropzoneComponent 
                        ref={this.thumbRef}
                        config={this.componentConfig()} //I am passing props here
                        djsConfig={this.djsConfig()}    //I am passing props here
                        eventHandlers={this.handleThumbDrop()} //eventHandlers is a property (prop) that is recognized by dropzone component
                    >
                        <div className="dz-message">Thumbnail</div>
                    </DropzoneComponent>
                    <DropzoneComponent 
                        ref = {this.bannerRef}
                        config={this.componentConfig()} //I am passing props here
                        djsConfig={this.djsConfig()}    //I am passing props here
                        eventHandlers={this.handleBannerDrop()} //eventHandlers is a property (prop) that is recognized by dropzone component
                    >
                        <div className="dz-message">Banner Image</div>
                    </DropzoneComponent>
                    <DropzoneComponent 
                        ref = {this.logoRef}
                        config={this.componentConfig()} //I am passing props here
                        djsConfig={this.djsConfig()}    //I am passing props here
                        eventHandlers={this.handleLogoDrop()} //eventHandlers is a property (prop) that is recognized by dropzone component
                    >
                        <div className="dz-message">Logo</div>
                    </DropzoneComponent>
                    </div>
{/* Save button below with styles */}
                    <div>
                        <button className="btn" type="submit">Save</button> 
                    </div>
                </form>
        );
    }
}