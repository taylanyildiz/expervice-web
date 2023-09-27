import { FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


/// Text outline field props
interface TextOutlineFieldProps {
    id?: any;
    name?: string;
    label?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    secret?: boolean;
    type?: "password" | "email" | "number" | "text" | "tel";
    value?: any,
    helperText?: ReactNode | null;
    error?: boolean;
    fullWidth?: boolean,
    minRows?: number,
    maxRows?: number,
    multiline?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}


function TextOutlineField(props?: TextOutlineFieldProps) {
    const { id, name, value, label, prefix, suffix, secret, type, helperText, error, fullWidth, minRows, maxRows, multiline, onChange } = props ?? {};

    /// Show password state
    const [showPassword, setShowPassword] = useState(false);

    /// Changed password visibility handle
    const handleClickShowPassword = () => {
        setShowPassword((value) => !value);
    }

    /// Prefix Icon
    const startAdornment = prefix ? <InputAdornment position="start" children={prefix} /> : null;


    /// Suffix Icon
    const endAdornment = () => {
        if (!secret && !suffix) return null;
        let component = suffix;
        if (secret) {
            component = (
                <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            );
        }
        return <InputAdornment position="end" children={component} />
    }

    return (
        <FormControl fullWidth={fullWidth}>
            <Typography children={label} />
            <TextField
                value={value}
                fullWidth={fullWidth}
                multiline={multiline}
                maxRows={maxRows}
                minRows={minRows}
                onChange={onChange}
                size="small"
                id={id}
                name={name}
                variant="outlined"
                type={showPassword ? 'text' : secret ? 'password' : type ?? "text"}
                helperText={helperText}
                error={error}
                InputProps={{
                    startAdornment,
                    endAdornment: endAdornment(),
                }}
            />
        </FormControl>
    )
}

export default TextOutlineField;