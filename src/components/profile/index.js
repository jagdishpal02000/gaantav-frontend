import {useParams} from 'react-router-dom';
import './index.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import EditProfile from '../EditProfile';
import Card from '../Card';
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

    return (<>
      { loading ? <h1> Loading.... </h1> : (notFound ? <h1>Sorry user not found 😔 </h1> : <>
      {editProfile && <EditProfile/>}
<div className="container">
   <div className="row">
      <div className="col-md-12">
         <div id="content" className="content content-full-width">
            <div className="profile">
               <div className="profile-header">
                  <div className="profile-header-cover"></div>
                  <div className="profile-header-content">
                     <div className="profile-header-img">
                        <img src={profileData.profile_picture} width="100%" height="100%" alt=""/>
                     </div>
                     <div className="profile-header-info">
                        <h4 className="m-t-10 m-b-5">{profileData.name}</h4>
                        <p className="m-b-10">{profileData.tagline}</p>
                       <a className="btn btn-sm btn-info mb-2" onClick={()=>{setEditProfile(!editProfile)}}>Edit Profile</a>
                     </div>
                  </div>
                  <ul className="profile-header-tab nav nav-tabs">
                     <li className="nav-item"><a  target="__blank" className="nav-link_">POSTS</a></li>
                     {/* <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-about" target="__blank" className="nav-link_">ABOUT</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-photos" target="__blank" className="nav-link_">PHOTOS</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-videos" target="__blank" className="nav-link_">VIDEOS</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-friend-list" target="__blank" className="nav-link_ active show">FRIENDS</a></li> */}
                  </ul>
               </div>
            </div>
            <section className='posts'>
            {posts.map((post,index) => <Card {...post} key={post.questionId} />)}
            </section>
         </div>
      </div>
   </div>
</div>
</>)}</>
    );
}

export default Profile;