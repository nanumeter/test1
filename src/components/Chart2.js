import React from 'react';
import Plot from 'react-plotly.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});



class Chart2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    x: [1,2,3,4,5],
                    y: [1,2,3,4,5],
                    z: [1,2,3,4,5],
                    mode: 'markers',
                    marker: {
                        color: '#1f77b4',
                        size: 3,
                        symbol: 'circle',
                        line: {
                            color: 'rgb(0,0,0)',
                            width: 0
                        }
                    },
                    line: {
                        color: '#1f77b4',
                        width: 5
                    },
                    type: 'scatter3d'
                }
            ],
            layout: {
                "width": 800, "height": 800, hovermode: 'closest', clickmode: "event+select",
                yaxis: {
                    title: "X2",
                    fixedrange: true,
                    range: [0, 1]
                },
                xaxis: {
                    title: "X1",
                    fixedrange: true,
                    range: [0, 1]
                },
                xaxis: {
                    title: "X1",
                    fixedrange: true,
                    range: [0, 1]
                },
                scene: {
                    camera: {
                        up: { x: 0, y: 0, z: 1 },
                        center: { x: 0, y: 0, z: 0 },
                        eye: { x: 2, y: 1, z: 0.1 }
                    }
                }
            },
            frames: [],
            config: { displayModeBar: false },

        };
    }

    componentDidMount() {
        //this.setData();
    }

    setData() {
        let arrayX = [];
        let arrayY = [];
        let arrayZ = [];
        let interceptX;
        let interceptY;
        let interceptZ;
        //(interceptY * x) + (interceptX * y) = interceptX * interceptY
        //y = (interceptX * interceptY - (interceptY * x)) / interceptX

        if (Math.random() >= 0.66) {
            interceptX = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            interceptY = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            interceptZ = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        } else if (Math.random() >= 0.33) {
            interceptX = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            interceptY = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            interceptZ = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        } else {
            interceptX = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            interceptY = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
            interceptZ = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        }
        for (let x = 0; x <= interceptX; x += 0.1) {
            arrayX.push(x.toFixed(1));
            arrayY.push(((interceptX * interceptY - (interceptY * x)) / interceptX).toFixed(1));
            arrayZ.push(((interceptX * interceptZ - (interceptZ * x)) / interceptX).toFixed(1));
        }

        let data = [
            {
                x: arrayX,
                y: arrayY,
                z: arrayZ,
                mode: 'lines',
                marker: {
                    color: '#1f77b4',
                    size: 12,
                    symbol: 'circle',
                    line: {
                        color: 'rgb(0,0,0)',
                        width: 0
                    }
                },
                line: {
                    color: '#1f77b4',
                    width: 5
                },
                type: 'scatter3d'
            }
        ]
        this.setState({ data, interceptX, interceptY });
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
                    camera={this.state.camera}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                    onClick={this.onClickPlot}
                />
            </MuiThemeProvider >
        );
    }
}

export default withStyles(styles)(Chart2);