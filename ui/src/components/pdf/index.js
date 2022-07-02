import React, { useState } from 'react'
import './style.css'
import ApiClient from '../../api';
import DownloadFile from 'js-file-download';
import Loader from '../loader';

export default function Pdf () {

    const api = new ApiClient('api/v1/files/xmltoprd');

    const [ xml, setXml ] = useState();
    const [ docx, setDocx ] = useState();
    const [ loader, setLoader ] = useState(false);
    const [ error, setError ] = useState(false);


    const send = async (event)=> {
        try {
            setLoader(true);
            const formData = new FormData();

            formData.append('files', xml);
            formData.append('files', docx);

            const response = await api.sendFiles(formData)
            DownloadFile(response, `output.pdf`);
            setLoader(false);
        } catch (err) {
            setError(err);
            setLoader(false);
        }
    }

    if (error) throw new Error(error)

    return (
        <div className="main-block">
        <div className='upload-file-box'>
            <div className="form-group">
                <label className="label">
                    <i className="material-icons">{xml?.name || 'XML'}</i>
                    <span className="title">Add File</span>
                    <input type="file" onChange={(event)=>{
                        setXml(event.target.files[0])
                    }} />
                </label>
            </div>
            <div className="form-group">
                <label className="label">
                    <i className="material-icons">{docx?.name || 'DOCX'}</i>
                    <span className="title">Add File</span>
                    <input type="file" onChange={(event)=>{
                        setDocx(event.target.files[0])
                    }}/>
                </label>
            </div>
        </div>
        <div className='btn-box'>
            <button className="btn" onClick={send}>{ loader ? <Loader/> : 'Старт'}</button>
        </div>
        </div>
    )
}