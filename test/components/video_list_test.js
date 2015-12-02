import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import Video from "../../src/components/video"
import VideoList from "../../src/components/video_list"
import videoStore from '../../src/stores/video_store'
import TestUtils from 'react-addons-test-utils';

const videos = [
  { id: 1, name: "Great Video" },
  { id: 2, name: "Terrible Video" }
];

let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

describe("VideoList", () => {
  it("renders when given an array", () => {
    let videoList = render(<VideoList videos={videos}/>);
    expect(videoList.type).to.be('div');
    expect(videoList.props.children).to.have.length(2);
  });

  it("requires videos to be an array", () => {
    let spy = sinon.spy(console, "error")
    let notArray = { map: function() {} }

    render(<VideoList videos={ notArray }/>);

    expect(spy.called).to.be(true);
  })
});

