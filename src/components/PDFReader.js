import React from 'react';
//import { useState } from 'react';
//import { Page } from 'react-pdf';
//Instead of directly importing/requiring 'react-pdf', import it like so:
//import { Document } from 'react-pdf/dist/entry.webpack';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

//Or Instead of directly importing/requiring 'react-pdf', import it like so:
//import { Document } from 'react-pdf/dist/entry.parcel';
//OBS: Create React App uses Webpack under the hood, but instructions for Webpack will not work. 

/*function PDFReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 
  return (
    <div>
      <Document 
        //file="systemui.pdf"
        file="systemui.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}*/
class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class PDFReader extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>Print this out!</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default PDFReader;
