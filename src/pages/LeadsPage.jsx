import React, { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import AddLead from '../components/AddLead';
import LeadTable from '../components/LeadTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, uploadLeadsCSV,clearLeads } from '../store/leadslice'

const LeadsPage = () => {
    const dispatch = useDispatch();
    const { globalFilter } = useAppContext();
    const [showModal, setShowModal] = useState(false);

    const { 
        leads=[]
        ,loading,
        error
    } = useSelector((state) => state.leads);
    

    

    useEffect(() => {
        dispatch(fetchLeads());
        
        return()=>{
            dispatch(clearLeads())
        }
    }, [dispatch]);

      useEffect(() => {
        if (error) {
            alert(error); 
        }
            }, [error]);


    const handleSaveLead = (leadData) => {
        const formData= new FormData();
        formData.append('leads',leadData)

        dispatch(uploadLeadsCSV(formData));
        setShowModal(false)
    };

    if (loading) {
        return <div className="loader">Loading Leads...</div>;
    }
    if (error) {
        alert("Error : " , error)
    }

    return (
        <>
            <div className="top-section-header">
                <span className="breadcrumb">Home &gt; Leads</span>
                <button className="addBtn" onClick={() => setShowModal(true)}>
                    <span>Add Leads</span>
                </button>
            </div>

            {leads.length >0 &&
            <LeadTable globalFilter={globalFilter} data={leads}/>
            }
            {loading && <p>Loading...</p>}
            
            


            <AddLead
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveLead}
            />
        </>
    );
};

export default LeadsPage;