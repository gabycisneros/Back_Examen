const express = require('express');
var cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/personas'));
app.use(require('./routes/maestros'));
app.use(require('./routes/estudiantes'));
app.use(require('./routes/security'));

app.get('/', (req,res) =>{
    res.status(200).send('index');  
} )

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
