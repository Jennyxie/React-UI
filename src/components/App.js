import React, { Component, Fragment } from "react"
import Exercises from "./Exercises"
import { Header, Footer } from "./Layouts"
import { muscles, exercises } from "../store/store"

export default class extends Component {
  state = {
    exercises,
    exercise: {}
  }

  getExercisesByMuscles() {
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise

        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise]
        return exercises
      }, {})
    )
  }

  handleCategorySelect = (category) => {
    this.setState({
      category
    })
  }

  handleExerciseSelect = (id) => {
    this.setState(({ exercises }) => ({
      exercise: exercises.find((ex) => ex.id === id)
    }))
  }

  handleExerciseCreate = (exercise) => {
    this.setState((prevState) => ({
      exercises: prevState.exercises.concat(exercise),
      exerciseToDisplay: exercise
    }))
  }

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise } = this.state
    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />
        <Exercises
          exercise={exercise}
          category={category}
          exercises={exercises}
          onSelect={this.handleExerciseSelect}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    )
  }
}
