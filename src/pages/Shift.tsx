import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import { deleteShiftById, getShiftsByYearWeek } from "../helper/api/shift";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Card, CardContent, IconButton, Fab, Box, } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "../components/Button";
import LastPublishedText from "../components/LastPublishedText";
import SwitchDate from "../components/SwitchDate";
import { convertDateRangeToText, convertToYearWeek, getTodayDateRangeInWeek } from "../helper/function";
import { getShiftPublishedByYearWeek } from "../helper/api/shiftPublished";
import { EStatusShiftPublished, IShiftPublished } from "../helper/interface";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: 'white',
    color: theme.color.turquoise
  },

}));

interface ActionButtonProps {
  id: string;
  disabled: boolean;
  onDelete: () => void;
}
const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  disabled,
  onDelete,
}) => {
  return (
    <div>
      <IconButton
        disabled={disabled}
        size="small"
        aria-label="delete"
        component={RouterLink}
        to={`/shift/${id}/edit`
        }
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        disabled={disabled}
        size="small"
        aria-label="delete"
        onClick={() => onDelete()
        }>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { startDateOfCurrentWeek, endDateOfCurrentWeek } = getTodayDateRangeInWeek();
  const [startWeekDate, setStartWeekDate] = useState(startDateOfCurrentWeek);
  const [endWeekDate, setEndWeekDate] = useState(endDateOfCurrentWeek);
  const [weekDateRangeText, setWeekDateRangeText] = useState(convertDateRangeToText(startWeekDate, endWeekDate))
  const [yearWeekDateRange, setYearWeekDateRange] = useState(convertToYearWeek(startWeekDate))
  const [shiftPublished, setShiftPublished] = useState<IShiftPublished | null>(null)
  const [isSelectedWeekPublished, setIsSelectedWeekPublished] = useState<boolean>(false)

  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  const switchDateRange = (action: "forward" | "back") => {
    let addedRange = action === "forward" ? 7 : -7;
    let newStartDate = startWeekDate;
    let newEndDate = endWeekDate;
    newStartDate.setDate(newStartDate.getDate() + addedRange);
    newEndDate.setDate(newEndDate.getDate() + addedRange);

    setStartWeekDate(newStartDate)
    setEndWeekDate(newEndDate)
    setWeekDateRangeText(convertDateRangeToText(newStartDate, newEndDate))
    setYearWeekDateRange(convertToYearWeek(newStartDate))
    getData();
  }
  const getData = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      const response = await getShiftsByYearWeek(yearWeekDateRange);
      setRows(response.results);

      const responseShiftPublished = await getShiftPublishedByYearWeek(yearWeekDateRange);
      if (responseShiftPublished.results != null) {
        const shiftPublished: IShiftPublished = responseShiftPublished.results as IShiftPublished;
        console.log(`shiftPublished ${shiftPublished.createdAt}`)
        setShiftPublished(shiftPublished)

        if (shiftPublished.status === EStatusShiftPublished.PUBLISHED.toString()) {
          setIsSelectedWeekPublished(true)
        }
      } else {
        setShiftPublished(null)
        setIsSelectedWeekPublished(false)
      }

    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [yearWeekDateRange]);


  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton disabled={isSelectedWeekPublished} id={row.id} onDelete={() => onDeleteClick(row.id)} />
      ),
    },
  ];

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }
      if (isSelectedWeekPublished) {
        throw new Error("Shift is already published");
      }

      console.log(deleteDataById);

      await deleteShiftById(selectedId);

      const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      setRows(tempRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            {errMsg.length > 0 ? (
              <Alert severity="error">{errMsg}</Alert>
            ) : (
              <></>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SwitchDate
                currentDateRange={weekDateRangeText}
                onClick={switchDateRange}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center" }}>
                {isSelectedWeekPublished ? (
                  <LastPublishedText
                    lastPublishDate={shiftPublished && shiftPublished.status === EStatusShiftPublished.PUBLISHED.toString() ? shiftPublished.createdAt : ""}
                  />
                ) : (
                  <></>
                )}


                <Button variant="outlined"
                  to={`/shift/add/${startWeekDate}`}
                  disabled={isSelectedWeekPublished}
                >
                  ADD SHIFT
                </Button>
                <Button
                  variant="contained"
                  disabled={isSelectedWeekPublished || rows.length === 0}
                >
                  PUBLISH
                </Button>
              </Box>
            </Box>

            <DataTable
              title="Shifts"
              columns={columns}
              data={rows}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>
      {!isSelectedWeekPublished ? (<Fab
        size="medium"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push(`/shift/add/${startWeekDate}`)}
      >
        <AddIcon />
      </Fab>) : (
        <></>
      )}
      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={deleteDataById}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
