import React, { Component, Fragment } from "react"
import { Dialog, Button, Fab } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import { Add } from "@material-ui/icons"
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
  FormControl: {
    width: 500
  }
})

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      exercise: {
        title: "",
        description: "",
        muscles: ""
      }
    }

    handleToggle = () => {
      this.setState({
        open: !this.state.open
      })
    }

    handleChange = (name) => ({ target: { value } }) => {
      this.setState({
        exercise: {
          ...this.state.exercise,
          [name]: value
        }
      })
    }

    handleSubmit = () => {
      const { exercise } = this.state
      this.props.onCreate({
        ...exercise,
        id: exercise.title.toLowerCase().replace(/ /g, "-")
      })

      this.setState({
        open: false,
        exercise: {
          title: "",
          description: "",
          muscles: ""
        }
      })
    }

    render() {
      const {
          open,
          exercise: { title, description, muscles }
        } = this.state,
        { classes, muscles: categories } = this.props

      return (
        <Fragment>
          <Fab onClick={this.handleToggle} size="small">
            <Add />
          </Fab>

          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle id="form-dialog-title">
              Create a New Exercise
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Please fill out the form below
              </DialogContentText>
              <form>
                <TextField
                  label="Title"
                  Value={title}
                  onChange={this.handleChange("title")}
                  margin="normal"
                  className={classes.FormControl}
                />
                <br />
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="muscles">Muscles</InputLabel>
                  <Select
                    value={muscles}
                    onChange={this.handleChange("muscles")}
                    helperText="Please select your muscle"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  multiline
                  rows="4"
                  label="Description"
                  Value={description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                  className={classes.FormControl}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )
    }
  }
)
