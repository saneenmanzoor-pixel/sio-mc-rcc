import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      <h1>Collection Calculator</h1>
      <p>Track your unit's collection progress with ease</p>
    </header>
  );
}