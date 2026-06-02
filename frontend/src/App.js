import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function App() {
  const [count, setCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [premium, setPremium] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [segments, setSegments] = useState({});
  const [searchText, setSearchText] = useState("");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  useEffect(() => {
    loadCustomers();

    fetch("http://localhost:8080/api/analytics/customers-count")
      .then((res) => res.json())
      .then(setCount);

    fetch("http://localhost:8080/api/analytics/total-revenue")
      .then((res) => res.json())
      .then(setRevenue);

    fetch("http://localhost:8080/api/analytics/premium-customers")
      .then((res) => res.json())
      .then(setPremium);

    fetch("http://localhost:8080/api/customers")
      .then((res) => res.json())
      .then(setCustomers);

    fetch("http://localhost:8080/api/analytics/segment-counts")
      .then((res) => res.json())
      .then(setSegments);
  }, []);

  const loadCustomers = () => {
    fetch("http://localhost:8080/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  };

  const searchCustomers = () => {
    if (!searchText) return loadCustomers();

    fetch(
      `http://localhost:8080/api/customers/search?name=${searchText}`
    )
      .then((res) => res.json())
      .then(setCustomers);
  };

  const pieData = Object.keys(segments).map((key) => ({
    name: key,
    value: segments[key],
  }));

  return (
    <div style={{ padding: 30, fontFamily: "Arial", background: "#f5f7fa" }}>
      <h1>Customer 360 Dashboard</h1>

      {/* CARDS */}
      <div style={{ display: "flex", gap: 20 }}>
        <Card title="Customers" value={count} />
        <Card title="Revenue" value={`₹${revenue}`} />
        <Card title="Premium" value={premium} />
      </div>

      {/* PIE CHART */}
      <h2 style={{ marginTop: 30 }}>Customer Segments</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {pieData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* SEARCH */}
      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Search customer..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
        <button onClick={searchCustomers} style={{ marginLeft: 10 }}>
          Search
        </button>
        <button onClick={loadCustomers} style={{ marginLeft: 10 }}>
          Reset
        </button>
      </div>

      {/* TABLE */}
      <h2>Customers</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Segment</th>
            <th>Spend</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.city}</td>
              <td>{c.customerSegment}</td>
              <td>₹{c.totalSpend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        background: "white",
        borderRadius: 10,
        minWidth: 120,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default App;