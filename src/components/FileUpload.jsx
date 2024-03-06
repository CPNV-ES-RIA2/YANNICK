import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../providers/languages';
const FileUpload = ({ handleUploadedFiles }) => {


    const { translations } = useLanguage();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/heic': [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            handleUploadedFiles(acceptedFiles);
        },
    });

    return (
        <div {...getRootProps()} style={{ border: '3px dashed black', margin: '20px', padding: '20px' }}>
            <input {...getInputProps()} id='fileUpload' />
            <p>{translations.labelFileUpload}</p>
            <ul>
                {uploadedFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};
export default FileUpload;