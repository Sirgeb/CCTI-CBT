import React, { Component } from 'react'

export default class Results extends Component {
  state = {
    candidatesRecord: [],
  }

  componentWillMount() {
    this.getResults();
  }

  getResults() {
    const results = JSON.parse(localStorage.getItem('candidatesRecord'));
    this.setState({
      candidatesRecord: results
    })
  }

  render() {
    console.log(this.state.candidatesRecord);

    return (
      <center>
        <table border="1" width="1000px" style={{ marginTop: 30 }}>
          <thead>
            <tr>
              <th> Serial No </th>
              <th> Names </th>
              <th> Scores </th>
              <th> Candidates Exam Time </th>
              <th> No. of Questions </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {this.state.candidatesRecord.length === 0 || null ?
              <tr>
                <td colSpan="5"> No result found </td>
              </tr>
              :
              this.state.candidatesRecord.map((candidateRecord) => (
                <tr key={candidateRecord.candidateRecordNo}>
                  <td> {candidateRecord.candidateRecordNo} </td>
                  <td> {candidateRecord.candidateData[0].fullName} </td>
                  <td> {candidateRecord.score} </td>
                  <td> 35 mins ({candidateRecord.examTimeUse}) </td>
                  <td> 50 </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </center>
    )
  }
}
