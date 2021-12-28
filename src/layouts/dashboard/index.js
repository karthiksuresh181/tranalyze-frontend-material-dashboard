// @mui material components
import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

const axios = require("axios");

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [totalGain, setTotalGain] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [fee, setFee] = useState(0);

  const [gainPercentage, setGainPercentage] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [lossPercentage, setLossPercentage] = useState(0);
  const [feePercentage, setFeePercentage] = useState(0);
  const [gainStatus, setGainStatus] = useState("success");
  const [profitStatus, setProfitStatus] = useState("success");
  const [lossStatus, setLossStatus] = useState("success");
  const [feeStatus, setFeeStatus] = useState("success");

  const [tradesOverview, setTradesOverview] = useState("");
  const [yesterdayComparisonPercentage, setYesterdayComparisonPercentage] = useState(0);

  const getOverview = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/dashboard/get_overview`).then((res) => {
      setTotalGain(res.data.pnl_overview.total_gain);
      setProfit(res.data.pnl_overview.profit);
      setLoss(res.data.pnl_overview.loss);
      setFee(res.data.pnl_overview.fee);

      setGainPercentage(res.data.weekly_comparison_overview.gain_difference);
      setProfitPercentage(res.data.weekly_comparison_overview.profit_difference);
      setLossPercentage(res.data.weekly_comparison_overview.loss_difference);
      setFeePercentage(res.data.weekly_comparison_overview.fee_difference);
      setGainStatus(res.data.weekly_comparison_overview.gain_status);
      setProfitStatus(res.data.weekly_comparison_overview.profit_status);
      setLossStatus(res.data.weekly_comparison_overview.loss_status);
      setFeeStatus(res.data.weekly_comparison_overview.fee_status);

      setTradesOverview(res.data.trades_overview);
      setYesterdayComparisonPercentage(res.data.yesterday_comparison_percentage);
    });
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total Gain ($)"
                count={totalGain}
                percentage={{
                  color: gainStatus,
                  amount: gainPercentage,
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total Profit ($)"
                count={profit}
                percentage={{
                  color: profitStatus,
                  amount: profitPercentage,
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Loss ($)"
                count={loss}
                percentage={{
                  color: lossStatus,
                  amount: lossPercentage,
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Total Fee ($)"
                count={fee}
                percentage={{
                  color: feeStatus,
                  amount: feePercentage,
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Daily PNL"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today trades.
                    </>
                  }
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Weekly PNL"
                  description="Weekly Performance"
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Monthly PNL"
                  description="Monthly Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview
                tradesOverview={tradesOverview}
                yesterdayComparisonPercentage={yesterdayComparisonPercentage}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
