const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 6543;

app.use(bodyParser());

const region = [{
    'id': 1,
    'name': '서울'
},
{
    'id': 2,
    'name': '부산'
},
{
    'id': 3,
    'name': '대구'
},
{
    'id': 4,
    'name': '인천'
},
{
    'id': 5,
    'name': '광주'
},
{
    'id': 6,
    'name': '대전'
},
{
    'id': 7,
    'name': '울산'
},
{
    'id': 8,
    'name': '경기'
},
{
    'id': 9,
    'name': '강원'
},
{
    'id': 10,
    'name': '충북'
},
{
    'id': 11,
    'name': '충남'
},
{
    'id': 12,
    'name': '전북'
},
{
    'id': 13,
    'name': '전남'
},
{
    'id': 14,
    'name': '경북'
},
{
    'id': 15,
    'name': '경남'
},
{
    'id': 16,
    'name': '제주'
},{
    'id': 17,
    'name': '세종'
}
];

function recall(reg_id, callback) {
    var request = require('request');
    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + "=FIHKuHFDKxtly4kDO2jlMQbbLpdvw7AN2tzgYoaxdCt05N29rySRtK7x%2B6YuXG3mD3H5sIx19sa%2BZaqx9453Uw%3D%3D"; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* 한 페이지 결과 수 */
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
    queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(region[reg_id].name); /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
    queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('HOUR'); /* 요청 데이터기간 (시간 : HOUR, 하루 : DAILY) */

    return request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        callback(body);
    });
}

var change = [{
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

function wrap(Body){
   change = Body; 
}

router.get('/test',(ctx)=>{
    const { id } = ctx.query;
    recall(id - 1, function(body){
        ctx.body = body;
        console.log('1');
    });
    ctx.body = change;
    console.log('2');
});

router.get('/region', (ctx) => {
  ctx.body = region;
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

app.listen(port, () => {
    console.log('Connect!');
});