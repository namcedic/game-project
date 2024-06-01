import express from 'express';
import {AppDataSource} from "./database/data-source";

// const app = express();
// const port = 3000;
//
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// app.listen(port, () => {
//     return console.log(`Express is listening at http://localhost:${port}`);
// });



AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json())
    app.get('/', (req, res) => {
        return res.json('Established connection!');
    })
    return app.listen(process.env.PORT);
})