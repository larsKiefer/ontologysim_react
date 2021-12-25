import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useEffect,useState } from "react"
import {axiosInstance} from "../actions/axiosInstance"

/**
 * view data base
 * @returns 
 */
function Database(){

    const [state,setState] =useState([])
    useEffect(()=>{
        axiosInstance.get("/database/connect").then(res => console.log(res.data) )

    },[])

    function getData(){
       
        axiosInstance.get("/database/simulationrun").then(res => setState(res.data["result"]) )
    }

    return ( <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1>Still in the making</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <Button onClick={()=>getData()}>Test</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <h6 className="mb-0">Test Data</h6>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                {state.map(element=>{
                                    return <ListGroupItem> 
                                        {"id:" + element.id +" "+element.start+" "+"number of parts: "+element.number_or_parts}
                                    </ListGroupItem>
                                })
                                }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
        </div>)
}

export default Database