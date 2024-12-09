import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { ExitToApp, AccountCircleRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ProfileMenu = ({ anchorEl, isOpen, onClose, onEditProfile, onLogout }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={onEditProfile}>
                <AccountCircleRounded fontSize="small" style={{ marginRight: 8 }} />
                Mi perfil
            </MenuItem>
            <MenuItem onClick={onLogout}>
                <ExitToApp fontSize="small" style={{ marginRight: 8 }} />
                Cerrar sesión
            </MenuItem>
        </Menu>
    );
};

ProfileMenu.propTypes = {
    anchorEl: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEditProfile: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default ProfileMenu;

