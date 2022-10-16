import {useParams} from 'react-router-dom';
import Navbar from '../navbar';
import Card from '../Card';
const QuestionPage = () =>{
    const {questionName} = useParams();
    // get all question data with question title.
    // and send that data to card and show all answers.

    const exmapleData = [{   id:1,
        title:"write hello world program",
        summery:'this is the summery of the questoin',
        image:'https://qph.cf2.quoracdn.net/main-qimg-c603062c2b793c249ca93c158ac3951a-lq',
        authorImage:'https://qph.cf2.quoracdn.net/main-qimg-c603062c2b793c249ca93c158ac3951a-lq',
        authorName:'Jagdish Pal',
        tags:'cpp,reactjs,nodejs',
        upVotes:5,
        downVotes:2,
        authorUsername:'jagdishpal02000',
    },
    {
        id:2,
        title:"best programming language",
        summery:'this is the summery of the questoin',
        image:'https://qph.cf2.quoracdn.net/main-qimg-96b671933616ac30af8f0818835abefd-lq',
        authorImage:'https://qph.cf2.quoracdn.net/main-qimg-96b671933616ac30af8f0818835abefd-lq',
        authorName:'Jagdish Pal',
        tags:'cpp,reactjs,nodejs',
        upVotes:3,
        downVotes:0,
        authorUsername:'jagdishpal02001',
    }];
    return (
        <>
        <Navbar/>
        <section className='mt-5'>
        <div className='row mt-4'>
            <div className='col-md-3'>
                
            </div>
            <div className='col-md-6 mt-4'>

        <Card {...exmapleData[0]}/>
            </div>
            <div className='col-md-3'>

            </div>
             
        </div>
        </section>
        </>
    )
}

export default QuestionPage;