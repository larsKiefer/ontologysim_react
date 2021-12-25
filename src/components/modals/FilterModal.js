import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Slider, { SliderTooltip } from "rc-slider";
import Select from "react-select";
import "rc-slider/assets/index.css";
import { useForm, Controller } from "react-hook-form";
import colors from "../../style/theme.module.scss";
import { useDispatch } from "react-redux";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

/**
 * get min & max of column
 */
function getMinMax(preFilteredRows, id) {
  let min = 0;
  let max = 0;
  if (preFilteredRows.length > 0) {
    max = preFilteredRows[0][id];
    min = preFilteredRows[0][id];
  }
  preFilteredRows.forEach((row) => {
    min = Math.min(row[id], min);
    max = Math.max(row[id], max);
  });

  return [min, max];
}

/**
 * get all types of column
 * @param {*} preFilteredRows 
 * @param {*} id 
 * @returns 
 */
function getOptions(preFilteredRows, id) {
  var options = new Set();
  preFilteredRows.forEach((row) => {
    if (row[id] != "") {
      options.add(row[id]);
    }
  });
  var optionList = [...options.values()];
  var result = optionList.map((element) => {
    return { value: element, label: element };
  });

  return result;
}

/**
 * view filter modal for filtering event data
 * @param {*} props 
 * @returns 
 */
function FilterModal(props) {
  const dispatch = useDispatch();

  //set default value for input field
  const defaultValues = React.useMemo(() => {
    var filterObject = {};
    props.filter.forEach((element) => {
      if (element.type == "between") {
        filterObject[element.id] = getMinMax(props.prefilteredrows, element.id);
      } else if (element.type == "includesValue") {
        filterObject[element.id] = [];
      }
    });
    return filterObject;
  }, [props.preFilteredRows]);

  const { register, handleSubmit, control } = useForm();

  const marks = React.useMemo(() => {
    var marks = {};
    props.filter.map((element) => {
      var maxRounded = Math.round(
        getMinMax(props.prefilteredrows, element.id)[1]
      );
      marks[element.id] = { 0: "0s", [maxRounded]: maxRounded + "s" };
    });
    return marks;
  }, [props.preFilteredRows]);

  /**submit button for setting filter, all filter data are set when clicking on button */
  function onSubmit(data) {
    const filterValue = [];
    
    props.headergroups.map((headerGroup) => {
      headerGroup.headers.map((column) => {
        if (column.canFilter) {
          var filtered = props.filter.filter(
            (element) => column.id == element.id
          );
          if (filtered.length > 0) {
            
            if(data[filtered[0].id]){
             
            if (filtered[0].type == "between") {
              if (
                data[filtered[0].id][0] !=
                  getMinMax(props.prefilteredrows, filtered[0].id)[0] ||
                data[filtered[0].id][1] !=
                  getMinMax(props.prefilteredrows, filtered[0].id)[1]
              ) {
                filterValue.push({
                  column: column.id,
                  value: data[column.id],
                  type: filtered[0].type,
                });
              }
            } else if (filtered[0].type == "includesValue") {
              if (data[filtered[0].id].length > 0) {
                filterValue.push({
                  column: column.id,
                  value: data[filtered[0].id].map((element) => element.value),
                  type: filtered[0].type,
                });
              }
            }
          }
        }
        }
      });
    });

    dispatch({
      type: "SET_FILTER",
      payload: { data: filterValue, table: props.name },
    });
    props.setModalShow(false);
  }

  //reset filters
  function resetAllFilter() {
    dispatch({ type: "RESET_ALL_FILTERS", payload: { table: props.name } });
  }

  //loading default values (needed)
  const loadFilters = React.useMemo(() => {
    props.filtered[props.name].forEach((filter) => {
      if (filter.type == "between" && filter.value.length > 0) {
        defaultValues[filter.column] = filter.value;
      } else if (filter.type == "includesValue" && filter.value.length > 0) {
        defaultValues[filter.column] = filter.value.map((element) => {
          return { value: element, label: element };
        });
      }
    });
  }, [props.filtered]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h6 className="mb-0 pb-0">Filter option</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {props.filter.map((element) => {
              if (element.type == "between") {
                return (
                  <div className="col-md-6" key={element.id + element.name}>
                    <h6 className="mb-1 text-left" style={{ fontSize: "15px" }}>
                      {element.id}
                    </h6>
                    <div className="d-flex  " style={{ height: "30px" }}>
                      <Controller
                        control={control}
                        name={element.id}
                        render={({
                          field,
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState,
                        }) => (
                          <Slider.Range
                            {...field}
                            min={0}
                            max={
                              getMinMax(props.prefilteredrows, element.id)[1]
                            }
                            marks={marks[element.id]}
                            step={1}
                            trackStyle={[
                              { backgroundColor: colors.primary },
                              { backgroundColor: colors.primary },
                            ]}
                            handleStyle={[
                              {
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.primary,
                              },
                              {
                                backgroundColor: colors.primaryLight,
                                borderColor: colors.primary,
                              },
                            ]}
                            railStyle={{ backgroundColor: colors.secondary }}
                            placeholder={element.id}
                            defaultValue={defaultValues[element.id]}
                          />
                        )}
                      />
                    </div>
                  </div>
                );
              } else if (element.type == "includesValue") {
                return (
                  <div className="col-md-6" key={element.id + element.name}>
                    <h6 className="mb-1 text-left" style={{ fontSize: "15px" }}>
                      {element.id}
                    </h6>
                    <div className="d-flex  w-100">
                      <Controller
                        key={"controller" + element.id}
                        render={({
                          field,
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState,
                        }) => (
                          <Select
                            {...field}
                            defaultValue={defaultValues[element.id]}
                            isMulti
                            name="colors"
                            options={getOptions(
                              props.prefilteredrows,
                              element.id
                            )}
                            className="basic-multi-select w-100"
                            classNamePrefix="select"
                          />
                        )}
                        name={element.id}
                        control={control}
                      ></Controller>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button className="btn-info" onClick={() => resetAllFilter()}>
            Reset all
          </Button>
          <Button className="btn-primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default FilterModal;
