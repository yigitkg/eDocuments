// components/DropdownMenu.jsx
import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

/**
 * DropdownMenu component.
 * Renders a dropdown menu with various options.
 */
function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * Event handler for the click event on the menu button.
   * Sets the anchor element to the current target element.
   * @param {Event} event - The click event.
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Event handler for closing the menu.
   * Sets the anchor element to null, closing the menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Dropdown menu button */}
      <IconButton
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="iconBtn iconBtnGreen"
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      {/* Dropdown menu */}
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Menu items */}
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
