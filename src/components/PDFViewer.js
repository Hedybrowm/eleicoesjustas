import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //To render pdf in components
//import { PDFViewer } from '@react-pdf/renderer'; //To render pdf directly in DOM
//import ReactPDF from '@react-pdf/renderer'; //To render pdf in a file instead of in a component


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

 

// Create Document Component

const PDFRenderer = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


/*
class PDFRenderer extends React.Component{
  render (){
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );    
  }
}
*/

//ReactPDF.render(<PDFRenderer />, `${__dirname}/example.pdf`);

export default PDFRenderer;
