import expect from 'expect.js';
import React from 'react'
import sinon from "sinon"
import { reducer } from '../../src/stores/video_store'

describe("VideoStore's reducer", () => {
  describe("default", () => {
    it("returns a new state", () => {
      let state = reducer();
      expect(state.loading).to.be(true)
      expect(state.savingUser).to.be(false)
      expect(state.errors.length).to.be(0)
    })
  })

  describe("SAVING_USER", () => {
    it("returns a saving user state", () => {
      let state = {}
      let action = { type: "SAVING_USER" }

      let newState = reducer(state, action)

      expect(newState.savingUser).to.be(true)
      expect(newState.errors.length).to.be(0)
    })
  })

  describe("SAVED_USER", () => {
    it("returns a saving user state", () => {
      let state = {}
      let action = { type: "SAVED_USER" }

      let newState = reducer(state, action)

      expect(newState.savingUser).to.be(false)
    })
  })

  describe("RECEIVE_VIDEOS", () => {
    let state = {}
    let videos = [ { name: "Nathan For You"} ]
    let action = { type: "RECEIVE_VIDEOS", videos: videos }

    let newState = reducer(state, action)

    expect(newState.videos).to.be(videos)
    expect(newState.loading).to.be(false)
  })

  describe("ERROR", () => {
    it("returns errors state", () => {
      let state = {
        savingUser: true,
        errors: []
      }

      let action = {
        type: "ERROR",
        errors: ["terrible"]
      }

      let newState = reducer(state, action)

      expect(newState.errors[0]).to.be("terrible")
      expect(newState.savingUser).to.be(false)
    })
  })
})
