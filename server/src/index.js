const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

function recall(reg_Big, reg_Small, callback) {
    var request = require('request');
    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + "=FIHKuHFDKxtly4kDO2jlMQbbLpdvw7AN2tzgYoaxdCt05N29rySRtK7x%2B6YuXG3mD3H5sIx19sa%2BZaqx9453Uw%3D%3D"; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
    queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent('경기'); /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
    queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('DAILY'); /* 요청 데이터기간 (시간 : HOUR, 하루 : DAILY) */

    return request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        callback(body);
    });
}

var change;

function wrap(Body){
   change = Body; 
   console.log('2');
}

router.get('/',(ctx)=>{
    recall(1,1,function(body){
    wrap(body);
    console.log('1');
    setTimeout(() => {
        ctx.body = change;
        console.log('asdf',ctx.body);
    });
    }, 200);
});

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  // id의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(6543, () => {
    console.log('Connect!');
});