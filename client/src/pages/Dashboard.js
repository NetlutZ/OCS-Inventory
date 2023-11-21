import React from 'react';
import "./Dashboard.css"
import styled from '@emotion/styled';
function Dashboard() {

  const inventoryData = [
    { id: 1, name: 'Product A', quantity: 10, price: 20.99 },
    { id: 2, name: 'Product B', quantity: 15, price: 15.49 },
    { id: 3, name: 'Product C', quantity: 20, price: 25.99 },
    // Add more inventory items as needed
  ];
  const limitText = (text, limit) => {
    if (text.length > limit) {
      const chunks = [];
      while (text.length > 0) {
        chunks.push(text.slice(0, limit));
        text = text.slice(limit);
      }
      return chunks.join('\n'); // Force text onto a new line after each chunk
    }
    return text;
  };

  return (
    <div id='container'>
      <div className='status-sum'>
        <div className='status-sum-item' id='inStorage'>
          <div className='status-sum-text'>In Storage</div>
          <div className='status-sum-number'>4</div>
        </div>
        <div className='status-sum-item' id='borrowed'>
          <div className='status-sum-text'>Borrowed</div>
          <div className='status-sum-number'>8</div>
        </div>
        <div className='status-sum-item' id='loss'>
          <div className='status-sum-text'>Loss</div>
          <div className='status-sum-number'>12</div>
        </div>
      </div>

      <table style={{ width: '100%' }}>
        <thead className='dashboard-table-header'>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id} className='dashboard-row'>
              <td style={{ width: '10%' }}>{item.id}</td>
              <td className='table-cell-wrap'>{limitText(item.name, 20)}</td>
              <td style={{ width: '40%' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusInStorage'>In Storage</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusBorrowed'>Borrowed</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                  <div className="status-data">
                    <div className="right-line">
                      <div className="status-text" id='statusLoss'>Loss</div>
                      <div className="count-status-text">22</div>
                    </div>
                  </div>

                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>





    </div>
  );
}

export default Dashboard;
