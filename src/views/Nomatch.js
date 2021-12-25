import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { withRouter, useHistory } from "react-router-dom";

/** no match view */
function NoMatch(){
    
    const history = useHistory()

    return (
        <div className="containter-fulid">
            <div className="row mt-5">
                <div className="col-12 mt-5">
                    <h1 className="mb-3" style={{"fontSize":"100px"}}>404 </h1>
                    <h1>Not found</h1>
                    <h6>The resource requested could not be found on this server!</h6>
                    <div className="mt-5">
                    <Button className="btn btn-primary" onClick={()=>history.push("/")}>Go to home</Button>
                    </div>
                </div>
            </div>
             
        </div>
       
    );
    
}

export default withRouter(NoMatch);