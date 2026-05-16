# Security Policy

## Reporting Vulnerabilities

Report security vulnerabilities to: i.atadjanov@centralasian.uz

## Security Practices

- API keys stored in .env (never committed)
- npm audit runs on every CI pipeline
- Dependencies regularly updated
- Input validation on all endpoints

## Known Limitations

- No JWT authentication (planned)
- All endpoints currently public
