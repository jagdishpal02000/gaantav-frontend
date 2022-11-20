import {useParams} from 'react-router-dom';
import './index.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import EditProfile from '../EditProfile';
import Card from '../Card';
import ProfileHeader from './ProfileHeader';

const Profile = (param) => {
    // const { username } = useLoaderData();
    const { username } = useParams();
    const apiURL ="http://localhost:5000/public/api/v1/";

    // useEffect to get the username info.
    const [profileData,setProfileData] = useState();
    const [loading,setLoading] = useState(true);
    const [notFound,setNotFound] = useState(false);
    const [editProfile,setEditProfile] = useState(false);
    const [posts,setPosts] = useState([]);


    const fetchData = async () => {
      try {
        // Make a first request
        const resp = await axios.get(apiURL+'user/'+username);
        setProfileData(resp.data[0]);
        setLoading(false);

         const userId=resp.data[0].id;
         const resp2 = await axios.get(apiURL+'questions/1/'+userId);
         console.log(resp2);
         setPosts([...resp2.data]);
      } catch (e) {
        // Handle error here
        setNotFound(true);
        setLoading(false);
      console.log(e);
      }
    };
    

    useEffect(() => {
      fetchData();

   }, [username]); 

    return (
    <>
      { loading ? <h1> Loading.... </h1> : (notFound ? <h1>Sorry user not found 😔 </h1> :
      <>
            <ProfileHeader profileData={profileData} setEditProfile={setEditProfile} />         
      {editProfile ? <EditProfile/> :
         <div className="container">
               {posts.map((post,index) => <Card {...post} key={post.questionId} />)}
         </div>}
      </>)}
   </>
    );
}

export default Profile;