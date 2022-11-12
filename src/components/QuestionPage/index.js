import {useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import Navbar from '../navbar';
import Card from '../Card';
import axios from 'axios';

const apiURL ="http://localhost:5000/public/api/v1/";

const QuestionPage = () =>{
    const {questionName} = useParams();
    const [questionData,setQuestionData] = useState();
    const [loading,setLoading] = useState(true);
    const [notFound,setNotFound] = useState(false);
    // get all question data with question title.
    // and send that data to card and show all answers.
    useEffect( () => {
     
   const questionTitle = questionName.split('-').join('');
   axios.get(apiURL+'question/'+questionTitle).then((response) =>{
       setQuestionData(response.data[0]);
       setLoading(false);
     }).catch(error => {
    setNotFound(true);
    setLoading(false);
    });
   }, [questionName]);  
    return (
        <>
        <Navbar/>
        <section className='mt-5'>
        <div className='row mt-4'>
            <div className='col-md-3'>
                
            </div>
            <div className='col-md-6 mt-4'>
           
            {loading ? <h1>Loading....</h1> : (notFound ? <h1>Sorry question not found 😔 </h1> : <Card {...questionData}/>) }
            </div>
            <div className='col-md-3'>

            </div>
             
        </div>
        </section>
        </>
    )
}

export default QuestionPage;