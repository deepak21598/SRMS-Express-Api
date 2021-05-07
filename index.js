var Express = require('express');
var config = require('./dbConfig');
var sql = require('mssql');
var bodyParser = require('body-parser');
var cors = require('cors')

const app = Express();
// const port=3001;
const port = process.env.PORT;

// create application/json parser
var jsonParser = bodyParser.json()
app.use(cors())

app.get('/GetStudent', (req, res) => {
    const query = `select * from studentDetail`
    sql.connect(config).then(pool => {

        return pool.request().query(query)

    }).then(result => {
        // res.json(result);
        res.json(result.recordset);
        // res.json(result.recordsets[0]);
        // res.json(result.rowsAffected);

    }).catch(err => {

        res.json(err);


    });
})

app.get('/GetStudentById', (req, res) => {
    var id = req.query.id;
    const query = `select * from studentDetail where ID=` + id
    sql.connect(config).then(pool => {

        return pool.request().query(query)

    }).then(result => {
        // res.json(result);
        res.json(result.recordset);
        // res.json(result.recordsets[0]);
        // res.json(result.rowsAffected);

    }).catch(err => {

        res.json(err);


    });
})

app.post('/PostStudent', jsonParser, (req, res) => {
    sql.connect(config).then(pool => {

        return pool.request()
            .input("name", sql.VarChar(20), req.body.name)
            .input("course", sql.VarChar(20), req.body.course)
            .input("address", sql.VarChar(20), req.body.address)
            .input("mobile", sql.VarChar(20), req.body.mobile)
            .query("insert into studentDetail (NAME, COURSE, ADDRESS, MOBILE) values (@name,@course,@address,@mobile)")

    }).then(result => {
        res.status(200).json({ status: "Success" })

    }).catch(err => {
        // res.status(400).json({ message: "invalid" })  
        res.send(err.message)


    });

})

app.delete('/DeleteStudent', jsonParser, (req, res) => {
    sql.connect(config).then(pool => {

        return pool.request()
            .input("ID", req.body.ID)
            .query("delete from studentDetail where ID=@ID")

    }).then(result => {
        res.status(200).json({ status: "Success" })

    }).catch(err => {
        // res.status(400).json({ message: "invalid" })  
        res.send(err.message)


    });

})

app.put('/PutStudent', jsonParser, (req, res) => {
    sql.connect(config).then(pool => {

        return pool.request()
            .input("name", sql.VarChar(20), req.body.name)
            .input("course", sql.VarChar(20), req.body.course)
            .input("address", sql.VarChar(20), req.body.address)
            .input("mobile", sql.VarChar(20), req.body.mobile)
            .input("id", req.body.id)
            .query("update studentDetail set NAME=@name,COURSE=@course,ADDRESS=@address,MOBILE=@mobile where ID=@id")

    }).then(result => {
        res.status(200).json({ status: "Success" })

    }).catch(err => {
        // res.status(400).json({ message: "invalid" })  
        res.send(err.message)


    });

})

app.listen(port, () => console.log('listening on port' + port))