# Express.js Backend Server

A production-ready Express.js backend server with MySQL and Supabase integration.

## Features

- ✓ Express.js REST API
- ✓ MySQL database connection (iHOMIS)
- ✓ Supabase integration
- ✓ CORS support
- ✓ Environment variable configuration
- ✓ Error handling
- ✓ Request logging
- ✓ Health check endpoints
- ✓ Automated testing

## Prerequisites

- Node.js (v14 or higher)
- Access to MySQL database (iHOMIS)
- Supabase account and credentials

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - The `.env` file is already configured with your credentials
   - Update `MYSQL_PASSWORD` with your actual MySQL password if needed

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Testing

To test the server endpoints:

1. Start the server in one terminal:
```bash
npm start
```

2. Run tests in another terminal:
```bash
npm test
```

## API Endpoints

### Root
- `GET /` - Server information and available endpoints

### Health Check
- `GET /api/health` - Server health status and metrics

### MySQL Endpoints
- `GET /api/mysql/test` - Test MySQL connection
- `GET /api/mysql/tables` - List all tables in the database
- `GET /api/mysql/query?sql=YOUR_QUERY` - Execute custom SQL query

### Supabase Endpoints
- `GET /api/supabase/test` - Test Supabase connection
- `GET /api/supabase/query?table=TABLE_NAME&limit=10` - Query Supabase table
- `POST /api/supabase/insert` - Insert data into Supabase table
  ```json
  {
    "table": "your_table_name",
    "data": {
      "column1": "value1",
      "column2": "value2"
    }
  }
  ```

## Example Usage

### Using curl:
```bash
# Health check
curl http://localhost:3000/api/health

# MySQL test
curl http://localhost:3000/api/mysql/test

# List tables
curl http://localhost:3000/api/mysql/tables

# Query Supabase
curl "http://localhost:3000/api/supabase/query?table=your_table&limit=5"
```

### Using JavaScript fetch:
```javascript
// Health check
fetch('http://localhost:3000/api/health')
  .then(res => res.json())
  .then(data => console.log(data));

// MySQL query
fetch('http://localhost:3000/api/mysql/tables')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Deployment

### Before Deployment:
1. Update `.env` file with production credentials
2. Change `CORS_ORIGIN=*` to specific allowed origins
3. Set `NODE_ENV=production`
4. Run tests to ensure everything works

### Deployment Options:
- **VPS/Cloud Server**: Use PM2 or systemd to keep the server running
- **Docker**: Create a Dockerfile and deploy as a container
- **PaaS**: Deploy to Heroku, Railway, Render, or similar platforms

### Example PM2 deployment:
```bash
npm install -g pm2
pm2 start server.js --name "test-server"
pm2 save
pm2 startup
```

## Project Structure

```
test_server/
├── config/
│   └── database.js        # Database configuration
├── routes/
│   ├── health.js          # Health check routes
│   ├── mysql.js           # MySQL routes
│   └── supabase.js        # Supabase routes
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
├── server.js             # Main server file
├── test.js               # Test script
└── README.md             # This file
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MYSQL_HOST` | MySQL server host | `180.232.187.222` |
| `MYSQL_PORT` | MySQL server port | `3306` |
| `MYSQL_USER` | MySQL username | `root` |
| `MYSQL_PASSWORD` | MySQL password | `your_password` |
| `MYSQL_DATABASE` | MySQL database name | `cdh_ihomis_plus` |
| `SUPABASE_URL` | Supabase project URL | `http://...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJ...` |
| `SUPABASE_ANON_KEY` | Supabase anon key | `eyJ...` |
| `SUPABASE_DB_SCHEMA` | Supabase schema | `module3` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` or `https://yoursite.com` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |

## Troubleshooting

### Server won't start:
- Check if port 3000 is already in use
- Verify all environment variables are set correctly

### MySQL connection fails:
- Verify database credentials in `.env`
- Ensure MySQL server is accessible from your network
- Check firewall settings

### Supabase connection fails:
- Verify Supabase URL and keys in `.env`
- Check if Supabase service is accessible

## Security Notes

- Never commit `.env` file to version control
- Use strong passwords for production
- Restrict CORS origins in production
- Use HTTPS in production
- Keep dependencies updated

## License

ISC
