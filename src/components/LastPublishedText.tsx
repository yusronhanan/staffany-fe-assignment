import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

const useStyles = makeStyles((theme) => ({
    weekTypography: {
        marginLeft: 15,
        marginRight: 15,
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: theme.color.turqouise,
        fontSize: 15
    },
}));
interface Prop {
    lastPublishDate: string;
    className?: string;
}

const LastPublishedText: FunctionComponent<Prop> = ({ lastPublishDate, className }) => {
    const classes = useStyles();
    return (
        <Typography variant="body1" className={clsx(className ?? classes.weekTypography)}>
            <CheckCircleOutlineRoundedIcon /> <span style={{ marginLeft: 5 }}> Week published on {lastPublishDate} </span>
        </Typography>
    )
};

export default LastPublishedText;


