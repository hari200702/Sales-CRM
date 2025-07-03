import React, { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployee from '../components/AddEmployee';
import { useDispatch, useSelector } from 'react-redux';
import EditEmployee from '../components/EditEmployee';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee,clearEmployees,clearError } from '../store/employeeSlice';

const EmployeesPage = () => {
    const { globalFilter } = useAppContext(); 
    const [showTable, setShowTable] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const[ showEditModal, setShowEditModal ]= useState(false)
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const dispatch = useDispatch();

    const { employees, loading , error, } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());

        return () =>{
            dispatch(clearEmployees())
        }
    }, []);

      useEffect(() => {
        if (error) {
            alert(error); 
        }

            return () =>{
                clearError()
            }
        }, [error]);

    const handleSaveEmployee = (employeeData) => {
        dispatch(createEmployee(employeeData))
        setShowModal(false);
    };
    const handleDeleteEmployee = (employeeId) => {
        dispatch(deleteEmployee(employeeId))
    };

    const handleEditEmployee = (employee) => {
        setEmployeeToEdit(employee);           
        setShowEditModal(true);               
    };

    const handleUpdateEmployee = (employeeId, updatedData) => {
        dispatch(updateEmployee({ id: employeeId, updatedData }))
    };
    if (loading) {
        return <div className="loader">Loading Employees...</div>;
    }



    return (
        <>
            <div className="top-section-header">
                <span className="breadcrumb">Home &gt; Employees</span>
                <button className="addBtn" onClick={() => setShowModal(true)}>
                    <span>Add Employees</span>
                </button>
            </div>

            {showTable && (
                <div className="tableWrapper">
                    <EmployeeTable globalFilter={globalFilter} data={employees} onDelete={handleDeleteEmployee}
                    onEdit={handleEditEmployee}/>
                </div>
            )}

            <AddEmployee 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveEmployee}
            />

            <EditEmployee
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={(payload) => dispatch(updateEmployee(payload))}
                employee={employeeToEdit}
            />
        </>
    );
};

export default EmployeesPage;