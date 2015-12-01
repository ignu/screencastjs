import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import Video from "../../src/components/video"
import VideoList from "../../src/components/video_list"
import videoStore from '../../src/stores/video_store'
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux'
import stubContext from 'react-stub-context'

let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

let VideoListWithContext = stubContext(VideoList, { store: videoStore })

describe("VideoList", () => {
  it("renders when given an array", () => {
    let videoList = render(<VideoListWithContext/>);
    expect(typeof videoList.type).to.be("function")
  });
});
