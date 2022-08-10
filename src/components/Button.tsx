import React, { FunctionComponent } from "react";
import ButtonMUI from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    outlineBtn: {
        color: theme.color.turqouise,
        outline: theme.color.turqouise,
        borderColor: theme.color.turqouise,
    },
    containedBtn: {
        color: theme.color.white,
        backgroundColor: theme.color.turqouise,
    },
    btn: {
        marginRight: 20
    }
}));
interface Prop {
    children: React.ReactNode;
    disabled?: boolean;
    to?: string;
    onClick?: () => void;
    variant: "text" | "outlined" | "contained" | undefined;
    className?: string;
}

const Button: FunctionComponent<Prop> = ({ children, disabled = false, to, onClick, variant, className }) => {
    const classes = useStyles();
    let button;
    if (to != null) {
        button = <ButtonMUI
            variant={variant}
            component={RouterLink}
            className={className ?? clsx(classes.btn, variant === "outlined" ? classes.outlineBtn : classes.containedBtn)}
            to={to}
            disabled={disabled}
        >
            {children}
        </ButtonMUI>;
    } else if (onClick != null) {
        button = <ButtonMUI
            variant={variant}
            onClick={() => { onClick() }}
            className={className ?? clsx(classes.btn, variant === "outlined" ? classes.outlineBtn : classes.containedBtn)}
            disabled={disabled}
        >
            {children}
        </ButtonMUI>;
    } else {
        button = <ButtonMUI
            variant={variant}
            className={className ?? clsx(classes.btn, variant === "outlined" ? classes.outlineBtn : classes.containedBtn)}
            disabled={disabled}
        >
            {children}
        </ButtonMUI>;
    }
    return (
        <>
            {button}
        </>
    )
};

export default Button;
