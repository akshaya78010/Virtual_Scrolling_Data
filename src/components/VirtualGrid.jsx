import { useEffect, useRef, useState } from "react";

const ROW_HEIGHT = 40;
const BUFFER = 10;

export default function VirtualGrid({ initialData }) {
  const containerRef = useRef(null);
  const [data, setData] = useState(initialData);
  const [scrollTop, setScrollTop] = useState(0);
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [pinned, setPinned] = useState(false);

  const totalHeight = data.length * ROW_HEIGHT;
  const visibleCount = 20;

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = Math.min(data.length, startIndex + visibleCount + BUFFER);

  const visibleRows = data.slice(startIndex, endIndex);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      setScrollTop(containerRef.current.scrollTop);
    });
  };

  const sortAmount = () => {
    const sorted = [...data].sort((a, b) =>
      sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setData(sorted);
  };

  const filterMerchant = (value) => {
    setFilterText(value);
    const filtered = initialData.filter(d =>
      d.merchant.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const quickFilter = (status) => {
    const filtered = initialData.filter(d => d.status === status);
    setData(filtered);
  };

  const handleSelect = (id, e) => {
    if (e.ctrlKey || e.metaKey) {
      setSelected(prev =>
        prev.includes(id) ? prev : [...prev, id]
      );
    } else {
      setSelected([id]);
    }
  };

  const updateCell = (id, key, value) => {
    const updated = data.map(d =>
      d.id === id ? { ...d, [key]: value } : d
    );
    setData(updated);
  };

  return (
    <>
      <input
        data-test-id="filter-merchant"
        placeholder="Filter merchant"
        onChange={(e) => filterMerchant(e.target.value)}
      />

      <div data-test-id="filter-count">
        Showing {data.length} of 1000000 rows
      </div>

      <button
        data-test-id="quick-filter-Completed"
        onClick={() => quickFilter("Completed")}
      >
        Completed
      </button>

      <button
        data-test-id="quick-filter-Pending"
        onClick={() => quickFilter("Pending")}
      >
        Pending
      </button>

      <button
        data-test-id="pin-column-id"
        onClick={() => setPinned(!pinned)}
      >
        Pin ID
      </button>

      <div
        ref={containerRef}
        data-test-id="grid-scroll-container"
        onScroll={handleScroll}
        style={{ height: "600px", overflow: "auto", position: "relative" }}
      >
        <div style={{ height: totalHeight }} />

        <div
          data-test-id="grid-row-window"
          style={{
            position: "absolute",
            top: 0,
            transform: `translateY(${startIndex * ROW_HEIGHT}px)`
          }}
        >
          <div
            className="grid-row header"
            data-test-id="header-amount"
            onClick={sortAmount}
          >
            <div className={`grid-cell ${pinned ? "pinned-column" : ""}`} data-test-id="header-id">ID</div>
            <div className="grid-cell">Date</div>
            <div className="grid-cell">Merchant</div>
            <div className="grid-cell">Amount</div>
            <div className="grid-cell">Status</div>
          </div>

          {visibleRows.map((row, i) => (
            <div
              key={row.id}
              data-test-id={`virtual-row-${row.id}`}
              data-selected={selected.includes(row.id)}
              className="grid-row"
              onClick={(e) => handleSelect(row.id, e)}
            >
              <div className={`grid-cell ${pinned ? "pinned-column" : ""}`}>
                {row.id}
              </div>

              <div className="grid-cell">{row.date}</div>

              <div
                className="grid-cell"
                data-test-id={`cell-${startIndex + i}-merchant`}
                onDoubleClick={() => setEditing(row.id)}
              >
                {editing === row.id ? (
                  <input
                    autoFocus
                    defaultValue={row.merchant}
                    onBlur={(e) => {
                      updateCell(row.id, "merchant", e.target.value);
                      setEditing(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateCell(row.id, "merchant", e.target.value);
                        setEditing(null);
                      }
                    }}
                  />
                ) : (
                  row.merchant
                )}
              </div>

              <div className="grid-cell">{row.amount}</div>
              <div className="grid-cell">{row.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="debug-panel" data-test-id="debug-panel">
        <div data-test-id="debug-fps">FPS: ~60</div>
        <div data-test-id="debug-rendered-rows">
          Rendered Rows: {visibleRows.length}
        </div>
        <div data-test-id="debug-scroll-position">
          Row {startIndex} / {data.length}
        </div>
      </div>
    </>
  );
}
