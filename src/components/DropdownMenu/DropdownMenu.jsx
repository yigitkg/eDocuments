// components/DropdownMenu.jsx
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="iconBtn iconBtnGreen" // Stil sınıfını ekleyin
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>İptal Et</MenuItem>
        <MenuItem onClick={handleClose}>İptal Geri Al</MenuItem>
        <MenuItem onClick={handleClose}>İtiraz Bildir</MenuItem>
        <MenuItem onClick={handleClose}>Kopyala</MenuItem>
        <MenuItem onClick={handleClose}>Statü Seçimi</MenuItem>
        <MenuItem onClick={handleClose}>Departman Seçimi</MenuItem>
        <MenuItem onClick={handleClose}>İzleme Kayıtları</MenuItem>
        <MenuItem onClick={handleClose}>Rapora Git</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
