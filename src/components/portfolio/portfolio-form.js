import React, { Component } from 'react';

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);
        //the name, description, url, category, position, etc. all come from the Devcamp Space API
        //these attributes would be given to me in a real world application so I do not have to worry about where they come from
        this.state = {
            name: "",
            description: "",
            category: "",
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
//the state updates every single time a character is entered 
//into a form in react. the handler below allows the typed text
//to be rendered on the screen in the form being filled
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //Below code is to prevent the default behavior of HTML. 
    //In JavaScript and HTML the default behavior if I were to 
    //submit the form it would re-render, causing the page to 
    //refresh, the entire page which is not what you want in 
    //react.
    //What we want is React to be in charge of making changes on the pages. 
    handleSubmit(event) {
        console.log("event", event);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>PortfolioForm</h1>
                <h1>PortfolioForm</h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
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

                    <div>
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handleChange}
                        />

                        <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        />
                    </div>

                    <div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}