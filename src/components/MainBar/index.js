import {useEffect,useState,useRef,useCallback} from 'react';
import axios from 'axios';
import './index.css';
import Card from '../Card';
import Loading from '../Loading';
import useFetch from '../../hooks/useFetch';

const MainBar = () =>{

const [allPosts,setAllPosts] = useState([]);
const [pageNumber,setPageNumber] = useState(1);
const {loading,error,list,hasMore}= useFetch(pageNumber);

const observer = useRef();
const lastPostElementRef = useCallback(node=>{
    if(loading) return;
    //disconnecting the observer from previous last post.
    if(observer.current !== undefined) 
        observer.current.disconnect();    
    observer.current = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && hasMore){
        setPageNumber(prev=>prev+1);
    }
    });
    if(node) observer.current.observe(node);    
},[loading,hasMore]);

return ( 
        <div className="Main">
            {list.map((post,index)=>{
                if(list.length === index +1)
                    return <Card {...post} innerRef={lastPostElementRef} key={post.questionId}/>
                return <Card {...post} key={post.questionId}/>
            }
            )}
            {loading && <Loading/> }
        </div>
);
}

export default MainBar;