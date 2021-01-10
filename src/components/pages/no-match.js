import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
    return (
        <div>
            <h2> Sorry! We couldn't find what you were looking for.</h2>
            <Link to="/">Return to homepage</Link>
        </div>
    );
}