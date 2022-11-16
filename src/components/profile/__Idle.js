import {useParams} from 'react-router-dom';
import './index.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import EditProfile from '../EditProfile';

const Profile = (param) => {
    // const { username } = useLoaderData();
    const { username } = useParams();
    const apiURL ="http://localhost:5000/public/api/v1/";

    // useEffect to get the username info.
    const [profileData,setProfileData] = useState();
    const [loading,setLoading] = useState(true);
    const [notFound,setNotFound] = useState(false);
    const [editProfile,setEditProfile] = useState(false);



    const fetchData = async () => {
      try {
        // Make a first request
        const resp = await axios.get(apiURL+'user/'+username);
        setProfileData(resp.data[0]);
        setLoading(false);

         const userId=resp.data[0].id;
        const resp2 = await axios.get(apiURL+'questions/1/'+userId);
         console.log(resp2.data);
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
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-with-timeline-posts" target="__blank" className="nav-link_">POSTS</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-about" target="__blank" className="nav-link_">ABOUT</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-photos" target="__blank" className="nav-link_">PHOTOS</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-videos" target="__blank" className="nav-link_">VIDEOS</a></li>
                     <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-friend-list" target="__blank" className="nav-link_ active show">FRIENDS</a></li>
                  </ul>
               </div>
            </div>
            <div className="profile-content">
               <div className="tab-content p-0">
                  <div className="tab-pane fade active show" id="profile-post">
                     <ul className="timeline">
                        <li>
                           <div className="timeline-time">
                              <span className="date">today</span>
                              <span className="time">04:20</span>
                           </div>
                           <div className="timeline-icon">
                              <a >&nbsp;</a>
                           </div>
                           <div className="timeline-body">
                              <div className="timeline-header">
                                 <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
                                 <span className="username"><a >Sean Ngu</a> <small></small></span>
                                 <span className="pull-right text-muted">18 Views</span>
                              </div>
                              <div className="timeline-content">
                                 <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus turpis quis tincidunt luctus.
                                    Nam sagittis dui in nunc consequat, in imperdiet nunc sagittis.
                                 </p>
                              </div>
                              <div className="timeline-likes">
                                 <div className="stats-right">
                                    <span className="stats-text">259 Shares</span>
                                    <span className="stats-text">21 Comments</span>
                                 </div>
                                 <div className="stats">
                                    <span className="fa-stack fa-fw stats-icon">
                                    <i className="fa fa-circle fa-stack-2x text-danger"></i>
                                    <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                                    </span>
                                    <span className="fa-stack fa-fw stats-icon">
                                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                                    <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span className="stats-total">4.3k</span>
                                 </div>
                              </div>
                              <div className="timeline-footer">
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                              </div>
                              <div className="timeline-comment-box">
                                 <div className="user"><img src="https://bootdey.com/img/Content/avatar/avatar3.png"/></div>
                                 <div className="input">
                                    <form action="">
                                       <div className="input-group">
                                          <input type="text" className="form-control rounded-corner" placeholder="Write a comment..."/>
                                          <span className="input-group-btn p-l-10">
                                          <button className="btn btn-primary f-s-12 rounded-corner" type="button">Comment</button>
                                          </span>
                                       </div>
                                    </form>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className="timeline-time">
                              <span className="date">yesterday</span>
                              <span className="time">20:17</span>
                           </div>
                           <div className="timeline-icon">
                              <a >&nbsp;</a>
                           </div>
                           <div className="timeline-body">
                              <div className="timeline-header">
                                 <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
                                 <span className="username">Sean Ngu</span>
                                 <span className="pull-right text-muted">82 Views</span>
                              </div>
                              <div className="timeline-content">
                                 <p>Location: United States</p>
                              </div>
                              <div className="timeline-footer">
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className="timeline-time">
                              <span className="date">24 February 2014</span>
                              <span className="time">08:17</span>
                           </div>
                           <div className="timeline-icon">
                              <a >&nbsp;</a>
                           </div>
                           <div className="timeline-body">
                              <div className="timeline-header">
                                 <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
                                 <span className="username">Sean Ngu</span>
                                 <span className="pull-right text-muted">1,282 Views</span>
                              </div>
                              <div className="timeline-content">
                                 <p className="lead">
                                    <i className="fa fa-quote-left fa-fw pull-left"></i>
                                    Quisque sed varius nisl. Nulla facilisi. Phasellus consequat sapien sit amet nibh molestie placerat. Donec nulla quam, ullamcorper ut velit vitae, lobortis condimentum magna. Suspendisse mollis in sem vel mollis.
                                    <i className="fa fa-quote-right fa-fw pull-right"></i>
                                 </p>
                              </div>
                              <div className="timeline-footer">
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className="timeline-time">
                              <span className="date">10 January 2014</span>
                              <span className="time">20:43</span>
                           </div>
                           <div className="timeline-icon">
                              <a >&nbsp;</a>
                           </div>
                           <div className="timeline-body">
                              <div className="timeline-header">
                                 <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
                                 <span className="username">Sean Ngu</span>
                                 <span className="pull-right text-muted">1,021,282 Views</span>
                              </div>
                              <div className="timeline-content">
                                 <h4 className="template-title">
                                    <i className="fa fa-map-marker text-danger fa-fw"></i>
                                    795 Folsom Ave, Suite 600 San Francisco, CA 94107
                                 </h4>
                                 <p>In hac habitasse platea dictumst. Pellentesque bibendum id sem nec faucibus. Maecenas molestie, augue vel accumsan rutrum, massa mi rutrum odio, id luctus mauris nibh ut leo.</p>
                                 <p className="m-t-20">
                                    <img src="../assets/img/gallery/gallery-5.jpg" alt=""/>
                                 </p>
                              </div>
                              <div className="timeline-footer">
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a> 
                                 <a  className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                              </div>
                           </div>
                        </li>
                        <li>
                           <div className="timeline-icon">
                              <a >&nbsp;</a>
                           </div>
                           <div className="timeline-body">
                              Loading...
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</>)}</>
    );
}

export default Profile;