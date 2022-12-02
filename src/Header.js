import React from 'react';
import './Header.css'
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from '@mui/material';
import { useStateValue } from './StateProvider';

function Header({spotify}) {
    const [{ user }, dispatch] = useStateValue();
    console.log(user)
  return (
    <div className='header'>
        <div className="header-left">
            <SearchIcon />
            <input 
            type="text" 
            placeholder='Search for Artists, Songs, or Podcasts'
            />
        </div>
        <div className="header-right">
            <Avatar alt={user?.display_name} src={user?.images[0].url} />
            <h4>{user?.display_name}</h4>
        </div>
    </div>
  )
}

export default Header