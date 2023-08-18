import React, { useEffect, useState } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import './styles.css';
import {
  faMagnifyingGlass,
  faTablet,
  faBook,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Calculates the KDV values based on the given KDV percentages and the VHTT value.
 *
 * @param {Object} kdvPercentages - An object containing the KDV percentages and their activation status.
 * @param {number} vhtt - The VHTT value.
 * @returns {Object} - An object containing the calculated KDV values and the total KDV.
 */
function calculateKDVValues(kdvPercentages, vhtt) {
  // Initialize the total KDV and KDV values object
  let totalKDV = 0;
  let kdvValues = {};

  // Iterate over the KDV percentages
  for (let [percentage, isActive] of Object.entries(kdvPercentages)) {
    // Check if the KDV percentage is active
    if (isActive) {
      // Calculate the KDV value
      let kdvValue = (vhtt * (parseInt(percentage) / 100)).toFixed(2);
      // Store the KDV value in the kdvValues object
      kdvValues[percentage] = kdvValue;
      // Update the total KDV
      totalKDV += parseFloat(kdvValue);
    }
  }
  // Return the calculated KDV values and the total KDV
  return { kdvValues, totalKDV: totalKDV.toFixed(2) };
}

/**
 * Renders a list of invoices with pagination controls.
 * Fetches the invoices from '/invoices.json' on component mount.
 */
function InvoiceList() {
  // State variables
  const [invoices, setInvoices] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Fetch invoices on component mount
  useEffect(() => {
    fetch('/invoices.json')
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) =>
        console.error('Veri alınırken bir hata oluştu:', error)
      );
  }, []);

  // Calculate the index of the last and first invoice in the current page
  const indexOfLastInvoice = currentPage * perPage;
  const indexOfFirstInvoice = indexOfLastInvoice - perPage;
  // Get the invoices for the current page
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  return (
    <div className="invoiceListContainer">
      <h2>Fatura Listesi</h2>
      <div className="paginationControls">
        {/* Previous page button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {/* Per page dropdown */}
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 20, 30, 40, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {/* Next page button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentInvoices.length < perPage}
        >
          Next
        </button>
      </div>
      {/* Invoice table */}
      <table>
        <thead>
          <tr>
            <th>Fatura No\Ettn</th>
            <th>Oluşturma Tarihi</th>
            <th>Alıcı VKN-TCKN\Unvan</th>
            <th>Ödenecek Tutar\Vergiler Hariç Top. Tut.</th>
            <th>%1, %8, %10, %18, %20 Toplam KDV</th>
            <th>Senaryo Tipi\Fatura Tipi\Senaryo</th>
            <th>Fatura Durumu</th>
            <th>Detay Bilgi</th>
            <th>Detay Göster</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice) => {
            // Calculate VHTT value and KDV values
            const vhtt = parseFloat(
              invoice.tutar.vhtt.split(' ')[1].replace(',', '.')
            );
            // Calculate KDV values
            const { kdvValues, totalKDV } = calculateKDVValues(
              invoice.kdv.percentages,
              vhtt
            );

            return (
              <tr key={invoice.id}>
                {/* Invoice number */}
                <td className="invoiceNumber">
                  <span className="red">{invoice.faturaNo.no}</span>
                  <br />
                  <span className="green">{invoice.faturaNo.ettn}</span>
                  <br />
                  <button className="actionBtn">İptal</button>
                  <button className="actionBtn">Deneme</button>
                </td>
                <td>
                  <span className="grey">{invoice.olusturmaTarihi.tarih}</span>
                  <br />
                  <span className="grey">{invoice.olusturmaTarihi.saat}</span>
                </td>
                <td>
                  <span className="red">{invoice.alici.vknTckn}</span>
                  <br />
                  <span className="green">{invoice.alici.unvan}</span>
                </td>
                <td>
                  <span className="red">{invoice.tutar.odenecek}</span>
                  <br />
                  <span className="grey">{invoice.tutar.vhtt}</span>
                </td>
                <td className="kdv">
                  {/* Map over the KDV values and display each percentage and its value */}
                  {Object.entries(kdvValues).map(([key, value]) => (
                    <span key={key} className={`kdv-${key}`}>
                      %{key} = {value} TL{' '}
                      {/* Display the KDV percentage and its value */}
                      <br />
                    </span>
                  ))}
                  <span className="kdv-total">
                    Toplam = {totalKDV} TL{' '}
                    {/* Display the total calculated KDV */}
                  </span>
                </td>
                <td>
                  <button className="actionBtn red">
                    {invoice.senaryo.tip}
                  </button>
                  <br />
                  <button className="actionBtn green">
                    {invoice.senaryo.faturaTipi}
                  </button>
                  <br />
                  <button className="actionBtn purple">
                    {invoice.senaryo.senaryo}
                  </button>
                </td>
                <td
                  className={
                    invoice.faturaDurumu === 'e-Arşiv İptal' ? 'grey' : 'green'
                  }
                >
                  {invoice.faturaDurumu}
                </td>
                <td>
                  <button className="iconBtn blue">
                    <FontAwesomeIcon icon={faTablet} />
                  </button>
                  <button className="iconBtn orange">
                    <FontAwesomeIcon icon={faBook} />
                  </button>
                  <button className="iconBtn lila">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </button>
                </td>
                <td>
                  <button className="iconBtn yellow">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <DropdownMenu />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
