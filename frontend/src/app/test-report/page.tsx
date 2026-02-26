"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type GeoResult = {
  name: string;
  completeName: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
  timezone: string;
  country: string;
};

export default function TestReportPage() {
  const [firstName, setFirstName] = useState("Amit");
  const [lastName, setLastName] = useState("Kumar");
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("6");
  const [year, setYear] = useState("1995");
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [amPm, setAmPm] = useState("AM");
  const [birthPlace, setBirthPlace] = useState("");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    blobUrl: string | null;
    report: { duration: string; years: number[]; generatedAt: string };
    html: string;
  } | null>(null);

  // Geo autocomplete
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [showGeoDropdown, setShowGeoDropdown] = useState(false);
  const [selectedGeo, setSelectedGeo] = useState<GeoResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const geoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geoDropdownRef = useRef<HTMLDivElement>(null);

  const searchGeo = useCallback((query: string) => {
    if (geoTimerRef.current) clearTimeout(geoTimerRef.current);
    if (query.trim().length < 2) {
      setGeoResults([]);
      setShowGeoDropdown(false);
      return;
    }
    geoTimerRef.current = setTimeout(async () => {
      setGeoLoading(true);
      try {
        const res = await fetch("/api/geo-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location: query }),
        });
        const data = await res.json();
        setGeoResults(Array.isArray(data) ? data : []);
        setShowGeoDropdown(true);
      } catch {
        setGeoResults([]);
      } finally {
        setGeoLoading(false);
      }
    }, 300);
  }, []);

  const handleBirthPlaceChange = (value: string) => {
    setBirthPlace(value);
    setSelectedGeo(null);
    searchGeo(value);
  };

  const selectGeoResult = (geo: GeoResult) => {
    setBirthPlace(geo.completeName);
    setSelectedGeo(geo);
    setShowGeoDropdown(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        geoDropdownRef.current &&
        !geoDropdownRef.current.contains(e.target as Node)
      ) {
        setShowGeoDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: "test@example.com",
          dateOfBirth: { day, month, year },
          timeOfBirth: { hour, minute, amPm },
          birthPlace,
          duration,
          ...(selectedGeo && {
            latitude: selectedGeo.latitude,
            longitude: selectedGeo.longitude,
            timezoneOffset: selectedGeo.timezoneOffset,
          }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "API failed");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openInNewWindow = () => {
    if (!result?.html) return;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(result.html);
      win.document.close();
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        fontFamily: "system-ui",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        🔮 Report Engine Test
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Quick test form with geo-location autocomplete and Vercel Blob storage.
      </p>

      <div
        style={{
          background: "#f8f9fa",
          border: "1px solid #e2e2e2",
          borderRadius: 12,
          padding: 24,
        }}
      >
        {/* Name */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* DOB */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Day</label>
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Month (1-12)</label>
            <input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Year</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Time */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Hour</label>
            <input
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Minute</label>
            <input
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>AM/PM</label>
            <select
              value={amPm}
              onChange={(e) => setAmPm(e.target.value)}
              style={inputStyle}
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>

        {/* Birth Place with Autocomplete + Duration */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div ref={geoDropdownRef} style={{ position: "relative" }}>
            <label style={labelStyle}>Birth Place</label>
            <div style={{ position: "relative" }}>
              <input
                value={birthPlace}
                onChange={(e) => handleBirthPlaceChange(e.target.value)}
                onFocus={() => {
                  if (geoResults.length > 0) setShowGeoDropdown(true);
                }}
                placeholder="Type city name..."
                autoComplete="off"
                style={inputStyle}
              />
              {geoLoading && (
                <div style={{ position: "absolute", right: 12, top: 12 }}>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid #ddd",
                      borderTopColor: "#f97316",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>
            {/* Dropdown */}
            {showGeoDropdown && geoResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: 4,
                  background: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                {geoResults.map((geo, i) => (
                  <button
                    key={`${geo.completeName}-${i}`}
                    type="button"
                    onClick={() => selectGeoResult(geo)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f4f6",
                      fontSize: 14,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9fafb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <div style={{ fontWeight: 600 }}>{geo.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {geo.completeName} {geo.country && `· ${geo.country}`}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {selectedGeo && (
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                📍 {selectedGeo.latitude.toFixed(4)}°,{" "}
                {selectedGeo.longitude.toFixed(4)}° · TZ: {selectedGeo.timezone}{" "}
                (UTC{selectedGeo.timezoneOffset >= 0 ? "+" : ""}
                {selectedGeo.timezoneOffset})
              </div>
            )}
          </div>
          <div>
            <label style={labelStyle}>Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={inputStyle}
            >
              <option value={1}>1 Year</option>
              <option value={3}>3 Years</option>
              <option value={5}>5 Years</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 24px",
            fontSize: 16,
            fontWeight: 700,
            background: loading ? "#999" : "#f97316",
            color: "white",
            border: "none",
            borderRadius: 10,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "⏳ Generating Report..." : "🚀 Generate Report"}
        </button>
      </div>

      {/* Spin animation for loading indicator */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: 10,
            color: "#b91c1c",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              padding: 20,
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: 12,
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#166534",
                marginBottom: 12,
              }}
            >
              ✅ Report Generated!
            </h3>
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              <div>
                <strong>Duration:</strong> {result.report.duration}
              </div>
              <div>
                <strong>Years:</strong> {result.report.years.join(", ")}
              </div>
              <div>
                <strong>Generated At:</strong>{" "}
                {new Date(result.report.generatedAt).toLocaleString()}
              </div>
              {result.blobUrl && (
                <div>
                  <strong>Blob URL:</strong>{" "}
                  <a
                    href={result.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "underline" }}
                  >
                    {result.blobUrl}
                  </a>
                </div>
              )}
              {!result.blobUrl && (
                <div style={{ color: "#b45309", fontSize: 13 }}>
                  ⚠️ Blob upload skipped (set <code>BLOB_READ_WRITE_TOKEN</code>{" "}
                  in <code>.env.local</code> to enable)
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button onClick={openInNewWindow} style={actionBtnStyle}>
                📄 Open Report in New Window
              </button>
              {result.blobUrl && (
                <a
                  href={result.blobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...actionBtnStyle,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  🔗 Open Blob URL
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#555",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid #d1d5db",
  borderRadius: 8,
  background: "white",
  boxSizing: "border-box",
};

const actionBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  background: "#16213e",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  display: "inline-block",
};
