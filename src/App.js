import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import NavBar from './components/NavBar';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles';

import EnhancedTable from './components/EnhancedTable';
import moment from 'moment';

const theme = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
});

class App extends Component {


  constructor(props) {
    super(props);
    this.counter = 0;
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

    this.onClickPlot = this.onClickPlot.bind(this);
    this.onClickDicide = this.onClickDicide.bind(this);
  }


  componentDidMount() {
    this.setData();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (

      <React.Fragment>
        <MuiThemeProvider theme={theme} >

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={24}
          >
            <NavBar />
            <Grid item xs={6}>
              <Grid container justify="center" alignItems="center">
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
              </Grid>
            </Grid>

            <Grid item xs={6}>

              <Typography variant="h6" color="inherit" noWrap>배당 확률</Typography>

              <form noValidate autoComplete="off">
                <FormControl>

                  <TextField
                    id="outlined-read-only-input"
                    label="X1"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    value={this.state.pod.x1}
                  />

                  <TextField
                    id="outlined-read-only-input"
                    label="X2"
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    value={this.state.pod.x2}
                  />

                </FormControl>
              </form>

              <Typography variant="h6" color="inherit" noWrap>주식별 배당 토큰</Typography>

              <form noValidate autoComplete="off">
                <FormControl>

                  <TextField
                    id="outlined-read-only-input"
                    label="X1"
                    margin="normal"
                    variant="outlined"
                    value={this.state.podt.x1}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="X2"
                    margin="normal"
                    variant="outlined"
                    value={this.state.podt.x2}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                </FormControl>
              </form>

              <Typography variant="h6" color="inherit" noWrap>Round : {this.state.revision} / 30</Typography>
              <Button variant="contained" color="primary" onClick={this.onClickDicide}>결정</Button>
            </Grid>

            <Grid item xs={10}>
              <EnhancedTable
                rows={this.state.rows}
              />
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </React.Fragment >
    );
  }
  createData(round, decision, x1, x2, x, y) {
    this.counter += 1;

    let rows = this.state.rows;
    rows.push({ id: this.counter, dicision: decision, round: round, time: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'), pod_x1: this.state.pod.x1, pod_x2: this.state.pod.x2, podt_x1: x1, podt_x2: x2, interceptX: x, interceptY: y });
    console.log(rows);
    this.setState({ rows });
  }

  onClickPlot(data) {
    //console.log(data.points[0].x + "," + data.points[0].y);
    let podt = this.state.podt;
    podt.x1 = data.points[0].x;
    podt.x2 = data.points[0].y;
    this.setState({ podt });

    this.createData(this.state.revision, "False", podt.x1, podt.x2, this.state.interceptX, this.state.interceptY);
  }

  setData() {
    let arrayX = [];
    let arrayY = [];
    let interceptX;
    let interceptY;
    //(interceptY * x) + (interceptX * y) = interceptX * interceptY
    //y = (interceptX * interceptY - (interceptY * x)) / interceptX

    if (Math.random() >= 0.5) {
      interceptX = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      interceptY = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    } else {
      interceptX = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      interceptY = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    }
    for (let x = 0; x <= interceptX; x += 0.1) {
      arrayX.push(x.toFixed(1));
      arrayY.push(((interceptX * interceptY - (interceptY * x)) / interceptX).toFixed(1));
    }

    let data = [
      { type: 'scatter', x: arrayX, y: arrayY }
    ]
    this.setState({ data, interceptX, interceptY });
  }



  onClickDicide() {
    if (this.state.revision >= 30)
      return;

    let podt = this.state.podt;
    if (podt.x1 === 0 && podt.x2 === 0) {
      alert("'주식별배당토큰'을 선택해주세요.");
      return;
    }

    let revision = this.state.revision;

    this.setData();
    this.createData(revision, "True", podt.x1, podt.x2, this.state.interceptX, this.state.interceptY);

    revision = revision + 1;
    podt.x1 = 0;
    podt.x2 = 0;
    this.setState({ podt, revision });
  }
}

export default withStyles(styles)(App);
