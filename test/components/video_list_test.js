import expect from 'expect.js';
import React from 'react/addons'
import Video from "../../src/components/video"
import VideoList from "../../src/components/video_list"
const { TestUtils } = React.addons;

const videos = [
  { name: "Great Video" },
  { name: "Terrible Video" }
];

let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

describe("VideoList", () => {
  it("is defined", () => {
    expect(VideoList).not.to.be(undefined);
  });

  it("renders when given an array", () => {
    let videoList = render(<VideoList videos={videos}/>);
    expect(videoList.type).to.be('div');
    expect(videoList.props.children).to.have.length(2);
  });

  it("requires videos to be an array", () => {
    // TODO: require sinon
    let called = false;
    console.error = () => called = true;
    let notArray = { map: function() {} }

    render(<VideoList videos={ notArray }/>);

    expect(called).to.be(true);
  })
});
