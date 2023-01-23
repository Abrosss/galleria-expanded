import React, { useEffect } from 'react'


function SingleFileUploadWithProgress(file) {
    useEffect(() =>{

        function upload() {
            const url = await uploadFile(file)
        }
        upload()
}, [])
  return (
    JSON.stringify(file)
  )
}

function uploadFile(file) {
    const url =''
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.onload = () => {
            res('url')
        }
        xhr.onerror = (e) => rej(e)
        xhr.upload.onprogress = (e) => {
            if(e.lengthComputable) {
                const percentage = (e.loaded/e.total)*100
                onprogress(Math.round(percentage))
            }
        }
    })
}

export default SingleFileUploadWithProgress