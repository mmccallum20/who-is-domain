import "./App.css";
import React, { useState } from "react";

function App() {
  const [domainSearch, setDomainSearch] = useState("");
  const [foundArray, setFoundArray] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setDomainSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDomainSearch("");
    console.log(domainSearch);
  };

  async function getData() {
    let url =
      "https://otx.alienvault.com/otxapi/indicator/domain/whois/domain.com";

    try {
      let response = await fetch(url);
      if (response.ok) {
        let data = await response.json();

        for (let i = 0; i < data.related.length; i++) {
          if (data.related[i].domain === domainSearch) {
            let address = data.data[4].value;
            let city = data.data[5].value;
            let state = data.data[25].value;
            let zip = data.data[32].value;
            let country = data.data[6].value;
            let creationDate = data.data[7].value;
            let dnsSec = data.data[9].value;
            let domainName = data.related[i].domain;
            let emailOrHostnameTitle = data.related[i].related_type;
            let emailOrHostnameValue = data.related[i].related;
            let expirationDate = data.data[18].value;

            let newItem = {
              address,
              city,
              state,
              zip,
              country,
              creationDate,
              dnsSec,
              domainName,
              emailOrHostnameValue,
              emailOrHostnameTitle,
              expirationDate,
            };

            setFoundArray((foundArray) => [...foundArray, newItem]);
          } else {
            continue;
          }
        }
      } else {
        setError(
          `Uh oh, server says no: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      setError(`Uh oh, network says no: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Domain Search</h1>
        </div>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="domainSearch" />
        <input
          className="font-link"
          placeholder="Enter Domain Name"
          name="domainSearch"
          id="domainSearch"
          value={domainSearch}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          onClick={(domainSearch) => getData(domainSearch)}
          className="font-link"
        >
          Submit
        </button>
      </form>

      <div id="number-entries">Show number of entries</div>
      <div id="extra-search-form">
        <form>
          <button className="font-link">Search</button>
          <input></input>
        </form>
      </div>

      <div className="table-container">
        <table className="table">
          <tbody className="table-body">
            {foundArray &&
              foundArray.map((newItem) => {
                return (
                  <>
                    <tr>
                      <th className="table-heading">Record</th>
                      <th className="table-heading">Value</th>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{newItem.address}</td>
                    </tr>

                    <tr>
                      <td>City</td>
                      <td>{newItem.city}</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>{newItem.state}</td>
                    </tr>
                    <tr>
                      <td>Zip</td>
                      <td>{newItem.zip}</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>{newItem.country}</td>
                    </tr>

                    <tr>
                      <td>Creation Date</td>
                      <td>{newItem.creationDate}</td>
                    </tr>

                    <tr>
                      <td>Dnssec</td>
                      <td>{newItem.dnsSec}</td>
                    </tr>

                    <tr>
                      <td>Domain Name</td>
                      <td>{newItem.domainName}</td>
                    </tr>

                    <tr>
                      <td>{newItem.emailOrHostnameTitle}</td>
                      <td>{newItem.emailOrHostnameValue}</td>
                    </tr>

                    <tr>
                      <td>Expiration Date</td>
                      <td>{newItem.expirationDate}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>

          {foundArray.length > 0 && (
            <tfoot>
              <tr>
                <td className="footer-text">
                  Showing 1 to {foundArray.length} of {foundArray.length}{" "}
                  entries
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
