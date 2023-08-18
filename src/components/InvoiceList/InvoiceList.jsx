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
          {currentInvoices.map((invoice) => (
            <tr key={invoice.id}>
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
                {Object.entries(invoice.kdv.percentages).map(
                  ([key, value]) =>
                    value && (
                      <span key={key} className={`kdv-${key}`}>
                        %{key} = {value}
                        <br />
                      </span>
                    )
                )}
                <span className="kdv-total">Toplam = {invoice.kdv.toplam}</span>
              </td>
              <td>
                <button className="actionBtn red">{invoice.senaryo.tip}</button>
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
                <button className="iconBtn red"></button>
                <button className="iconBtn orange"></button>
                <button className="iconBtn lila"></button>
              </td>
              <td>
                <button className="iconBtn orange"></button>
                <button className="iconBtn yellow"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
