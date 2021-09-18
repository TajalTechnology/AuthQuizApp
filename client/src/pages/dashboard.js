import React from "react";
import { Link } from "react-router-dom";
import '../../src/styles/dashboard.css'

const Dashboard = (props) => {

    return (
        <div className="dashboard">
            <h1>Welcome to soft-BD online examination</h1>
            <div class="nav-container">
                <ul class="nav">

                    <li class="active"><Link to="/login">
                        <span class="icon-user"></span>
                        <span class="text">Login</span>
                    </Link></li>

                    <li><Link to="/register">
                            <span class="icon-user"></span>
                            <span class="text">Registration</span>
                    </Link></li>

                    <li><Link to="/written">
                            <span class="icon-user"></span>
                            <span class="text">Written Question</span>
                    </Link></li>
                    
                    <li><Link to="/quiz">
                            <span class="icon-user"></span>
                            <span class="text">Quiz Question</span>
                    </Link></li>
                    
                    <li><Link to="/answer">
                            <span class="icon-user"></span>
                            <span class="text">Answer</span>
                    </Link></li>
                </ul>
            </div>


        </div>
    );
}

export default Dashboard;

