import React, { Component, useState, useEffect } from 'react';
import { Container, Form,Alert } from 'react-bootstrap'
import { withRouter } from "react-router-dom";

import { useForm } from "react-hook-form"

import useWindowDimensions from "../components/useWindowDimensions"


import { getProductType } from "../actions/productTypeAction"

/**
 * test play ground, currently not neeeded
 * @returns 
 */
function Test() {

    const { register, handleSubmit, watch, errors } = useForm();
    async function onSubmit(data) {
       
         getProductType(data)
         .then(res => {console.log(res.data)})
         .catch(err => err);

    }


    const { width, height } = useWindowDimensions();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">Process list</h5>
                        <p className="card-text">Enter your process-list.</p>
                        <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                               
                                   
                               <input id="list2" name="list2" {...register("list2",{ required: "required" })} />
                                  
                               {errors.list2 && <Alert>This is required</Alert>}
                                  
                           <button className="btn btn-primary" type="submit">Submit</button>

                       </form>


                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default withRouter(Test);