import * as dotenv from 'dotenv';
import app from './App';
dotenv.config();

const port = Number(process.env.PORT || 3000);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
