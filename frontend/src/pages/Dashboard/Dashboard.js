import React from "react";

import DashboardSideBar from "../../components/DashboardSideBar/DashboardSideBar";
import DashboardContent from "./DashboardContent";

import "./Dashboard.css";


const Dashboard = ({ type, user }) => {
    return (
        <div className="dashboard">
            <DashboardSideBar type={type} user={user} />
            <section className="dashboardContentSection">
                <DashboardContent type={type} />
            </section>
        </div>
    );
};

export default Dashboard;
