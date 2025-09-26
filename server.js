const cors = require('cors');

app.use(cors({ origin: ["http://localhost:3000", "https://your-frontend-url.com"], credentials: true }));