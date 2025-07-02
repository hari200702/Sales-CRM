import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

const AddLead = ({ isOpen, onClose, onSave }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);
    const uploadIntervalRef= useRef(null)
    

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        if(files.length>1){
            alert("Please Upload One File");
            return
        }
        handleFiles(files);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if(files.length>1){
            alert("Please Upload One File");
            return
        }
        handleFiles(files);
    };

    const handleFiles = (files) => {

        const csvFiles = files.filter(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
   
        
        if (csvFiles.length === 0) {
            alert('Please upload only CSV files');
            return;
        }

        simulateUpload(csvFiles);
    };

    const simulateUpload = (files) => {
        
        setIsUploading(true);
        setUploadProgress(0);


        uploadIntervalRef.current = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(uploadIntervalRef.current);
                    setIsUploading(false);
                    
                    const file = files[0];
                    setUploadedFile({
                        name: file.name,
                        size: formatFileSize(file.size),
                        rawFile:file,
                        id: Date.now() + Math.random()
                    });

                    
                    
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const removeFile = () => {
        setUploadedFile(null);
    };

    const handleOnClose = () =>{
        setUploadedFile(null);
        onClose();
    }


    if (!isOpen) return null;

    return (
    <div className="csvModalOverlay">
        <div className={`csvModal ${!uploadedFile ? 'expanded' : ''}`}>
            <div className="csvModalHeader">
                <h3>CSV Upload</h3>
                <button className="csvCloseBtn" onClick={handleOnClose}>×</button>
            </div>
            
            <div className="csvModalContent">
                <p className="csvModalSubtext">Add your documents here</p>

                <div 
                    className={`csvDropZone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!isUploading ? (
                        <>
                            <div className="csvUploadIcon">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#333" strokeWidth="2"/>
                                    <path d="M8 12L12 8L16 12" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M12 8V16" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <p className="dragText">Drag your file(s) to start uploading</p>
                            <p className="orText">OR</p>
                            <button 
                                className="browseBtn" 
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Browse files
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                multiple
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                        </>
                    ) : (
                        <div className="uploadingContainer">
                            <div className="circularProgress">
                                <svg className="progressSvg" width="120" height="120">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="none"
                                        stroke="#e0e0e0"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="none"
                                        stroke="#4a90e2"
                                        strokeWidth="8"
                                        strokeDasharray={`${2 * Math.PI * 50}`}
                                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - uploadProgress / 100)}`}
                                        transform="rotate(-90 60 60)"
                                        style={{ transition: 'stroke-dashoffset 0.3s' }}
                                    />
                                </svg>
                                <div className="progressContent">
                                    <span className="verifyingText">Verifying...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {uploadedFile && (
                    <UploadedFilesList file={uploadedFile} onRemove={removeFile} />
                )}
            </div>

            <div className="csvModalFooter">
                <button className="cancelBtn" onClick={handleOnClose}>Cancel</button>
                <button 
                    className={`uploadBtn ${!uploadedFile ? 'disabled' : ''}`} 
                    disabled={!uploadedFile}
                    onClick={()=>onSave(uploadedFile.rawFile)}
                >
                    Upload
                </button>
            </div>
        </div>
    </div>
);
};


const UploadedFilesList = ({ file, onRemove }) => {
    return (
        <div className="uploadedFilesSection">
            <div className="uploadedFileItem">
                <div className="fileIcon">📄</div>
                <div className="fileDetails">
                    <span className="fileName">{file.name}</span>
                    <span className="fileSize">{file.size}</span>
                </div>
                <button className="removeBtn" onClick={onRemove}>
                    ×
                </button>
            </div>

            <div className="infoMessage">
                <span className="infoIcon">ℹ️</span>
                <p>All the Leads will be distributed among other employees. Equally, do you want to delete this employee.</p>
            </div>
        </div>
    );
};

export default AddLead;