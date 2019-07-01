import React, { Component } from 'react';
import * as Utils from '../utils';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const TYPE_DATE = 'date';
const TYPE_MONEY = 'money';
const TYPE_TEXT = 'text';
//const TYPE_LINK = 'link';
//const TYPE_IMAGE = 'image';

// A configurable table component which construct a html table based on the column configuration and row data.
class DataTable extends Component {
  state = {
    pageIndex: 0,
    rowsPerPage: 5
  };

  buildColumnHtml = (column, rowData, colIndex, rowIndex) => {
    const { type = TYPE_TEXT } = column;
    const { tableKey } = this.props;
    let columnContent;
    if (column.colCallback) {
      columnContent = column.colCallback(rowData);
    } else {
      columnContent = rowData[column.key];
      switch (type) {
        case TYPE_DATE:
          columnContent = Utils.printDate(columnContent);
          break;
        case TYPE_MONEY:
          columnContent = Utils.printAmount(columnContent);
          break;
        default:
          break;
      }
    }
    return (
      <td
        key={`${tableKey}'_d_'${rowIndex}_${colIndex}`}
        className={column.clz}
      >
        {columnContent || ''}
      </td>
    );
  };

  handleRowClick = event => {
    const tr = event.target.parentElement;
    const { rows, onRowClick } = this.props;
    if (tr && tr.tagName === 'TR' && onRowClick) {
      onRowClick(rows[tr.rowIndex - 1]);
    }
  };

  onPageChanged = data => {
    const { pageIndex } = this.state;
    if (pageIndex + 1 !== data.currentPage) {
      this.setState({ pageIndex: data.currentPage - 1 });
    }
  };

  handleRowsPerPageChange = event => {
    const target = event.target;
    const value = target.value;
    this.setState({ rowsPerPage: parseInt(value, 10) });
  };

  render() {
    const { columns, rows, tableClz = '', tableKey } = this.props;
    const { pageIndex, rowsPerPage } = this.state;
    const startIndex = pageIndex * rowsPerPage;
    const endIndex = pageIndex * rowsPerPage + rowsPerPage;
    const filteredRows = rows.slice(startIndex, endIndex);
    return (
      <table className='table is-fullwidth is-striped'>
        <thead className={tableClz}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={tableKey + '_h_' + index}
                className={column.clz + ' has-text-white'}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onClick={this.handleRowClick}>
          {filteredRows.map((row, rowIndex) => (
            <tr key={tableKey + '_r_' + rowIndex} id={row.id}>
              {columns.map((column, colIndex) =>
                this.buildColumnHtml(column, row, colIndex, rowIndex)
              )}
            </tr>
          ))}
        </tbody>
        {rows && rows.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={columns.length}>
                <div className='columns is-vcentered'>
                  <div className='column'>
                    <div className='field'>
                      <div className='control is-flex'>
                        <label className='horizontal-label'>
                          Rows per page
                        </label>
                        <div className='select'>
                          <select
                            value={rowsPerPage}
                            onChange={this.handleRowsPerPageChange}
                          >
                            {[5, 10, 15, 25].map(opt => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='column'>
                    {/* Showing 126 - 150 of 1858  */}
                    Showing <b>{startIndex + 1}</b> - <b>{endIndex}</b> of{' '}
                    <b>{rows.length}</b>
                  </div>
                  <div className='column'>
                    <Pagination
                      totalRecords={rows.length}
                      pageLimit={rowsPerPage}
                      pageNeighbours={1}
                      onPageChanged={this.onPageChanged}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    );
  }
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf([TYPE_DATE, TYPE_MONEY, TYPE_TEXT]),
      colCallback: PropTypes.func,
      clz: PropTypes.string
    })
  ).isRequired,
  tableKey: PropTypes.string.isRequired,
  tableClz: PropTypes.string
};
export default DataTable;
