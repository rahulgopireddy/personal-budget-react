import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";
// eslint-disable-next-line
import { Chart as ChartJS, Tooltip, Legend, Title } from "chart.js";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement);
ChartJS.register(Title);

const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

function HomePage() {
  const [data, setd3Data] = useState([]);
  const [budgetData, setData] = useState(null);
  const svgRef = useRef();
  // eslint-disable-next-line
  const chartRef = useRef(null);
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Budget Pie Chart by Chart JS",
      },
    },
  };
  useEffect(() => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "My First Dataset",
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        },
      ],
    };

    // Make an API GET request using Axios
    axios
      .get("http://localhost:8080/budget")
      .then((response) => {
        if (response.data.myBudget.length > 0) {
          response.data.myBudget.forEach((item) => {
            chartData.labels.push(item.title);
            chartData.datasets[0].data.push(item.budget);
            chartData.datasets[0].backgroundColor.push(item.colorCode); // Add colors dynamically if you have them
          });
        }

        console.log(response.data.dy_data);
        setd3Data(response.data.dy_data);
        setData(chartData);
      })

      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array ensures that this effect runs once after the initial render
  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const arc = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.label))
      .transition()
      .duration(1000)
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => path(interpolate(t));
      });

    arc
      .append("text")
      .attr("transform", (d) => `translate(${path.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.label);
  }, [data]);
  return (
    <div>
      {" "}
      <main className="center" id="main">
        <div className="page-area">
          <section>
            <article>
              <h1>Stay on track</h1>
              <p>
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised! Proper budget
                management depends on real data... and this app will help you
                with that!
              </p>
            </article>

            <article>
              <h1>Alerts</h1>
              <p>
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </p>
            </article>
          </section>

          <section>
            <article>
              <h1>Results</h1>
              <p>
                People who stick to a financial plan, budgeting every expense,
                get out of debt faster! Also, they to live happier lives...
                since they expend without guilt or fear... because they know it
                is all good and accounted for.
              </p>
            </article>

            <article>
              <h1>Free</h1>
              <p>
                This app is free!!! And you are the only one holding your data!
              </p>
            </article>
          </section>

          <section>
            <article>
              <h1>Stay on track</h1>
              <p>
                Do you know where you are spending your money? If you really
                stop to track it down, you would get surprised! Proper budget
                management depends on real data... and this app will help you
                with that!
              </p>
            </article>

            <article>
              <h1>Alerts</h1>
              <p>
                What if your clothing budget ended? You will get an alert. The
                goal is to never go over the budget.
              </p>
            </article>
          </section>

          <section>
            <article>
              <h1>Results</h1>
              <p>
                People who stick to a financial plan, budgeting every expense,
                get out of debt faster! Also, they to live happier lives...
                since they expend without guilt or fear... because they know it
                is all good and accounted for.
              </p>
            </article>

            <article>
              <h1>Chart</h1>
              <p>
                {budgetData ? (
                  <Pie data={budgetData} options={pieChartOptions} />
                ) : (
                  <p>Loading data...</p>
                )}
                {/* <canvas id="myChart" width="400" height="400" alt=""></canvas> */}
              </p>
            </article>
          </section>
          <section>
            <h1>Top 10 watched sports in the world using D3Js</h1>
            <p>
              {data ? (
                <div className="chart" ref={svgRef}></div>
              ) : (
                <p>Loading data...</p>
              )}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
