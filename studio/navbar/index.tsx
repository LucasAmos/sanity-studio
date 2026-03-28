import { NavbarProps } from "sanity";

import edf from "./logo.jpeg";

export function MyEnhancedNavbar(props: NavbarProps) {
  const { renderDefault } = props;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderBottomColor: "#e3e4e8",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          paddingLeft: 10,
          width: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          alt="bob"
          src={edf}
          style={{
            width: "100%",
            objectFit: "cover"
          }}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{renderDefault({ ...props })}</div>
    </div>
  );
}
