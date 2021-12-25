import { MdReportProblem } from "react-icons/md";
import colors from "../../style/theme.module.scss";

/**show that no kpi data is not available */
function NoData() {
  return (
    <div className="mt-5 pt-5">
      <MdReportProblem
        className=""
        color={colors.warning}
        size={70}
      ></MdReportProblem>
      <h5>No data available</h5>
      <p>Check if your simulation is running or click refresh button</p>
    </div>
  );
}

export default NoData;
