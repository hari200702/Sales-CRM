import React, { useState, useRef, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard,clearDashboard } from '../store/dashboardSlice';
import '../App.css';
import DashBoardTable from '../components/DashBoardTable';
import GlobalFilter from '../components/GlobalFilter';
import ChartBar from "../components/ChartBar"
import { useAppContext } from '../context/AppContext';
import { FaMoneyBillWave, FaUserCheck, FaHandshake, FaTachometerAlt } from 'react-icons/fa';

export const DashBoard = () => {
    const {globalFilter, setGlobalFilter} = useAppContext();
    const dispatch = useDispatch();

    const {
        metrics = {},
        salesAnalytics = [],
        recentActivities = [],
        employeeTable = [],
        loading,
        error,
    } = useSelector((state) => state.dashboard);


    useEffect(() => {
        dispatch(fetchDashboard());

        return ()=>{
            dispatch(clearDashboard())
        }
    }, []);

    if (loading) {
        return <div className="loader">Loading Dashboard...</div>;
    }
    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>
        
        <div className="breadcrumb">Home &gt; Dashboard</div>

        <div className="statsRow">
            <div className="statBox"><div><FaMoneyBillWave className="statIcon" /></div><div>Unassigned Leads</div><h2>{metrics.unassignedLeads?? 0}</h2></div>
            <div className="statBox"><div><FaUserCheck className="statIcon" /></div><div>Assigned This Week</div><h2>{metrics.assignedThisWeek??0}</h2></div>
            <div className="statBox"><div><FaHandshake className="statIcon" /></div><div>Active Salespeople</div><h2>{metrics.activeSalespeople??0}</h2></div>
            <div className="statBox"><div><FaTachometerAlt className="statIcon" /></div><div>Conversion Rate</div><h2>{metrics.conversionRate??0}%</h2></div>
        </div>

        <div className="dashboardRow">
            <div className="analyticsSection">
                <ChartBar data={salesAnalytics}/>
                <div className="activityFeedBox">
                    <h4>Recent Activity Feed</h4>
                    <ul>
                        {recentActivities.map((act, i) => (
                            <li key={i}>{act.message} – {act.timeAgo}</li>
                        ))}
                        </ul>
                </div>
            </div>

            <DashBoardTable globalFilter={globalFilter}  data={employeeTable}/>
        </div>
        </>
    );
}

export default DashBoard;