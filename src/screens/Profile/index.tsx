import React, { useState } from 'react'
import AuthorizedProfile from './AuthorizedProfile';
import UnauthorizedProfile from './UnauthorizedProfile';

const Index = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  return (
    isAuthorized? 
    <AuthorizedProfile/>
    :
    <UnauthorizedProfile/>
  )
}

export default Index