import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function pm10grade(props){
    if(props < 31){
        return '좋음';
    }else if(props < 81){
        return '보통';
    }else if(props < 151){
        return '나쁨';
    }else{
        return '매우나쁨';
    }
}

function pm25grade(props){
    if(props < 16){
        return '좋음';
    }else if(props < 51){
        return '보통';
    }else if(props < 101){
        return '나쁨';
    }else{
        return '매우나쁨';
    }
}

class CityAir extends React.Component{
    render() {
        console.log('test',this.props.cityname);
        return(
            <TableRow>
            <TableCell>{this.props.cityname}</TableCell>
            <TableCell>{this.props.pm10}</TableCell>
            <TableCell>{pm10grade(this.props.pm10)}</TableCell>
            <TableCell>{this.props.pm25}</TableCell>
            <TableCell>{pm25grade(this.props.pm25)}</TableCell>
            </TableRow>
        );
    }
}

export default CityAir;