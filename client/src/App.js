import React, { Component } from 'react';
import CityAir from './components/CityAir';
import './App.css';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit *2
  }
});

function Head(props) {
  return (
    <div>
      <h1>시도별 실시간 미세먼지 측정정보 조회 서비스</h1>
      <p>이 사이트는 선택한 지역의 미세먼지 지수를 실시간으로 알려줍니다.</p>
    </div>
  );
}

var temp;

class App extends Component {
  state = {
    city_air: "",
    citys: "",
    completed: 0,
    value: ''
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi1()
      .then(res => this.setState({citys: res}))
      .catch(err => console.log(err));
    this.callApi2()
      .then(res => this.setState({city_air: res}))
      .catch(err => console.log(err));
  }

  callApi1 = async() => {
    const response = await fetch('/region');
    const body = await response.json();
    return body;
  }

  callApi2 = async() => {
    const response = await fetch("/test?id=0");
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleChange = (event) => {
    var cid=event.target.value;
    console.log(cid);
    if(cid == '0')
      return;
    
    this.callApi3(cid)
      .then(res => this.setState({city_air: res}))
      // .then(res => this.setState({city_air: xmlToJson.parse(res)}))
      .catch(err => console.log(err));
  }

  callApi3 = async(cid) => {
    const response = await fetch('/test?id='+cid);
    const body = await response.json();
    return body;
  }

  render(){   
    const { classes } = this.props;
    return (
      <div className="App">
        <header className = "App-header">
          <Head />

          <select name='city' value={this.state.value} size ='1' onChange={this.handleChange}>
            <option value='0'>선택</option>
            {this.state.citys ? this.state.citys.map(c => { return ( <option value={c.id}>{c.name}</option> );}) : <p>asdf</p>}
          </select>

        </header>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>지역</TableCell>
              <TableCell>미세먼지(PM10)</TableCell>
              <TableCell>미세먼지 등급(좋음~매우나쁨)</TableCell>
              <TableCell>초미세먼지(PM2.5)</TableCell>
              <TableCell>초미세먼지 등급(좋음~매우나쁨)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.city_air ? this.state.city_air.map(c => { return ( <CityAir cityname={c.cityName} pm10={c.pm10Value} pm25={c.pm25Value}/> );}) 
            : <TableRow>
                <TableCell colSpan="5" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
        <p>출처: 한국환경공단_대기오염정보 Open API</p>
      </div>
    );
  }
}

export default withStyles(styles)(App);
