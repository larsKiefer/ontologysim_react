import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/image/logo_wbk.png'
import { useHistory, withRouter,useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

//navbar
export function NavbarApp() {
    const history = useHistory();
    const dispatch = useDispatch();
    function pushHistory(push_path) {
        history.push(push_path);
    }

    const { pathname } = useLocation();   

    //main selectable items
    const navBarCollapse = React.useMemo(()=><Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">
    <Nav >                   
   
        <Nav.Link onClick={() => {pushHistory("/simulation/dashboard");dispatch({ type: "CHANGE_SIDEBAR", payload: { sidebarElement: "" } }) }} >Simulation</Nav.Link>
 
        <NavDropdown title="Input visualizer" id="basic-nav-dropdown" className="mr-2">
            <NavDropdown.Item onSelect={() => pushHistory("/check_production")}>Ini-Production</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => pushHistory("/check_producttype")}>Ini-ProductType</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link onClick={() => {pushHistory("/database");}} >Database</Nav.Link>
    </Nav>

</Navbar.Collapse>,[])
    
    //depending on view, eather container or container-fluid style
    const Navbar2 = React.useMemo( ()=>{
        if(pathname==""  || pathname=="/" || pathname=="/impressum" || pathname=="/data_protection"){
            return (
              
                  
                         <div className="container w-100 d-flex">
                    <Navbar.Brand className="" type="button" onClick={()=>pushHistory("/")}>
                        <img
                            alt="Logo"
                            src={logo}
                            height="30"
                            width="scale"
                            className="d-inline-block align-top"
                        />{' '}
                    OntologySim
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"   />
                    {navBarCollapse}
                 
                    </div>
                   
            )
        }else{
            return (
            < >
            <Navbar.Brand className="" type="button" onClick={()=>pushHistory("/")}>
                <img
                    alt="Logo"
                    src={logo}
                    height="30"
                    width="scale"
                    className="d-inline-block align-top"
                />{' '}
            OntologySim
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"   />
            {navBarCollapse}
            </>
            )
        }


    },[pathname])

    
    return (
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" >
          {Navbar2}
       </Navbar>
    );
}
export default NavbarApp;