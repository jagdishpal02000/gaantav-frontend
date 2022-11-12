import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {actions} from '../../store';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import Loader from '../../assets/loader.gif'

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginFileEncode,FilePondPluginImageResize);

const apiURL= 'http://localhost:5000/api/v1/';


const AskQuestion = () => {
  const isLogin = useSelector((state)=>state.isLogin);
  const token = useSelector((state)=>state.token);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [files, setFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  // const [error,setError] = useState({message:''});

  const [questionData,setQuestionData]=useState({
                                                    title:'',
                                                    summery:'',
                                                    tags:'',
                                                    image:[],
                                                });

  useEffect(()=>{
    console.log(files);
    if(files.length > 0){
        setQuestionData({...questionData,image:files[0].file});
        console.log(questionData);
    }
  },[files]);

  const handleSubmit = async () => {
    // Make API Call to send the data.;
    console.log('token :',token);
    if(questionData.title && questionData.summery && questionData.tags){
        console.log(questionData);
        const formData=new FormData();
        formData.append('title', questionData.title);
        formData.append('tags', questionData.tags);
        formData.append('summery', questionData.summery);
        formData.append('image', questionData.image,questionData.image.name);
        console.log(formData);
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      };
      try {
        setLoading(true);
        await axios.post(apiURL+'question',formData,config);
        setShow(false);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    else{
        console.warn('error');
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Let Everyone know, What you are facing </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form action="localhost:5000/upload" className="form-group" >
           {loading ? <img src={Loader} className="text-center"  alt="loading..." />:<></>}
            <input
              type="text"
              name="title"
              placeholder="Title (What is best way to write Program ?)"
              className="form-control"
              value={questionData.title}
              onInput={(e)=>{setQuestionData((prev)=>{return {...prev,title: e.target.value}})}}
            />
            <textarea
              cols="30"
              name="summery"
              rows="5"
              className="form-control"
              placeholder="Describe Your Problem"
              value={questionData.summery}
              onInput={(e)=>{setQuestionData((prev)=>{return {...prev,summery: e.target.value}})}}
            ></textarea>
            
            {/* <input type="file" name="image" className="form-control" /> */}
            <FilePond
                files={files}
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/*']}
                labelFileTypeNotAllowed={'Please Upload Image only.'}
                allowReorder={true}
                allowMultiple={false}
                onupdatefiles={setFiles}
                allowFileEncode={true}
                allowImageResize	={true}
                imageResizeTargetWidth={'100'}
                imageResizeTargetHeight	={'100'}
                imageResizeMode={'cover'}
                imageResizeUpscale={false}
                accept="image/png, image/jpeg, image/gif"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    
            <input
              type="text"
              name="tags"
              placeholder="#google,#facebook"
              className="form-control"
              value={questionData.tags}
              onInput={(e)=>{setQuestionData((prev)=>{return {...prev,tags: e.target.value}})}}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AskQuestion;
