import {useEffect,useState} from 'react';
import axios from 'axios';
import './index.css';
import Card from '../Card';
import Loading from '../Loading';


const MainBar = () =>{

const apiURL='http://localhost:5000/api/v1/';
const [allPosts,setAllPosts] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(() => {
    axios.get(apiURL+'posts').then((res)=>{
        setLoading(false);
        setAllPosts(res.data);
    });
}, []);

return (
        <div className="Main">
            {loading ? <Loading/> : allPosts.map((post)=><Card {...post} key={post.id}/>)}
        </div>
);
}

export default MainBar;