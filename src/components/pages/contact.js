import React from 'react';
import contactPagePicture from "../../../static/assets/images/about/ShaunSenn.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function() {
    return (
    <div className="content-page-wrapper">
        <div 
        className="left-column" 
        style={{
            background: "url(" + contactPagePicture + ") no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
        />        

        <div className="right-column">
            
            <div className="contact-bullet-points">

                <div className="bullet-point-group">
                
                    <div className="icon">
                        <FontAwesomeIcon icon="phone"/>
                    </div>

                    <div className="text">
                        123-456-7890
                    </div>
                
                </div>

                <div className="bullet-point-group">
                    
                    <div className="icon">
                        <FontAwesomeIcon icon="envelope"/>
                    </div>

                    <div className="text">
                        shaun@example.com
                    </div>
                
                </div>

                <div className="bullet-point-group">
                    
                    <div className="icon">
                        <FontAwesomeIcon icon="map-marked-alt"/>
                    </div>

                    <div className="text">
                        Westminster, CO
                    </div>
                
                </div>

            </div>
        </div>
    </div>
    );
}