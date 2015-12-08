import expect from 'expect.js';
import mongoose, { Schema } from 'mongoose'
import Video from "../../server/models/video"

describe("Video", () => {
  before((done)=>{
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      let connectionString = 'mongodb://localhost/screencasts'
      mongoose.connect(connectionString, function (err) {
        if (err) {throw err;}
        return clearDB();
      });
    } else {
      console.log(mongoose)
      return clearDB();
    }
  })

  after((done) => {
    mongoose.disconnect();
    return done();
  })

  it("can persist", (done) => {
    let video = Video({
      name: "Episode 1",
      file: "episode-1"
    })

    video.save()
    video.save((err, createdVideo) => {
      console.log("in save")
      console.log("err", err)
      expect(createdVideo.name).to.eq("Episode 1")
      done()
    })
  })
})
