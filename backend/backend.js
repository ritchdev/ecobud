import dotenvx from "@dotenvx/dotenvx"
import { connectDB } from "./src/config/db.js";
import { app } from "./src/app.js";

dotenvx.config({ path: "./.env" })

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}`);
});
