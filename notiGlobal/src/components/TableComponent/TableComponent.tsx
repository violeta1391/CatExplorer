import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useMemo } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useColumnFilter } from "../../hooks/useColumnFilter";
import { useSort } from "../../hooks/useSort";

interface Column<T> {
    key: keyof T;
    label: string;
}

interface TableComponentProps<T> {
    data: T[];
    columns: Column<T>[];
    filterColumn?: keyof T;
    style?: React.CSSProperties;
}

export function TableComponent<T>({
    data,
    columns,
    filterColumn,
    style
}: TableComponentProps<T>) {
    const {
        filterValue,
        setFilterValue,
        uniqueValues,
        filteredData,
    } = useColumnFilter(data, filterColumn);

    const {
        page,
        rowsPerPage,
        setPage,
        handleChangePage,
        handleChangeRowsPerPage,
    } = usePagination();

    const {
        sortedData,
        toggleSort,
        order,
        key: sortedKey,
    } = useSort(filteredData, null);

    const paginatedData = useMemo(() => {
        const start = page * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);


    return (
        <TableContainer style={style} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.key)}
                                onClick={() => {
                                    if (col.key === "name") toggleSort(col.key);
                                }}
                                style={{ cursor: col.key === "name" ? "pointer" : "default" }}
                            >
                                {col.key === filterColumn ? (
                                    <Select
                                        value={filterValue}
                                        onChange={(e) => {
                                            setFilterValue(e.target.value);
                                            setPage(0);
                                        }}
                                        variant="standard"
                                        fullWidth
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        {uniqueValues.map((val) => (
                                            <MenuItem key={val} value={val}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <>
                                        {col.label}
                                        {col.key === "name" && (
                                            <span style={{ marginLeft: 4 }}>
                                                {sortedKey === "name" ? (order === "asc" ? "▲" : "▼") : "▲"}
                                            </span>
                                        )}
                                    </>
                                )}
                            </TableCell>
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>
                                        {String(row[col.key])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                No results found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
            />
        </TableContainer>
    );
}  