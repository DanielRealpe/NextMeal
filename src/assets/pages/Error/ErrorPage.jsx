import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
    return (
        <div className="error-page">
            <h1 className="error-code">404</h1>
            <p className="error-message">Page Not Found</p>
            <p className="error-description">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="error-link">
                Go Back to Home
            </Link>
        </div>
    );
}

export default ErrorPage;
