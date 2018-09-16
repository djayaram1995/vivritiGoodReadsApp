import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './table.css'
class TableComponent extends Component {
    render() {

        return (
            <div>
            <table style={{minHeight: '500px'}} className="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        {this.props.columns.map((column,i) => <th key={i}>{column}</th>)}
                    </tr>
                </thead>
                {this.props.rows.length > 0 ?
                    this.props.rows.map((row, i) => {
                    return (
                        <tbody key={i}> 
                        <tr>
                            {this.props.columns.map((column, index) => <td key={index}>{row[column]}</td>)}
                        </tr>
                        </tbody>);
                    }): null}
            </table>
            {
                this.props.rows.length ===  0 ?
                    <div className="tableNoData">Enter the book name or author to search</div>:null
            }
            
            </div>
            );
    }

}
export default TableComponent; 