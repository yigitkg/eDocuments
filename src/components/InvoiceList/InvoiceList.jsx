import React, { useEffect, useState } from 'react';
import './styles.css';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/invoices.json')
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) =>
        console.error('Veri alınırken bir hata oluştu:', error)
      );
  }, []);

  const indexOfLastInvoice = currentPage * perPage;
  const indexOfFirstInvoice = indexOfLastInvoice - perPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  return (
    <div className="invoiceListContainer">
      <h2>Fatura Listesi</h2>

      <div className="paginationControls">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when changing the number of items per page
          }}
        >
          {[10, 20, 30, 40, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentInvoices.length < perPage}
        >
          Next
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            {invoices.length > 0 &&
              Object.keys(invoices[0]).map((key) => (
                <th key={key}>Kolon {key.replace('column', '')}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice) => (
            <tr
              key={invoice.id}
              className={invoice.id % 2 === 0 ? 'even' : 'odd'}
            >
              <td>
                <input type="checkbox" />
              </td>
              {Object.entries(invoice).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
