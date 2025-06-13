import {
  Card,
  Elevation,
  Button,
  Intent,
  H1,
  H3,
  Text,
  Classes,
} from "@blueprintjs/core";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
      }}
    >
      <Card
        elevation={Elevation.FOUR}
        style={{
          maxWidth: "600px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <img 
            src="./BlocNiti-LogoNB_1749709973044.png" 
            alt="BlocNiti AI Logo" 
            style={{ 
              width: "240px", 
              height: "auto", 
              marginBottom: "20px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }} 
            onError={(e) => {
              console.error('Logo failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
          <H1 style={{ color: "#215db0", marginBottom: "20px" }}>
            Welcome to BlocNiti AI
          </H1>
        </div>

        <H3 style={{ marginBottom: "30px", color: "#2c3e50" }}>
          Political Bloc for Ethical Housing
        </H3>

        <Text
          className={Classes.TEXT_LARGE}
          style={{
            marginBottom: "30px",
            lineHeight: "1.6",
            color: "#495057",
          }}
        >
          BlocNiti is dedicated to ensuring proper ethics and moral principles
          in housing. Our platform provides tools for documentation, reporting,
          and accountability to create transparent and fair housing communities.
        </Text>

        <div style={{ marginBottom: "30px" }}>
          <Text style={{ color: "#6c757d" }}>
            • Document repair issues with photo evidence
            <br />
            • Voice recording for testimonies
            <br />
            • Legal compliance tracking
            <br />
            • Community member registration
            <br />• Harassment reporting system
          </Text>
        </div>

        <Button
          intent={Intent.PRIMARY}
          large
          text="Sign In with Replit"
          onClick={handleLogin}
          style={{ fontSize: "16px", padding: "12px 24px" }}
        />

        <div style={{ marginTop: "20px" }}>
          <Text className={Classes.TEXT_SMALL} style={{ color: "#6c757d" }}>
            Building ethical communities through transparency and accountability
          </Text>
        </div>
      </Card>
    </div>
  );
}
