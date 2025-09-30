// src/server.ts
import app from "./app";           
import { ENV } from "./config/env";

const PORT: number = parseInt(ENV.PORT.toString(), 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
