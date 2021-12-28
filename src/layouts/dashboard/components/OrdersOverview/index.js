// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview({ tradesOverview, yesterdayComparisonPercentage }) {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Trades Review
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon>{yesterdayComparisonPercentage.icon}</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {yesterdayComparisonPercentage.percentage}%
            </MDTypography>{" "}
            today
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color={tradesOverview[2]}
          icon={tradesOverview[3]}
          title={tradesOverview[1]}
          dateTime={tradesOverview[0]}
        />
        <TimelineItem
          color={tradesOverview[6]}
          icon={tradesOverview[7]}
          title={tradesOverview[5]}
          dateTime={tradesOverview[4]}
        />
        <TimelineItem
          color={tradesOverview[10]}
          icon={tradesOverview[11]}
          title={tradesOverview[9]}
          dateTime={tradesOverview[8]}
        />
        <TimelineItem
          color={tradesOverview[14]}
          icon={tradesOverview[15]}
          title={tradesOverview[13]}
          dateTime={tradesOverview[12]}
        />
        <TimelineItem
          color={tradesOverview[18]}
          icon={tradesOverview[19]}
          title={tradesOverview[17]}
          dateTime={tradesOverview[16]}
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
