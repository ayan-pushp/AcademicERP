import React from "react";

const Filters = ({ filters, handleFilterChange }) => (
  <div>
    <h3>Filters</h3>
    <div>
      <label>Domain:</label>
      <select
        name="domain"
        onChange={handleFilterChange}
        value={filters.domain}
      >
        <option value="">All</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="DSAI">DSAI</option>
      </select>
    </div>
    <div>
      <label>Specialisation:</label>
      <select
        name="specialisation"
        onChange={handleFilterChange}
        value={filters.specialisation}
      >
        <option value="">All</option>
        <option value="Advanced Algorithms">Advanced Algorithms</option>
        <option value="Cyber Security">Cyber Security</option>
        <option value="AI">AI</option>
        <option value="VLSI">VLSI</option>
        <option value="Signal Systems">Signal Systems</option>
      </select>
    </div>
    <div>
      <label>CGPA:</label>
      <select
        name="grade"
        onChange={handleFilterChange}
        value={filters.grade}
      >
        <option value="">All</option>
        <option value="3.0">3.0 and above</option>
        <option value="3.5">3.5 and above</option>
        <option value="4.0">4.0</option>
      </select>
    </div>
  </div>
);

export default Filters;
