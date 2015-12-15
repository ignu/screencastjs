import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import App from "../../src/components/app"
import TestUtils from 'react-addons-test-utils';
import VideoStore from "../../src/stores/video_store"


// TODO: remove duplication.
let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

describe("App", () => {
  it("renders", () => {
    let app = render(<App store={ VideoStore }/>)
    expect(typeof app.type).to.be("function")
  })
})
