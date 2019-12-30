const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 6543;
const convert = require('xml-js');

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
    'cityName': '도시1',
    'pm10Value': 53,
    'pm25Value': 13
    },{
    'cityName': '도시2',
    'pm10Value': 81,
    'pm25Value': 16
    },{
    'cityName': '도시3',
    'pm10Value': 14,
    'pm25Value': 18
}];

function sync(reg_id) {
    return new Promise(function(resolve, reject){
        recall(reg_id, function(res){
            resolve(res);
        });
    });
}

router.get('/test', async (res)=>{
    const { id } = res.query;
    if(id == 0){
        res.body = change;
    }else{
        var check = await sync(id-1);
        check = convert.xml2json(check, {compact: true, spaces:4});
        check = JSON.parse(check);
        res.body = check.response.body.items.item;
        for(var i=0;i<res.body.length;i++){
            res.body[i].cityName = res.body[i].cityName._text;
            res.body[i].pm10Value = res.body[i].pm10Value._text;
            res.body[i].pm25Value = res.body[i].pm25Value._text;
        }
        if(res.body.length == undefined){
            res.body.cityName = res.body.cityName._text;
            res.body.pm10Value = res.body.pm10Value._text;
            res.body.pm25Value = res.body.pm25Value._text;
            var tp = [res.body];
            res.body = tp;
        }
    }
    console.log(res.body);
});

router.get('/region', (ctx) => {
  ctx.body = region;
});

// router.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   // name의 존재 유무에 따라 다른 결과 출력
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   // id의 존재 유무에 따라 다른 결과 출력
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log('Connect!');
});