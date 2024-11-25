const fs = require('fs');
const axios = require("axios");
try {
    const data = require("./list.js");
    console.log(data)
    const f = [];
    for(let i of data){
        i.images = fs.readdirSync("./html/images/"+i.name).map(x=>"./images/"+i.name+"/"+x);
        let location = axios
        .get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode", {
            params:{
                query: i.addressko
            },
            headers: {
                'x-ncp-apigw-api-key-id': "jjpxnzq8cx",
                'x-ncp-apigw-api-key':  "DAVSirEejLKQ2h3TEj4uPAjD67PH3VXvxGE0a8Bf",
                'Accept': 'application/json',
            }
        })
        .then(x=>{x=x.data;i.x = x.addresses[0].x;i.y = x.addresses[0].y});
        f.push(location);
    }
    Promise.all(f)
    .then(_=>fs.writeFileSync('./html/pin.json', JSON.stringify(data)))
    .finally(x=>console.log("complete"));
} catch (e) {
    
    console.error(e);
}