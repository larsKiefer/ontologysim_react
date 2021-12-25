import React, { Component, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import Production from "../components/simulation/Production";

import {
  getProductTypeFromFile,
  getProductTypeFromInput,
} from "../actions/productionAction";

/**
 * check production (load ini)
 * @returns 
 */
function CheckProduction() {
  const [state, setState] = useState("");
  const [data, setData] = useState({});

  const { register, handleSubmit, watch, errors, reset } = useForm();
  const {
    register: registerUpload,
    errors: errorsUpload,
    handleSubmit: handleSubmitUpload,
    reset: resetUpload,
  } = useForm();

  //handle text input
  function onSubmit(data) {
    apiRequst(getProductTypeFromInput(data));
  }

  //handle file upload
  async function onSubmitUpload(data) {
    console.log(data)
    if (Object.keys(data).length != 0) {
      if (Object.keys(data["file"]).length != 0) {
        reset();
        var result = await readFile(data["file"][0]);
        setState(result);
        apiRequst(getProductTypeFromFile(result));
      }
    }
  }

  function apiRequst(apiRequest) {
    apiRequest
      .then((res) => {
        var data = res.data;

        setData(data);
      })
      .catch((err) => console.log(err));
  }

  //get file data
  function readFile(file) {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = (x) => resolve(fr.result);
      fr.readAsText(file);
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Button
                ClassName="btn-sm"
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                x
              </Button>
              <h5 className="card-title">ini-file</h5>
              <p className="card-text">Copy your ini-file and submit</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <textarea
                    style={{ width: "100%" }}
                    width="100"
                    rows="20"
                    name="data"
                    placeholder="ini-file ..."
                    defaultValue={state}
                    {...register("data")}
                  />
                </Form.Group>
                <Form.Group>
                  <Button type="Submit">Submit</Button>
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Upload ini-file</h5>
              <p className="card-text">Select your ini-file</p>
              <Form onSubmit={handleSubmitUpload(onSubmitUpload)}>
                <Form.Group>
                  <input
                    {...registerUpload("file")}
                    type="file"
                    name="file"
                    accept=".ini"
                  />
                </Form.Group>
                <Form.Group>
                  <Button type="Submit">Submit</Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <Production data={data}></Production>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CheckProduction);
