import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Nav, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {
  BoxArrowRight,
  Building,
  Globe2,
  PersonCircle,
  Stars,
} from 'react-bootstrap-icons';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <div>
      <ProSidebar collapsed className="position-fixed">
        <Menu iconShape="circle">
          <MenuItem icon={<Image src="images/gawkysaurTurtleFancy.png" width="50em" />}>
            <Nav.Link as={NavLink} to="/" />
          </MenuItem>
          {currentUser ? ([
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<PersonCircle size={50} />}>
                <Nav.Link as={NavLink} to="/" />
              </MenuItem>
            </OverlayTrigger>]) :
            ([
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 200 }}
                overlay={<Tooltip>Login</Tooltip>}
              >
                <MenuItem className="mt-3" icon={<PersonCircle size={50} />}>
                  <Nav.Link as={NavLink} to="/signin" />
                </MenuItem>
              </OverlayTrigger>])}
          {currentUser ? ([
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Option 1</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Stars size={50} />}>
                <Nav.Link as={NavLink} to="/" />
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>option 2</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Building size={50} />}>
                <Nav.Link as={NavLink} to="/add" />
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>option 2</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Globe2 size={50} />}>
                <Nav.Link as={NavLink} to="/" />
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Logout</Tooltip>}
            >
              <MenuItem className="position-absolute bottom-0 mb-4" icon={<BoxArrowRight size={50} />}>
                <Nav.Link as={NavLink} to="/signout" />
              </MenuItem>
            </OverlayTrigger>,
          ]) : ''}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default NavBar;
