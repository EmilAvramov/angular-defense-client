const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {} = require('express');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	console.log('success');
});

app.listen(port, () => console.log(`Server is listening to port ${port}...`));
