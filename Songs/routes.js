import Database from "../Database/index.js"

const Songs = (app) => {
    app.get('/songs', (req, res) => {
      const songs = Database.songs;
      res.send(songs);
    })
    app.get('/', (req, res) => {
      res.send('Welcome to Full Stack Development!')
    })
  }
  export default Songs;