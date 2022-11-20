const ProfileHeader = ({profileData,setEditProfile}) => {
  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-header-cover"></div>
          <div className="profile-header-content">
            <div className="profile-header-img">
              <img
                src={profileData.profile_picture}
                width="100%"
                height="100%"
                alt=""
              />
            </div>
            <div className="profile-header-info">
              <h4 className="m-t-10 m-b-5">{profileData.name}</h4>
              <p className="m-b-10">{profileData.tagline}</p>
              <a
                className="btn btn-sm btn-info mb-2"
                onClick={() => {
                  setEditProfile((prev)=>!prev);
                }}
              >
                Edit Profile
              </a>
            </div>
          </div>
          <ul className="profile-header-tab nav nav-tabs">
            <li className="nav-item">
              <a target="__blank" className="nav-link_">
                POSTS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
