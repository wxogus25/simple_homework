var request = require('request');

var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst';
var queryParams = '?' + encodeURIComponent('ServiceKey') + "=FIHKuHFDKxtly4kDO2jlMQbbLpdvw7AN2tzgYoaxdCt05N29rySRtK7x%2B6YuXG3mD3H5sIx19sa%2BZaqx9453Uw%3D%3D"; /* Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* 한 페이지 결과 수 */
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(''); /* 페이지 번호 */
queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('경기'); /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('HOUR'); /* 요청 데이터기간 (시간 : HOUR, 하루 : DAILY) */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});