import React from 'react'
import {useState} from 'react';
import AuthorizedProfile from './AuthorizedProfile';
import UnauthorizedProfile from './UnauthorizedProfile';

const Profile = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    return (
      isAuthorized? 
      <AuthorizedProfile/>
      :
      <UnauthorizedProfile/>
    )
}

export default Profile