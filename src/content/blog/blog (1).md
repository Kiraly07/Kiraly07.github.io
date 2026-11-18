---
title: "OverTheWire Natas – Step-by-Step Web Security Walkthrough (Levels 0–34)"
description: "A practical walkthrough of OverTheWire Natas, covering source inspection, file disclosure, HTTP headers, SQL injection, sessions, PHP, and advanced web security concepts."
date: 2026-11-15
tags: ["overthewire", "natas", "web-security", "ctf"]
---

# OverTheWire Natas – Complete Web Security Walkthrough

> **Source note:** This is an independently written guide based on public information about Natas, **not a verbatim compilation** of `Kiraly07/OverTheWire/Natas`, because the repository files were unavailable when the original article was written. Some advanced-level behavior may differ across lab versions; always check the source supplied by the challenge.

## Introduction

[Natas](https://overthewire.org/wargames/natas/) is a web security training series from OverTheWire. Each level uses HTTP Basic Authentication and challenges you to discover the credentials for the next level. These exercises are intended only for authorized CTF and training environments.

### Prerequisites

- A browser with Developer Tools (`F12`), cURL, and optionally Burp Suite Community Edition.
- Level `X` URL: `http://natasX.natas.labs.overthewire.org/`.
- The username is generally `natasX`; the password is obtained from the preceding level.
- Do not publish active passwords in a public blog. This guide uses the placeholder `<PASSWORD>`.

Example request using cURL:

```bash
curl -i -u 'natas0:<PASSWORD>' http://natas0.natas.labs.overthewire.org/
```

**General workflow:** inspect the page → review available HTML/PHP source → examine HTTP requests and responses → identify the trust boundary → test in the authorized lab → explain the vulnerability → propose a defense.

## Table of Contents

- [Natas 0 → 1](#natas-0--1)
- [Natas 1 → 2](#natas-1--2)
- [Natas 2 → 3](#natas-2--3)
- [Natas 3 → 4](#natas-3--4)
- [Natas 4 → 5](#natas-4--5)
- [Natas 5 → 6](#natas-5--6)
- [Natas 6 → 7](#natas-6--7)
- [Natas 7 → 8](#natas-7--8)
- [Natas 8 → 9](#natas-8--9)
- [Natas 9 → 10](#natas-9--10)
- [Natas 10 → 11](#natas-10--11)
- [Natas 11 → 12](#natas-11--12)
- [Natas 12 → 13](#natas-12--13)
- [Natas 13 → 14](#natas-13--14)
- [Natas 14 → 15](#natas-14--15)
- [Natas 15 → 16](#natas-15--16)
- [Natas 16 → 17](#natas-16--17)
- [Natas 17 → 18](#natas-17--18)
- [Natas 18 → 19](#natas-18--19)
- [Natas 19 → 20](#natas-19--20)
- [Natas 20 → 21](#natas-20--21)
- [Natas 21 → 22](#natas-21--22)
- [Natas 22 → 23](#natas-22--23)
- [Natas 23 → 24](#natas-23--24)
- [Natas 24 → 25](#natas-24--25)
- [Natas 25 → 26](#natas-25--26)
- [Natas 26 → 27](#natas-26--27)
- [Natas 27 → 28](#natas-27--28)
- [Natas 28 → 29](#natas-28--29)
- [Natas 29 → 30](#natas-29--30)
- [Natas 30 → 31](#natas-30--31)
- [Natas 31 → 32](#natas-31--32)
- [Natas 32 → 33](#natas-32--33)
- [Natas 33 → 34](#natas-33--34)

---

## Natas 0 → 1

**Topic:** Inspect HTML Source — *View Source / HTML comments*

**URL:** `http://natas0.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 1**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Open the page and inspect the HTML source

1. Visit `http://natas0.natas.labs.overthewire.org/` and sign in as `natas0` using the initial password published on the official Natas website.
2. Press `Ctrl+U` to open **View Page Source**.
3. Find an HTML comment (`<!-- ... -->`) containing the password for `natas1`.
4. Use the recovered password to sign in at `natas1.natas.labs.overthewire.org`.

### 3. Example Commands / Data

```bash
curl -s -u 'natas0:<PASSWORD>' http://natas0.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas1` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas1` before marking the level complete.

### 5. Explanation and Mitigation

HTML comments are not a safe place for secrets. Anything sent to a browser can be inspected by the user.

---

## Natas 1 → 2

**Topic:** Bypass Right-click Restriction — *Client-side restriction*

**URL:** `http://natas1.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 2**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Bypass the right-click restriction

1. Sign in to `natas1`, right-click the page, and observe the warning.
2. Instead of right-clicking, press `Ctrl+U` or `F12` and open the **Elements** tab.
3. Find the password in an HTML comment, just as in Natas 0.
4. Use that password to access Natas 2.

### 3. Example Commands / Data

```bash
curl -s -u 'natas1:<PASSWORD>' http://natas1.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas2` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas2` before marking the level complete.

### 5. Explanation and Mitigation

Never treat client-side JavaScript as a security control for protecting secrets.

---

## Natas 2 → 3

**Topic:** Discover Exposed Files — *Directory enumeration*

**URL:** `http://natas2.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 3**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Locate exposed files in the web root

1. Inspect the HTML source for an `<img>` element pointing into `/files/`.
2. Visit `/files/` to check whether directory listing is enabled.
3. Open `users.txt` in that directory.
4. Find the entry for `natas3` and use its password to sign in to the next level.

### 3. Example Commands / Data

```bash
curl -u 'natas2:<PASSWORD>' http://natas2.natas.labs.overthewire.org/files/
curl -u 'natas2:<PASSWORD>' http://natas2.natas.labs.overthewire.org/files/users.txt
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas3` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas3` before marking the level complete.

### 5. Explanation and Mitigation

Disable directory listing and never store credentials in publicly accessible directories.

---

## Natas 3 → 4

**Topic:** Inspect robots.txt — *Information disclosure*

**URL:** `http://natas3.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 4**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Follow the robots.txt hint

1. Sign in to Natas 3 and inspect the HTML source for a hint about search engine indexing.
2. Request `/robots.txt` and note the path listed under `Disallow`.
3. Visit that directory and look for `users.txt`.
4. Read the entry containing the credentials for Natas 4.

### 3. Example Commands / Data

```bash
curl -u 'natas3:<PASSWORD>' http://natas3.natas.labs.overthewire.org/robots.txt
curl -u 'natas3:<PASSWORD>' http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas4` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas4` before marking the level complete.

### 5. Explanation and Mitigation

A path hidden from search engines is not an access-controlled path.

---

## Natas 4 → 5

**Topic:** Change the Referer Header — *HTTP header trust*

**URL:** `http://natas4.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 5**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Modify the HTTP Referer header

1. Open Natas 4 and read the message stating that requests must come from `natas5.natas.labs.overthewire.org`.
2. Open Burp Suite **Proxy → Intercept**, or use cURL.
3. Send a request to Natas 4 with the `Referer` header set to the Natas 5 URL.
4. Inspect the response for the information needed to access Natas 5.

### 3. Example Commands / Data

```bash
curl -u 'natas4:<PASSWORD>' \
  -H 'Referer: http://natas5.natas.labs.overthewire.org/' \
  http://natas4.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas5` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas5` before marking the level complete.

### 5. Explanation and Mitigation

The `Referer` header is client-controlled and must not be used as proof of identity or authorization.

---

## Natas 5 → 6

**Topic:** Change a Login Cookie — *Client-controlled cookies*

**URL:** `http://natas5.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 6**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Change the login-state cookie

1. Sign in to Natas 5 and read the message saying that you are not logged in.
2. Open `F12 → Application → Cookies` and locate the `loggedin` cookie.
3. Change its value from `0` to `1`, then reload the page.
4. Read the response and record the password for Natas 6 privately.

### 3. Example Commands / Data

```bash
curl -u 'natas5:<PASSWORD>' \
  -b 'loggedin=1' \
  http://natas5.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas6` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas6` before marking the level complete.

### 5. Explanation and Mitigation

Authorization must be enforced on the server, not by trusting a client-controlled flag.

---

## Natas 6 → 7

**Topic:** Read an Exposed Include — *Source disclosure*

**URL:** `http://natas6.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 7**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect an included PHP secret

1. Sign in to Natas 6 and select **View sourcecode**.
2. Locate `include "includes/secret.inc"` and the comparison against `$_POST['secret']`.
3. Request `/includes/secret.inc` directly and inspect the result. If PHP execution hides the source, use the source-viewing mechanism provided by the lab.
4. Enter the recovered secret into the form and click **Submit** to obtain the Natas 7 password.

### 3. Example Commands / Data

```bash
curl -u 'natas6:<PASSWORD>' http://natas6.natas.labs.overthewire.org/includes/secret.inc
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas7` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas7` before marking the level complete.

### 5. Explanation and Mitigation

Keep configuration files and secrets outside publicly accessible web directories.

---

## Natas 7 → 8

**Topic:** Path Traversal Through a Page Parameter — *Local File Inclusion*

**URL:** `http://natas7.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 8**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect the page parameter for local file inclusion

1. Open Natas 7 and observe how the `Home` and `About` links modify the `page` parameter.
2. Read the HTML comment hinting at the password file's location.
3. Use the `page` parameter to request the file path mentioned in the hint.
4. Read the response and use the result to access Natas 8.

### 3. Example Commands / Data

```bash
curl -G -u 'natas7:<PASSWORD>' \
  --data-urlencode 'page=/etc/natas_webpass/natas8' \
  http://natas7.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas8` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas8` before marking the level complete.

### 5. Explanation and Mitigation

Use an allowlist of page identifiers; canonicalize paths and verify that resolved files remain in an approved directory.

---

## Natas 8 → 9

**Topic:** Reverse an Encoding Chain — *Encoding is not encryption*

**URL:** `http://natas8.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 9**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Reverse the encoding sequence

1. Open Natas 8 and select **View sourcecode**.
2. Inspect `encodeSecret()`, which applies `base64_encode`, `strrev`, and `bin2hex` in sequence.
3. Copy `$encodedSecret` and reverse the steps: `hex2bin` → reverse the string → `base64_decode`.
4. Submit the decoded secret in the form to obtain the Natas 9 password.

### 3. Example Commands / Data

```php
<?php
$encoded = '<ENCODED_SECRET_FROM_SOURCE>';
$secret = base64_decode(strrev(hex2bin($encoded)));
echo $secret, PHP_EOL;
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas9` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas9` before marking the level complete.

### 5. Explanation and Mitigation

Encoding is not encryption and must never be relied upon to protect secrets.

---

## Natas 9 → 10

**Topic:** Understand Shell Command Injection — *OS command injection*

**URL:** `http://natas9.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 10**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Understand shell command injection

1. Select **View sourcecode** and find the PHP `passthru()` call built using the `needle` parameter.
2. Write down the resulting `grep` command for an ordinary search term.
3. Inside the Natas lab, examine how shell command separators can change the interpretation of `needle` from search text into shell syntax.
4. Compare the response with the source to explain why sensitive information can be exposed.

### 3. Example Commands / Data

```bash
# Start with a harmless, ordinary search term
curl -G -u 'natas9:<PASSWORD>' \
  --data-urlencode 'needle=test' \
  http://natas9.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas10` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas10` before marking the level complete.

### 5. Explanation and Mitigation

Avoid invoking a shell when possible; otherwise use APIs that pass user input as separate, safely handled arguments.

---

## Natas 10 → 11

**Topic:** Inspect a Character Filter — *Incomplete shell filtering*

**URL:** `http://natas10.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 11**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Examine the character blacklist

1. Inspect the Natas 10 source and identify the blacklist checking characters such as `;`, `|`, and `&`.
2. Review how input is incorporated into the `grep` command, including how file names and arguments are separated.
3. Compare a normal request with a request containing a rejected character to understand the filter.
4. Explain why character blacklists cannot replace safe argument handling.

### 3. Example Commands / Data

```bash
curl -G -u 'natas10:<PASSWORD>' \
  --data-urlencode 'needle=test' \
  http://natas10.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas11` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas11` before marking the level complete.

### 5. Explanation and Mitigation

Use an API without shell interpretation; do not depend on blacklisted characters for security.

---

## Natas 11 → 12

**Topic:** Analyze an XOR Cookie — *Predictable encryption*

**URL:** `http://natas11.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 12**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Analyze the XOR-protected cookie

1. Read the Natas 11 PHP source and identify the default JSON object and XOR operation applied before Base64 encoding.
2. Inspect the browser's `data` cookie and Base64-decode it to examine the raw ciphertext.
3. Compare it with the known default JSON plaintext to investigate the repeating XOR key.
4. Follow the decode/encode flow and explain how reusing a predictable key can let an attacker modify data accepted by the server.

### 3. Example Commands / Data

```python
import base64
# Replace with the lab data cookie; do not use real credentials here
cookie = '<COOKIE_DATA>'
raw = base64.b64decode(cookie)
print(raw.hex())
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas12` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas12` before marking the level complete.

### 5. Explanation and Mitigation

Use server-side authorization and authenticated, integrity-protected session data rather than reversible obfuscation alone.

---

## Natas 12 → 13

**Topic:** Investigate an Upload Filename — *File upload validation*

**URL:** `http://natas12.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 13**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Investigate uploaded file names

1. Inspect the Natas 12 source for file naming and extension-handling logic.
2. Upload a harmless text file and record the returned file name and upload directory.
3. Using DevTools or Burp, compare the form's hidden input with the file path generated by the backend.
4. Explain why a client-supplied hidden input must not determine file type or storage location.

### 3. Example Commands / Data

```text
Form → multipart/form-data → filename/hidden input
     → backend renames file → upload directory → response
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas13` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas13` before marking the level complete.

### 5. Explanation and Mitigation

Generate file names on the server, validate uploads, and store them in a non-executable location.

---

## Natas 13 → 14

**Topic:** Check File Content Validation — *Magic-byte checks*

**URL:** `http://natas13.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 14**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Examine content-based upload checks

1. Read the Natas 13 source and locate the call to `exif_imagetype()`.
2. Upload a valid sample image and note the response and resulting URL.
3. Explain why checking magic bytes alone cannot establish that all remaining content is safe.
4. Document safer handling: decode and re-encode images, reject unexpected formats, and prevent execution in the upload directory.

### 3. Example Commands / Data

```bash
file sample.png
# Use only a sample image created for the lab
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas14` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas14` before marking the level complete.

### 5. Explanation and Mitigation

Process images with safe libraries and never execute uploaded files.

---

## Natas 14 → 15

**Topic:** Study Login SQL Injection — *SQL injection*

**URL:** `http://natas14.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 15**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Study the SQL query used by the login form

1. Inspect the Natas 14 source to find where PHP concatenates `username` and `password` into SQL.
2. Reconstruct the query using ordinary sample values to understand its `WHERE` clause.
3. Compare string concatenation with an equivalent prepared statement.
4. Explain how treating untrusted input as SQL syntax can change the meaning of authentication conditions.

### 3. Example Commands / Data

```sql
-- Vulnerable query structure from the lab source
SELECT * FROM users
WHERE username = '<USER_INPUT>' AND password = '<PASSWORD_INPUT>';

-- Safer alternative: prepared statement có tham số riêng
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas15` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas15` before marking the level complete.

### 5. Explanation and Mitigation

Use prepared statements and least-privilege database credentials.

---

## Natas 15 → 16

**Topic:** Infer Data Through a Boolean Response — *Blind SQL injection*

**URL:** `http://natas15.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 16**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Recognize the boolean response oracle

1. Notice that the Natas 15 form only reports whether a username exists.
2. Inspect the source to locate the point where `username` enters the SQL query.
3. Send one known existing username and one clearly nonexistent username; save both response patterns.
4. Explain how a true/false response can disclose information even without displaying database values.

### 3. Example Commands / Data

```bash
curl -G -u 'natas15:<PASSWORD>' \
  --data-urlencode 'username=natas16' \
  http://natas15.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas16` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas16` before marking the level complete.

### 5. Explanation and Mitigation

Parameterize queries and minimize unintended information revealed by application responses.

---

## Natas 16 → 17

**Topic:** Recognize Blind Command Injection — *Command substitution*

**URL:** `http://natas16.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 17**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Recognize blind shell command injection

1. Read the Natas 16 source and note the expanded character filter compared with Natas 10.
2. Observe how PHP embeds the `needle` input into a `grep` command.
3. Distinguish blocked command separators from other shell expansion mechanisms.
4. Try harmless inputs within the lab, observe response differences, and document the path from user input to shell execution.

### 3. Example Commands / Data

```text
GET needle → PHP blacklist → shell command → stdout → HTML
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas17` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas17` before marking the level complete.

### 5. Explanation and Mitigation

Remove shell dependencies wherever possible and run any necessary helper with minimal privileges.

---

## Natas 17 → 18

**Topic:** Understand Time-Based SQL Injection — *Timing side channel*

**URL:** `http://natas17.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 18**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Understand a timing side channel

1. Compare the Natas 17 interface/source with Natas 15.
2. Send multiple ordinary requests and measure their response times to establish a baseline.
3. Notice that the application lacks a clear true/false message, making response time a potential signal.
4. Explain why repeated measurements are needed to distinguish meaningful timing differences from network jitter.

### 3. Example Commands / Data

```bash
curl -o /dev/null -s -w 'time=%{time_total}s\n' \
  -G -u 'natas17:<PASSWORD>' --data-urlencode 'username=test' \
  http://natas17.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas18` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas18` before marking the level complete.

### 5. Explanation and Mitigation

Use prepared statements, resource limits, query timeouts, and anomaly monitoring.

---

## Natas 18 → 19

**Topic:** Review Predictable Session Identifiers — *Session management*

**URL:** `http://natas18.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 19**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect predictable session IDs

1. Open Natas 18 and try the example login while observing `Set-Cookie`.
2. Use Developer Tools to watch `PHPSESSID` across requests.
3. Inspect the source to see whether session IDs come from a small or predictable range.
4. Explain how easily guessed identifiers can compromise access control.

### 3. Example Commands / Data

```bash
curl -i -u 'natas18:<PASSWORD>' http://natas18.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas19` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas19` before marking the level complete.

### 5. Explanation and Mitigation

Generate high-entropy, unpredictable session IDs and rotate them after authentication.

---

## Natas 19 → 20

**Topic:** Review Encoded Session Identifiers — *Encoding vs randomness*

**URL:** `http://natas19.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 20**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Decode the session identifier format

1. Log in to Natas 19 as an unprivileged user.
2. Copy the session cookie and check whether the value is hexadecimal.
3. Convert the hex string to bytes and inspect whether it has a structure such as `<ID>-<USERNAME>`.
4. Describe why structured, predictable session identifiers are insecure.

### 3. Example Commands / Data

```python
sid = '<HEX_SESSION_ID>'
print(bytes.fromhex(sid))
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas20` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas20` before marking the level complete.

### 5. Explanation and Mitigation

Use unpredictable session tokens and enforce authorization server-side.

---

## Natas 20 → 21

**Topic:** Investigate Session File Parsing — *Session data injection*

**URL:** `http://natas20.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 21**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Investigate session file serialization

1. Read the Natas 20 source, focusing on its custom session read/write callbacks.
2. Observe that each key/value pair is stored as a separate line of text.
3. Check whether user-supplied data is validated for newline characters.
4. Trace write and read operations to explain how improper delimiting could change the interpreted session structure.

### 3. Example Commands / Data

```text
request → session write handler → key/value text file
next request → session read handler → parse the lines
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas21` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas21` before marking the level complete.

### 5. Explanation and Mitigation

Prefer standard session libraries and validated serialization formats.

---

## Natas 21 → 22

**Topic:** Review Shared Session State — *Cross-application session trust*

**URL:** `http://natas21.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 22**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect shared session state

1. Read the Natas 21 instructions and note the main application and its linked experimental application.
2. Visit both sites in the same browser and compare their cookies and session behavior.
3. Inspect which state fields can be modified by the user in the experimental application.
4. Return to the main application and explain why trusting shared state across different applications creates an authorization risk.

### 3. Example Commands / Data

```text
Application A ↔ shared session store ↔ Application B
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas22` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas22` before marking the level complete.

### 5. Explanation and Mitigation

Separate session namespaces and independently enforce authorization in each application.

---

## Natas 22 → 23

**Topic:** Analyze Redirect Handling — *HTTP redirect behavior*

**URL:** `http://natas22.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 23**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect redirects without following them

1. Use `curl -i` to inspect Natas 22 and look for the `Location` header.
2. Compare responses with and without the `revelio` parameter indicated by the source.
3. Avoid `-L` at first so you can inspect the body of the original HTTP 302 response.
4. Describe the logic flaw when a redirect is sent but the server continues to generate sensitive output.

### 3. Example Commands / Data

```bash
curl -i -u 'natas22:<PASSWORD>' \
  'http://natas22.natas.labs.overthewire.org/?revelio=1'
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas23` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas23` before marking the level complete.

### 5. Explanation and Mitigation

Terminate sensitive processing after redirects and enforce access checks before returning data.

---

## Natas 23 → 24

**Topic:** Understand Weak PHP Comparisons — *Loose comparison*

**URL:** `http://natas23.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 24**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Study PHP loose comparisons

1. Inspect the Natas 23 source and locate its `strstr` check and comparison operators.
2. Identify the simultaneous substring and numeric constraints applied to the same input.
3. Use a local PHP example to compare the behavior of `==` and `===`.
4. Compare those results with the application's conditions and explain the impact of type juggling.

### 3. Example Commands / Data

```php
<?php
var_dump('10' == 10);
var_dump('10' === 10);
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas24` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas24` before marking the level complete.

### 5. Explanation and Mitigation

Use strict comparison and validate input types before performing checks.

---

## Natas 24 → 25

**Topic:** Inspect String Comparison Edge Cases — *Input type validation*

**URL:** `http://natas24.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 25**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Inspect string comparison edge cases

1. Read the Natas 24 source and inspect its use of `strcmp()`.
2. Observe that `passwd=x` is interpreted as a string while `passwd[]=x` may be parsed as an array.
3. Check the PHP version of the lab, because the behavior and error handling of `strcmp()` have changed across PHP versions.
4. Explain why type validation must occur before comparing a supplied value with a secret.

### 3. Example Commands / Data

```bash
# Compare ordinary and array-style POST parameters within the lab
curl -u 'natas24:<PASSWORD>' -d 'passwd=test' http://natas24.natas.labs.overthewire.org/
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas25` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas25` before marking the level complete.

### 5. Explanation and Mitigation

Require a valid scalar input type before performing any secret comparison.

---

## Natas 25 → 26

**Topic:** Review Logs and File Paths — *Path traversal and log handling*

**URL:** `http://natas25.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 26**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Trace file paths and logging

1. Read the Natas 25 source and locate the `lang` parameter and logging logic.
2. Trace the file path flow: parameter → `../` filter → path construction → inclusion or read.
3. Determine which HTTP headers are written to the logs and whether log contents are treated as text or executable code.
4. Explain why filtering `../` strings alone is not enough to secure file access.

### 3. Example Commands / Data

```text
lang → filter → build path → read file
User-Agent → log writer → log file
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas26` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas26` before marking the level complete.

### 5. Explanation and Mitigation

Canonicalize paths, restrict file locations, encode logged data, and never execute log contents.

---

## Natas 26 → 27

**Topic:** Inspect Serialized PHP Objects — *Unsafe deserialization*

**URL:** `http://natas26.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 27**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Review PHP object deserialization

1. Inspect the Natas 26 source and identify classes with magic methods such as `__destruct`.
2. Locate where objects are serialized into cookies and later unserialized.
3. List methods with side effects, such as writing a file or generating an image, during object destruction or reconstruction.
4. Analyze the trust-boundary failure when client-controlled cookies are used to recreate arbitrary PHP objects.

### 3. Example Commands / Data

```php
<?php
// Safe example showing the serialized data format
print_r(serialize(['theme' => 'dark']));
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas27` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas27` before marking the level complete.

### 5. Explanation and Mitigation

Do not call `unserialize` on untrusted input; prefer JSON with strict schema validation.

---

## Natas 27 → 28

**Topic:** Investigate Database Account Collisions — *Database consistency*

**URL:** `http://natas27.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 28**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Investigate database username collisions

1. Read the Natas 27 source and record the username-existence check, registration, and login logic.
2. Examine database column length limits and how MySQL handles trailing spaces.
3. Compare PHP-side username normalization with SQL storage and comparison behavior.
4. Summarize how two different input usernames may become equivalent at the database layer.

### 3. Example Commands / Data

```text
User input → PHP validation → DB storage length/collation → identity check
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas28` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas28` before marking the level complete.

### 5. Explanation and Mitigation

Use canonical identities consistently and enforce uniqueness constraints in the database.

---

## Natas 28 → 29

**Topic:** Examine Encrypted Query Construction — *SQL query structure*

**URL:** `http://natas28.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 29**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Examine encrypted query construction

1. Submit short search terms of increasing lengths and inspect the tokens returned by the application.
2. Use visible source or responses to infer whether the data is padded and encrypted in blocks.
3. Trace the input before and after encryption, decryption, and final SQL execution.
4. Explain why encrypting an input does not replace prepared statements at the database boundary.

### 3. Example Commands / Data

```text
Search input → encode/encrypt → request token → decode/decrypt → SQL
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas29` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas29` before marking the level complete.

### 5. Explanation and Mitigation

Parameterize queries where SQL is executed, regardless of earlier encoding or encryption.

---

## Natas 29 → 30

**Topic:** Study a Perl File-Handling Boundary — *Perl open semantics*

**URL:** `http://natas29.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 30**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Understand Perl file-open semantics

1. Read the Perl script shown by the Natas 29 lab and locate the `open()` call that receives a filename from an HTTP parameter.
2. Compare how `open(FILE, $name)` and `open(FILE, '<', $name)` interpret modes.
3. Inspect the input filter and how the filename reaches the file-open operation.
4. Explain why a user-controlled filename should never be interpreted as a command or opening mode.

### 3. Example Commands / Data

```perl
# Safer three-argument form when opening files for reading
open(my $fh, '<', $filename) or die 'Cannot open file';
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas30` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas30` before marking the level complete.

### 5. Explanation and Mitigation

Use three-argument Perl `open`, validate resolved paths, and restrict filesystem permissions.

---

## Natas 30 → 31

**Topic:** Inspect Perl Input Parsing — *Parameter parsing differences*

**URL:** `http://natas30.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 31**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Examine Perl parameter parsing

1. Inspect the Natas 30 form and see how the application accesses HTTP parameters.
2. Read the Perl source for cases in which values differ in scalar and list contexts.
3. Compare a request containing one parameter with one containing duplicate parameter names in Burp.
4. Explain the flaw when validation uses one representation but later processing uses another.

### 3. Example Commands / Data

```text
POST username=alice&username=bob
→ parser → scalar/list context → validation/query
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas31` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas31` before marking the level complete.

### 5. Explanation and Mitigation

Require exactly one value for single-valued fields and validate after parsing.

---

## Natas 31 → 32

**Topic:** Review File Upload and Argument Handling — *Untrusted file metadata*

**URL:** `http://natas31.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 32**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Trace uploaded files and arguments

1. Examine the Natas 31 upload form and save a request in Burp Repeater.
2. Record multipart field names, content types, and filename metadata.
3. Read the backend code and identify the order in which uploaded content and additional parameters are processed.
4. Explain the risk when untrusted metadata is passed into file-handling libraries or system operations unchecked.

### 3. Example Commands / Data

```text
Content-Type: multipart/form-data; boundary=...
Content-Disposition: form-data; name="file"; filename="sample.csv"
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas32` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas32` before marking the level complete.

### 5. Explanation and Mitigation

Generate upload names server-side, use safe libraries, and isolate file processing.

---

## Natas 32 → 33

**Topic:** Investigate Privileged Helper Programs — *Privilege boundaries*

**URL:** `http://natas32.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 33**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Examine privileged helper programs

1. Read the Natas 32 source and hints about interaction with a helper program.
2. Determine whether data is passed through command-line arguments, standard input, or files, and note the relevant permissions.
3. Distinguish the web server's privileges from those of the helper process.
4. Explain why privileged operations require strict input allowlists even when the interface looks simple.

### 3. Example Commands / Data

```text
HTTP request → web process → helper program → resource
                low privilege      separate privilege
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas33` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas33` before marking the level complete.

### 5. Explanation and Mitigation

Apply least privilege, input allowlists, and separation of privileged tasks.

---

## Natas 33 → 34

**Topic:** Study Integrity Checks on Uploaded Code — *Code signing and verification*

**URL:** `http://natas33.natas.labs.overthewire.org/`

### 1. Objective

Find the credentials required to access **Natas 34**, and understand the security concept demonstrated by this level.

### 2. Step-by-Step Walkthrough – Audit integrity verification for uploaded code

1. Read the Natas 33 source and identify where the application accepts a file, signature, or hash.
2. List the data actually verified and the data later used by the application.
3. Determine where the public key comes from and whether an uploaded path or file can influence verification.
4. Summarize the requirements: trusted verification keys, verification of the exact object used, and no execution of uploads.

### 3. Example Commands / Data

```text
Uploaded content → integrity check → accepted file → processing
Trusted verification key ────────────┘
```

### 4. Expected Results

- Record the relevant source code, HTTP response, or application message that demonstrates the level's behavior.
- Keep the password for `natas34` in private notes; **do not publish it**.
- Confirm that you can sign in to `natas34` before marking the level complete.

### 5. Explanation and Mitigation

Verify signatures against trusted keys and never execute untrusted uploaded content.

---

## Key Takeaways

| Vulnerability Category | Representative Levels | Key Defensive Practices |
|---|---|---|
| Information disclosure | 0–3, 6 | Keep secrets outside the web root; verify server configuration |
| Client trust / HTTP | 4–5, 11 | Enforce server-side authorization; protect sensitive client-side state |
| Path / file handling | 7, 12–13, 25, 29–31 | Allowlists, canonicalized paths, sandboxing, non-executable upload storage |
| Command injection | 9–10, 16 | Avoid shell execution; separate command arguments |
| SQL injection | 14–15, 17, 27–28 | Prepared statements and least privilege |
| Session management | 18–21 | High-entropy session IDs; isolated session state and server-side access checks |
| PHP / data types | 23–24, 26 | Strict comparisons, schema validation, no unsafe deserialization |
| Privilege / integrity | 32–33 | Least privilege and trustworthy integrity verification |

## References

- [OverTheWire – Natas (official website)](https://overthewire.org/wargames/natas/)
- [Author's target repository](https://github.com/Kiraly07/OverTheWire/tree/main/Natas) — **original files were not accessed** and were not used as direct source material.
- [OverTheWire Natas walkthrough index](https://github.com/EkRafz/OverTheWire---Walkthroughs/blob/main/Natas/README.md) — background reference for the advanced levels; no content reproduced.

> **Editorial note:** Early levels provide concrete actions. Advanced levels focus more on source inspection and validating behavior inside the lab. This article does not claim that every level was successfully completed against the live challenge instance.
