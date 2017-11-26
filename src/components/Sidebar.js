import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
    <Drawer
    docked={false}
    width={200}
    open={props.open}
    onRequestChange={props.toggleNav}
    >
    <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
    <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
    <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
    <Divider />
    <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
  </Drawer>

    </div>
  )};
  
  export default Sidebar;