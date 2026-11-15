---
title: "OverTheWire: Bandit Wargame — Complete Walkthrough (Level 0 – 33)"
description: "A comprehensive, step-by-step guide covering all levels of the OverTheWire Bandit wargame, focusing on Linux command-line fundamentals, networking, privilege escalation, and Git."
date: 2026-11-15
tags: ["overthewire", "bandit", "linux", "ctf"]
---

# OverTheWire: Bandit Wargame — Complete Walkthrough (Level 0 – 33)

**Bandit** is a beginner-friendly wargame hosted on **OverTheWire**, specifically designed to teach the fundamentals of the Linux operating system, command-line navigation, file permissions, basic networking, and Git version control.

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`

---

## Level 0 → Level 1

**Objective:** Log into the server via SSH and retrieve the password stored inside the `readme` file located in the home directory.

### Walkthrough

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
# Password: bandit0

ls -la
cat readme
```

---

## Level 1 → Level 2

**Objective:** Read the file named `-` (a single dash) located in the home directory.

### Explanation & Walkthrough

In Linux, a standalone `-` character is commonly interpreted by commands as standard input (`STDIN`) or standard output (`STDOUT`). To read a file literally named `-`, specify its relative path `./-` or use input redirection `<`.

```bash
cat ./-
# Alternatively:
cat < -
```

---

## Level 2 → Level 3

**Objective:** Read a file whose filename contains spaces (`--spaces in this filename--`).

### Walkthrough

Wrap the filename in quotes, escape the spaces using backslashes `\`, or rely on shell auto-completion via the `Tab` key. Note that `--` tells `cat` to stop parsing command-line flags.

```bash
cat -- "--spaces in this filename--"
# Alternatively:
cat ./--spaces\ in\ this\ filename--
```

---

## Level 3 → Level 4

**Objective:** Locate and read a hidden file inside the `inhere` directory.

### Walkthrough

In Linux, files prefixed with a dot (`.`) are hidden by default. Use `ls -la` to list all directory entries, including hidden ones.

```bash
cd inhere
ls -la
cat ...Hiding-From-You
```

---

## Level 4 → Level 5

**Objective:** Find the only human-readable file inside the `inhere` directory.

### Walkthrough

Use the `file` utility to inspect the file types of every item in the directory:

```bash
cd inhere
file ./*
# Identify the file reported as "ASCII text" (e.g., -file07)
cat ./-file07
```

---

## Level 5 → Level 6

**Objective:** Find a file located somewhere beneath the `inhere` directory that satisfies all three criteria:
1. Human-readable.
2. Exactly `1033 bytes` in size.
3. Not executable.

### Walkthrough

Combine the `find` command with size and permission flags:

```bash
cd inhere
find . -type f -size 1033c ! -executable
# Read the discovered file path, for example:
cat ./maybehere07/.file2
```

---

## Level 6 → Level 7

**Objective:** Locate a file anywhere on the filesystem with the following properties:
* Owned by user `bandit7`
* Owned by group `bandit6`
* `33 bytes` in size

### Walkthrough

Search starting from the root directory `/` and suppress `Permission denied` error messages by redirecting `STDERR` (`2>/dev/null`):

```bash
find / -type f -user bandit7 -group bandit6 -size 33c 2>/dev/null
cat /var/lib/dpkg/info/bandit7.password
```

---

## Level 7 → Level 8

**Objective:** The password is stored in `data.txt` right next to the word `millionth`.

### Walkthrough

```bash
grep "millionth" data.txt
```

---

## Level 8 → Level 9

**Objective:** The password is the only line of text in `data.txt` that occurs only once.

### Walkthrough

The `uniq -u` command only detects unique lines when duplicate lines are adjacent, so you must sort the file first:

```bash
sort data.txt | uniq -u
```

---

## Level 9 → Level 10

**Objective:** The password is stored in `data.txt` as a human-readable string preceded by several `=` characters.

### Walkthrough

Use `strings` to extract printable character sequences from the binary file, then filter them with `grep`:

```bash
strings data.txt | grep "==="
```

---

## Level 10 → Level 11

**Objective:** Decode the Base64-encoded data contained within `data.txt`.

### Walkthrough

```bash
base64 -d data.txt
```

---

## Level 11 → Level 12

**Objective:** Decrypt the text in `data.txt`, where all lowercase and uppercase letters have been rotated by 13 positions (ROT13 / Caesar cipher).

### Walkthrough

Use the `tr` (translate) utility to shift the alphabet back by 13 characters:

```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

---

## Level 12 → Level 13

**Objective:** `data.txt` is a hexdump of a file that has been repeatedly compressed using different formats (`gzip`, `bzip2`, and `tar`).

### Walkthrough

Create a working directory inside `/tmp`, revert the hexdump back into a binary file using `xxd -r`, and iteratively inspect and decompress the file until you reach plain ASCII text:

```bash
mkdir /tmp/mybandit12
cp data.txt /tmp/mybandit12/
cd /tmp/mybandit12

xxd -r data.txt > data.bin
file data.bin

# Repeat renaming and extracting based on the output of `file`:
# - gzip compressed data  -> mv file file.gz && gunzip file.gz
# - bzip2 compressed data -> mv file file.bz2 && bunzip2 file.bz2
# - POSIX tar archive     -> tar -xvf file
```

---

## Level 13 → Level 14

**Objective:** Instead of a password string, you are provided with an SSH Private Key (`sshkey.private`) to authenticate directly as `bandit14`.

### Walkthrough

```bash
ssh -i sshkey.private bandit14@localhost -p 2220
# Once logged in as bandit14, read the stored password:
cat /etc/bandit_pass/bandit14
```

---

## Level 14 → Level 15

**Objective:** Submit the password for `bandit14` to port `30000` on `localhost`.

### Walkthrough

```bash
nc localhost 30000
# Paste the bandit14 password and press Enter
```

---

## Level 15 → Level 16

**Objective:** Submit the password for `bandit15` to port `30001` on `localhost` over an SSL/TLS-encrypted connection.

### Walkthrough

```bash
openssl s_client -connect localhost:30001
# Paste the bandit15 password and press Enter
```

---

## Level 16 → Level 17

**Objective:** Scan ports `31000` through `32000` on `localhost` to find a service speaking SSL/TLS, then submit the `bandit16` password to receive an RSA Private Key for `bandit17`.

### Walkthrough

```bash
nmap -p 31000-32000 -sV localhost
# Identify the SSL-enabled port (e.g., 31790), then connect:
openssl s_client -connect localhost:31790
# Enter the bandit16 password -> Save the returned RSA Private Key to /tmp/key17
chmod 600 /tmp/key17
ssh -i /tmp/key17 bandit17@localhost -p 2220
```

---

## Level 17 → Level 18

**Objective:** The password is the only line that differs between `passwords.old` and `passwords.new`.

### Walkthrough

```bash
diff passwords.old passwords.new
```

---

## Level 18 → Level 19

**Objective:** The password is in `readme`, but `bandit18`'s `.bashrc` file has been modified to immediately log you out (`Byebye !`) upon interactive login.

### Walkthrough

Pass the command directly to `ssh` so it executes without spawning an interactive login shell:

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat readme"
```

---

## Level 19 → Level 20

**Objective:** Use the SetUID binary `bandit20-do` to execute a command with the privileges of `bandit20`.

### Walkthrough

```bash
./bandit20-do cat /etc/bandit_pass/bandit20
```

---

## Level 20 → Level 21

**Objective:** The SetUID binary `suconnect` connects to a specified port on `localhost`, reads a line of text, and if it matches the `bandit20` password, sends back the password for `bandit21`.

### Walkthrough

Start a background listener using `nc` that serves the `bandit20` password, then run `./suconnect`:

```bash
echo "<password_bandit20>" | nc -l -p 4444 &
./suconnect 4444
```

---

## Level 21 → Level 22

**Objective:** Inspect scheduled cron jobs in `/etc/cron.d/` to find where the `bandit22` password is being written.

### Walkthrough

```bash
cat /etc/cron.d/cronjob_bandit22
cat /usr/bin/cronjob_bandit22.sh
# Read the temporary file referenced in the script, e.g.:
cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

---

## Level 22 → Level 23

**Objective:** Analyze the cronjob shell script for `bandit23` to determine the filename holding the password inside `/tmp`.

### Walkthrough

The script computes the MD5 hash of the string `"I am user $myname"`. Substituting `myname=bandit23`, compute the corresponding hash:

```bash
cat /usr/bin/cronjob_bandit23.sh
echo "I am user bandit23" | md5sum | cut -d ' ' -f 1
# Output: 8ca319486bfbbc3663ea0fbe81326349
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

---

## Level 23 → Level 24

**Objective:** A cronjob running as `bandit24` executes and deletes every script placed inside `/var/spool/bandit24/foo`.

### Walkthrough

Write a script that copies `/etc/bandit_pass/bandit24` into a world-writable temporary folder, grant it execution permissions, and wait up to one minute:

```bash
mkdir /tmp/mybandit24
chmod 777 /tmp/mybandit24

cat << 'EOF' > /tmp/mybandit24/getpass.sh
#!/bin/bash
cat /etc/bandit_pass/bandit24 > /tmp/mybandit24/pass.txt
EOF

chmod +x /tmp/mybandit24/getpass.sh
cp /tmp/mybandit24/getpass.sh /var/spool/bandit24/foo/

# Wait roughly 60 seconds, then check the output:
cat /tmp/mybandit24/pass.txt
```

---

## Level 24 → Level 25

**Objective:** A daemon listening on port `30002` expects the `bandit24` password followed by a secret 4-digit PIN (`0000` – `9999`).

### Walkthrough

Generate all 10,000 combinations and pipe them over a single `nc` connection for speed:

```bash
for i in {0000..9999}; do
    echo "<password_bandit24> $i"
done | nc localhost 30002 | grep -v "Wrong!"
```

---

## Level 25 → Level 26

**Objective:** User `bandit26` does not use `/bin/bash`; instead, its login shell is `/usr/bin/showtext`, which displays ASCII art via `more` and immediately exits.

### Walkthrough

1. Shrink your terminal window height down to just a few lines so that `more` cannot display the entire file at once and pauses at the `--More--` prompt.
2. Log in as `bandit26`:
   ```bash
   ssh -i bandit26.sshkey bandit26@localhost -p 2220
   ```
3. When paused at `--More--`, press **`v`** to launch the `vim` editor.
4. Inside `vim`, set the shell to `/bin/bash` and spawn it:
   ```vim
   :set shell=/bin/bash
   :shell
   ```
5. Read the password: `cat /etc/bandit_pass/bandit26`.

---

## Level 26 → Level 27

**Objective:** From the `bandit26` shell obtained in the previous level, exploit the SetUID binary `bandit27-do` in the home directory.

### Walkthrough

```bash
./bandit27-do cat /etc/bandit_pass/bandit27
```

---

## Level 27 → Level 28

**Objective:** Clone a Git repository over SSH on port `2220` and read its `README` file.

### Walkthrough

```bash
mkdir /tmp/git27 && cd /tmp/git27
git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
cd repo
cat README
```

---

## Level 28 → Level 29

**Objective:** Clone the Git repository and recover a password that was removed in an earlier commit.

### Walkthrough

```bash
mkdir /tmp/git28 && cd /tmp/git28
git clone ssh://bandit28-git@localhost:2220/home/bandit28-git/repo
cd repo
git log -p
```

---

## Level 29 → Level 30

**Objective:** Clone the Git repository and inspect other branches in the project.

### Walkthrough

```bash
mkdir /tmp/git29 && cd /tmp/git29
git clone ssh://bandit29-git@localhost:2220/home/bandit29-git/repo
cd repo
git branch -a
git checkout dev
cat README.md
```

---

## Level 30 → Level 31

**Objective:** Clone the Git repository and find the password hidden inside a Git tag.

### Walkthrough

```bash
mkdir /tmp/git30 && cd /tmp/git30
git clone ssh://bandit30-git@localhost:2220/home/bandit30-git/repo
cd repo
git tag
git show secret
```

---

## Level 31 → Level 32

**Objective:** Create a file named `key.txt` containing `May I come in?` and push it to the remote repository to trigger a server-side hook that reveals the password.

### Walkthrough

```bash
mkdir /tmp/git31 && cd /tmp/git31
git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
cd repo

echo "May I come in?" > key.txt
# .gitignore blocks *.txt files, so use -f to force-add it:
git add -f key.txt
git commit -m "Add key.txt"
git push origin master
```

---

## Level 32 → Level 33

**Objective:** You are dropped into a restricted `UPPERCASE SHELL` that converts every character you type into uppercase, causing standard Linux commands to fail.

### Walkthrough

Invoke the special positional parameter `$0` (which expands to the name of the running shell/script, typically `/bin/sh`, unaffected by uppercase conversion) to escape into a standard shell:

```bash
$0
cat /etc/bandit_pass/bandit33
```

---

## Level 33 → Level 34

Congratulations! You have completed all available levels of **OverTheWire: Bandit**.