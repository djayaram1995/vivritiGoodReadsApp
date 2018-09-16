import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";

import './AppHeader.css';
import TableComponent from './TableComponent';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      columns: ['Book', 'Author', 'Year', 'Rating' ],
      pageNumber: 1
    };
  }
  type(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleEnterAdd(e) {
    if (e.key === "Enter") {
      this.searchBook(1);
    }
  }
  searchBook(page) {
    const { name } = this.state;
    const url = `http://www.goodreads.com/search/index.xml?key=bcbko3GCzvl8r0ZEDYwM7w&q=${name}&page=${page}`;
    this.ajax(url)
      .then((yqlResponse) => {
        const booksData=yqlResponse.data.query.results.GoodreadsResponse.search.results.work;
        const rowData = booksData.map(book => {
          return {
            'Book': book.best_book.title ? book.best_book.title: '---',
            'Author': book.best_book.author.name ? book.best_book.author.name: '---',
            'Year': book.original_publication_year.content ? book.original_publication_year.content: '---',
            'Rating': typeof book.average_rating !== "object" ? book.average_rating : '---'
        };
        })
        this.setState({
          rows: rowData,
          totalResult: yqlResponse.data.query.results.GoodreadsResponse.search[`total-results`],
        })
      }).catch((error) => {
        console.log(`error: ${error}`);
      });
  }
  ajax(url) {
    const yqlUrl = "http://query.yahooapis.com/v1/public/yql";
    let q = `select * from xml where url="${url}"`;

    return axios.get(yqlUrl, {
      params: {
        q: q,
        format: "json"
      }
    });
  }
  handlePageChange(pageNumber) {
    this.setState({pageNumber});
    this.searchBook(pageNumber);
  }
  render() {
    const { name, totalResult, columns, rows, pageNumber } = this.state;
    return (
      <div>
        <div>
          GOOD READS APP
        </div>
        <div>
          <input type="text" value={name} onKeyPress={e => this.handleEnterAdd(e)} onChange={e => this.type(e)} />
          <button onClick={() => this.searchBook(1)}>Search</button>
        </div>
        <TableComponent columns={columns || []} rows={rows || []} />
        <div id="pagination">
          
        {totalResult ?
          <div>
            <Pagination
              activePage={pageNumber}
              itemsCountPerPage={20}
              totalItemsCount={totalResult/20}
              pageRangeDisplayed={5}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            /> 
          </div>: null}
        </div>
      </div>
    );
  }
}

export default App;
