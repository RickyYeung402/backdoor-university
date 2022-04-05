import React from "react";
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  Legend,
  YAxis,
  ResponsiveContainer,
  Surface,
  Symbols,
  Label
} from "recharts";
import _ from "lodash";

class Teststats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: [],
      chartColors: {
        others: "#40ee86",
        IVE: "#67d6c0",
        SPACE: "#127197",
        HKCC: "#e96d8d"
      },
      chartData: [

        {
          GPA: 3.0,
          others: 4
        },
        {
          GPA: 3.1,
          others: 4
        },
        {
          GPA: 3.2,
          others: 1489,
          IVE: 7000,
          SPACE: 5000,
          HKCC: 4000
        },
        {
          GPA: 3.3,
          others: 1489,
          IVE: 7000,
          SPACE: 5000,
          HKCC: 4000
        },
        {
          GPA: 3.4,
          others: 1489,
          IVE: 3500,
          SPACE: 3000,
          HKCC: 3000
        },
        {
          GPA: 3.5,
          others: 1489,
          IVE: 1500,
          SPACE: 1500,
          HKCC: 1500
        },
        {
          GPA: 3.6,
          others: 1000,
          IVE: 2000,
          SPACE: 1500,
          HKCC: 1000
        },
        {
          GPA: 3.7,
          others: 571,
          IVE: 500,
          SPACE: 400,
          HKCC: 300
        },
        {
          GPA: 3.8,
          others: 126.5,
          IVE: 300,
          SPACE: 200,
          HKCC: 200
        },
        {
          GPA: 3.9,
          others: 0,
          IVE: 200,
          SPACE: 150,
          HKCC: 100
        },
      ]
    };
  }

  handleClick = dataKey => {
    if (_.includes(this.state.disabled, dataKey)) {
      this.setState({
        disabled: this.state.disabled.filter(obj => obj !== dataKey)
      });
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  };

  renderCusomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color } = entry;
          const active = _.includes(this.state.disabled, dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1> Distribution diagram for admission GPA of non-JUPAS Programmes </h1>
        <label for="Filter">Filter: </label>
        <select name="University" id="University">
          <option disabled selected value> -- select an University -- </option>
          <option value="All Uni">All</option>
          <option value="HKU">HKU</option>
          <option value="CUHK">CUHK</option>
          <option value="UST">UST</option>
          <option value="PolyU">PolyU</option>
          <option value="CityU">CityU</option>
        </select>

        <label for=" "> </label>
        <select name="Area of Study" id="Area of Study">
          <option disabled selected value> -- Area of Study -- </option>
          <option value="All Study">All</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Arts">Arts</option>
        </select>

        <label for=" "> </label>
        <select name="Specific Programme" id="Specific Programme">
          <option disabled selected value> -- Specific Programme -- </option>
          <option value="All Programme">All</option>
          <option value="CUHK Computer Engineering">CUHK Computer Engineering</option>
          <option value="CUHK IBBA">CUHK IBBA</option>
          <option value="CUHK History">CUHK History</option>
        </select>
        <ResponsiveContainer height={450} width="90%">
          <BarChart layout="vertical" data={this.state.chartData}>
            {_.toPairs(this.state.chartColors)
              .filter(pair => !_.includes(this.state.disabled, pair[0]))
              .map(pair => (
                <Bar
                  stackId="a"
                  key={pair[0]}
                  dataKey={pair[0]}
                  fill={pair[1]}
                />
              ))}
            <YAxis
              domain={[3, 4]}
              dataKey="GPA"
              interval="preserveStartEnd"
              padding={{ top: 20, bottom: 20 }}
              tickCount={11}
              name="GPA" label={{ value: 'GPA', angle: -90, position: 'insideLeft' }}
            />
            <XAxis type="number">
              <Label value="Offered Student Number" offset={0} position="insideBottom" />
            </XAxis>
            <Legend
              verticalAlign="bottom"
              height={36}
              align="left"
              payload={_.toPairs(this.state.chartColors).map(pair => ({
                dataKey: pair[0],
                color: pair[1]
              }))}
              content={this.renderCusomizedLegend}
            />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Teststats;
