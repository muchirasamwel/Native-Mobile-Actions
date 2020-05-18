let express = require('express');
let app = express();
const cors = require('cors');
const port = 8091;
let path = require('path');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let formidable = require('formidable');
let fs = require('fs');
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cors());
let con = mysql.createConnection({
    host: '192.168.10.10',
    user: 'samkan',
    password: 'samkan',
    database: 'react_native_actions',
});

let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('NODE SERVER RUNNING on localhost:' + port);
});

con.connect(function (error) {
    if (error) console.log('unexpected error ' + error);
    else console.log('connected');
});

app.get('/get-items', function (req, res) {
    con.query('select * from users', function (error, row, fields) {
        if (error) {
            console.log(error);
            res.send([])
        } else {
            res.send(row);
        }
    });
});

app.get('/', (req, res) => {
    res.status(200).send('You can post to /api/upload.');
});
app.get('/image/:imagename',(req,res)=>{
    res.sendFile(path.join(__dirname,'/images/'+req.params.imagename));
})
app.post('/api/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    try {
        form.parse(req, function (err, fields, files) {
            console.log(files);
            let old_path = files.image.path;
            let new_path = './server/images/' + files.image.name;
            fs.rename(old_path, new_path, function (err) {
                if (err)
                    res.send('error: Upload Failed');
            });
            con.query(
                "insert into users (name,avatar) values('" + fields.name + "','"+files.image.name+"')",
                function (error, row, fields) {
                    if (error) {
                        console.log(error);
                        res.send('query error '+error);
                    } else {
                        res.send('Item added successfully');
                    }
                },
            );
        });

    } catch (e) {
        res.send('error: ' + e);
    }
});
