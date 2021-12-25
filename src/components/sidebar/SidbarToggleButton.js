import { BiMenu } from "react-icons/bi";

import { useDispatch } from "react-redux";

/**
 * Sidebar toggle button, which opens and closes the sidebar
 * @param {*} props
 * @returns
 */
function SidebarToggleButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      type="button "
      className="btn btn-light d-flex align-items-center "
      onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
    >
      <BiMenu></BiMenu>
      <span className="ml-2 mb-0">{props.name}</span>
    </button>
  );
}

export default SidebarToggleButton;
