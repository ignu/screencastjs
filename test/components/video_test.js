import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import Video from "../../src/components/video"
import TestUtils from 'react-addons-test-utils';
import VideoStore from "../../src/stores/video_store"
import R from 'ramda'


// TODO: remove duplication.
let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

let hasDownloadLink = (component) => {
  let findLink = R.find((c) => {
    if(!(c && c.props)) return false

    return c.props.href === '/video_source/episode-1.mp4'
  })

  return findLink(component.props.children) != undefined
}

let video = {
  id: 1,
  name: "Cool Video"
}

describe("Video", () => {
  describe("when logged in", () => {
    it("shows the video link", () => {
      let comp = render(<Video loggedIn={true} video={video}/>)
      expect(hasDownloadLink(comp)).to.be(true)
    })
  })

  describe("when not logged in", () => {
    it("doesnt have a download link", () => {
      let comp = render(<Video loggedIn={false} video={video}/>)
      expect(hasDownloadLink(comp)).to.be(false)
    })
  })
})
