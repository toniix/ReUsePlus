const Filters = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <button onClick={() => onFilterChange("ropa")}>Ropa</button>
      <button onClick={() => onFilterChange("muebles")}>Muebles</button>
      <button onClick={() => onFilterChange("electrodomesticos")}>
        Electrodomésticos
      </button>
    </div>
  );
};

export default Filters;
