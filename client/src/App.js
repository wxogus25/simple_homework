import React, { Component } from 'react';
import CityAir from './components/CityAir';
import './App.css';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

function Region(region){
    return (
        <select name='city' size ='6'>
          <option value='' selected>선택</option>
          <option value='test'>test</option>
        </select>
    );
}

function Head(props) {
  return (
    <div>
      <h1>시도별 실시간 대기오염 측정정보 조회 서비스</h1>
      <p>이 사이트는 선택한 지역의 대기오염 지수를 실시간으로 알려줍니다.</p>
    </div>
  );
}

const city_air = [{
  'cityname': 'asdf',
  'pm10': 53,
  'pm25': 13
},{

  'cityname': 'qwer',
  'pm10': 81,
  'pm25': 16
},{
  'cityname': 'zxcv',
  'pm10': 14,
  'pm25': 18
}];
var hi;

class App extends Component {
  render(){   
    return (
      <div className="App">
        <header className = "App-header">
          <Head fav="se"/>
          <Region />
          {/* <Air name="asdf" id="123"/> */}
        </header>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>지역</TableCell>
              <TableCell>미세먼지(PM10)</TableCell>
              <TableCell>미세먼지 등급(1~4)</TableCell>
              <TableCell>초미세먼지(PM2.5)</TableCell>
              <TableCell>초미세먼지 등급(1~4)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {city_air.map(c => { return ( <CityAir cityname={c.cityname} pm10={c.pm10} pm25={c.pm25}/> );})}
          </TableBody>
        </Table>
        {
          //document.getElementsByName("city").map(c => { return c;})
        }
      </div>
    );
  }
}

export default App;
