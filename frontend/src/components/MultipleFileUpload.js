import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import SingleFileUploadWithProgress from './SingleFileUploadWithProgress'
function MultipleFileUpload() {
    const [files, setFiles] = useState([])
      const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const mappedAccepted = acceptedFiles.map(file => ({file, errors: []}));
        setFiles(current => [...current, ...mappedAccepted, ...rejectedFiles])
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop})
    
      return (
        <>
       
        <div {...getRootProps()}>
          <input {...getInputProps()} />

              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          {files.map(file => (
            <SingleFileUploadWithProgress file = {file}/>
          ))}
        </div>
        </>
      )
    }


export default MultipleFileUpload