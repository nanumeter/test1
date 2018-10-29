import React from 'react';
import Plot from 'react-plotly.js';
import { MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Chart1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interceptX: 0,
            interceptY: 0,
            rows: [],
            revision: 1,
            pod: {
                x1: 0.5,
                x2: 0.5
            },
            podt: {
                x1: 0,
                x2: 0,
            },
            data: [
                { type: 'scatter', x: 0, y: 0 }
            ],
            layout: {
                "width": 500, "height": 500, hovermode: 'closest', clickmode: "event+select",
                yaxis: {
                    title: "X2",
                    fixedrange: true,
                    range: [0, 100]
                },
                xaxis: {
                    title: "X1",
                    fixedrange: true,
                    range: [0, 100]
                }
            },
            frames: [],
            config: { displayModeBar: false },
        };

    }
    render() {
        return (
            <MuiThemeProvider>
                <Plot
                    divId={this.state.divId}
                    className={this.state.className}
                    data={this.state.data}
                    layout={this.state.layout}
                    frames={this.state.frames}
                    config={this.state.config}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                    onClick={this.onClickPlot}

                />
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Chart1);