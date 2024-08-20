import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const Input = ({ type, half, label, handleChange, autoFocus, name, handleShowPassword }) => {
    return (
        <Grid item xs={half ? 6 : 12}>
            <TextField
                name={name}
                type={type}
                variant="outlined"
                fullWidth
                required
                label={label}
                autoFocus={autoFocus}
                onChange={handleChange}
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleShowPassword}
                            >
                                {type === "password" ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input
