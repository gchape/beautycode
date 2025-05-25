import { Spinner } from "react-bootstrap";

export default function FallbackSpinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#fff0f4",
      }}
    >
      <Spinner
        animation="grow"
        style={{
          width: "4rem",
          height: "4rem",
          backgroundColor: "#f3b6cd",
        }}
      />
      <p
        style={{
          marginTop: "1rem",
          fontSize: "1.3rem",
          fontWeight: "500",
        }}
      >
        გთხოვთ დაელოდოთ... ⏳
      </p>
    </div>
  );
}
