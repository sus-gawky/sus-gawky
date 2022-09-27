import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Nav, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import {
  BoxArrowRight,
  Building,
  Globe2, House,
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

  const [open, setOpen] = useState(true);
  return (
    <div>
      <ProSidebar collapsed={open} className="position-fixed">
        <Menu iconShape="circle">
          <MenuItem icon={<Image src="images/gawkysaurTurtleFancy.png" width="50em" />} onClick={() => setOpen(!open)}>
            <h4 className="text-center">Close</h4>
          </MenuItem>
          {currentUser ? ([
            <OverlayTrigger
              placement="right"
              key="k-1"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Home</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<House size={50} />}>
                <Nav.Link as={NavLink} to="/homepage">
                  <h4 className="text-center">Home</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              key="k-2"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<PersonCircle size={50} />}>
                <Nav.Link as={NavLink} to="/">
                  <h4 className="text-center">Profile</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>]) :
            ([
              <OverlayTrigger
                placement="right"
                key="k-3"
                delay={{ show: 250, hide: 200 }}
                overlay={<Tooltip>Home</Tooltip>}
              >
                <MenuItem className="mt-3" icon={<House size={50} />}>
                  <Nav.Link as={NavLink} to="/">
                    <h4 className="text-center">Home</h4>
                  </Nav.Link>
                </MenuItem>
              </OverlayTrigger>,
              <OverlayTrigger
                placement="right"
                key="k-4"
                delay={{ show: 250, hide: 200 }}
                overlay={<Tooltip>Login</Tooltip>}
              >
                <MenuItem className="mt-3" icon={<PersonCircle size={50} />}>
                  <Nav.Link as={NavLink} to="/signin">
                    <h4 className="text-center">Login</h4>
                  </Nav.Link>
                </MenuItem>
              </OverlayTrigger>])}
          {currentUser ? ([
            <OverlayTrigger
              placement="right"
              key="k-5"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Praise</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Stars size={50} />}>
                <Nav.Link as={NavLink} to="/challenges">
                  <h4 className="text-center">Praise</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              key="k-6"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Neighborhood</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Building size={50} />}>
                <Nav.Link as={NavLink} to="/neighbors">
                  <h4 className="text-center">Neighborhood</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              key="k-7"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>World View</Tooltip>}
            >
              <MenuItem className="mt-3" icon={<Globe2 size={50} />}>
                <Nav.Link as={NavLink} to="/map">
                  <h4 className="text-center">World View</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>,
            <OverlayTrigger
              placement="right"
              key="k-8"
              delay={{ show: 250, hide: 200 }}
              overlay={<Tooltip>Logout</Tooltip>}
            >
              <MenuItem className="position-absolute bottom-0 mb-4" icon={<BoxArrowRight size={50} />}>
                <Nav.Link as={NavLink} to="/signout">
                  <h4 className="position-absolute bottom-0 mb-3 ms-5 float-start">Logout</h4>
                </Nav.Link>
              </MenuItem>
            </OverlayTrigger>,
          ]) : ''}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default NavBar;
