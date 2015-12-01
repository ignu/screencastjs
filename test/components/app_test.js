import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import App from "../../src/components/app"
import TestUtils from 'react-addons-test-utils';


// TODO: remove duplication.
let render = (component) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
};

describe("App", () => {
  it("renders", () => {
    let app = render(<App/>)
    expect(typeof app.type).to.be("function")
  })
})
