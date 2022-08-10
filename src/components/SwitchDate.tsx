import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: "center"
    },
    textDate: {
        color: theme.color.turqouise,
        fontWeight: "bold",
        fontSize: 20,
    },
    iconButtonOutlined: {
        width: 35,
        height: 35,
        borderRadius: 8,
        border: "1px solid",
        borderColor: theme.color.grey,
    },
    gap: {
        marginRight: 30,
    }
}));
interface Prop {
    currentDateRange: string
}

const SwitchDate: FunctionComponent<Prop> = ({ currentDateRange }) => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <IconButton className={clsx(classes.iconButtonOutlined, classes.gap)}>
                <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography variant="subtitle1" className={clsx(classes.textDate, classes.gap)}>{currentDateRange}</Typography>
            <IconButton className={classes.iconButtonOutlined}>
                <ArrowForwardIosRoundedIcon />
            </IconButton>
        </Box>

    )
};

export default SwitchDate;


