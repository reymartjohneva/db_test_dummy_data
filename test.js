const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('🧪 Starting API Tests...\n');
  
  const tests = [
    {
      name: 'Root Endpoint',
      path: '/',
      expectedStatus: 200
    },
    {
      name: 'Health Check',
      path: '/api/health',
      expectedStatus: 200
    },
    {
      name: 'MySQL Connection Test',
      path: '/api/mysql/test',
      expectedStatus: 200
    },
    {
      name: 'MySQL Tables List',
      path: '/api/mysql/tables',
      expectedStatus: 200
    },
    {
      name: '404 Not Found Test',
      path: '/api/nonexistent',
      expectedStatus: 404
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const response = await makeRequest(test.path);
      
      if (response.status === test.expectedStatus) {
        console.log(`✓ ${test.name}`);
        console.log(`  Status: ${response.status}`);
        console.log(`  Response:`, JSON.stringify(response.data, null, 2).split('\n').slice(0, 5).join('\n'));
        console.log('');
        passed++;
      } else {
        console.log(`✗ ${test.name}`);
        console.log(`  Expected: ${test.expectedStatus}, Got: ${response.status}`);
        console.log(`  Response:`, response.data);
        console.log('');
        failed++;
      }
    } catch (error) {
      console.log(`✗ ${test.name}`);
      console.log(`  Error: ${error.message}`);
      console.log('');
      failed++;
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════\n');

  if (failed > 0) {
    console.log('⚠️  Some tests failed. Make sure:');
    console.log('   1. The server is running (npm start)');
    console.log('   2. MySQL database is accessible');
    console.log('   3. MySQL password is correct in .env');
  } else {
    console.log('✓ All tests passed! Server is ready for deployment.');
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
console.log('Waiting 2 seconds for server to be ready...\n');
setTimeout(runTests, 2000);
