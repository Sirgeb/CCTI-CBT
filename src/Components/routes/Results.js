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
        <h2 style={{textAlign: "center"}}>Admas I.T Place Students Result Sheet</h2>
        <table border="1" style={{ marginTop: 30, width: "1000px" }}>
          <thead>
            <tr>
              <th> Serial No </th>
              <th> Names </th>
              <th> Scores </th>
              <th> Candidates Exam Time </th>
              <th> No. of Questions </th>
            </tr>
          </thead>
          
          {!!this.state.candidatesRecord ? 
          <tbody style={{ textAlign: "center" }}>
              {
                this.state.candidatesRecord.map((candidateRecord) => (
                  <tr key={candidateRecord.candidateRecordNo}>
                    <td> {candidateRecord.candidateRecordNo} </td>
                    <td> {candidateRecord.candidateData[0].fullName} </td>
                    <td> {candidateRecord.score} </td>
                    <td> 30 mins, {candidateRecord.used === `Timed Up`? `Timed Up` : `Used ${candidateRecord.used}`} </td>
                    <td> 50 </td>
                  </tr>
                ))
              }
              </tbody> 
             : 
             <tbody>
               <tr>
                 <td colSpan="5" style={{textAlign: "center"}}> No result found </td>
               </tr>
             </tbody> 
            }
            
        </table>
      </center>
    )
  }
}
