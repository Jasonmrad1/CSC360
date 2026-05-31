const output = document.getElementById("terminalOutput");

const frames = [
  [
    "   _   ___ ___ ___ ___ ",
    "  /_\\ | __/ __|_ _/ __|",
    " / _ \\| _| (_ || |\\__ \\",
    "/_/ \\_\\___\\___|___|___/",
    "",
    "Aegis Password Vault",
    "",
    "Enter master password: *****",
    "",
    "--------------------------------------",
    "Type 'help' or --help for commands.",
    "--------------------------------------",
    "",
    "vault>",
  ],
  [
    "vault> help",
    "[ Core ]",
    "  add <website> <account> <pass> <note>",
    "  add -w <website> -a <account> -p <pass> [-n <note>]",
    "  edit <id> <website> <account> <pass> <note>",
    "  edit <id> -w/-a/-p/-n <value>",
    "  list [-p]",
    "  show <id>",
    "  show -i <id> | -w/-a/-p/-n <value>",
    "  delete <id>",
    "",
    "vault>",
  ],
  [
    "vault> help",
    "[ Search ]",
    "  show [-a <account>] [-w <website>] [-n <note>]",
    "",
    "[ Advanced ]",
    "  gen [-l <len>] [--no-symbols]",
    "  copy <id>",
    "  passwd",
    "  lock",
    "  clear",
    "  clear-all",
    "  --version",
    "  exit",
    "Tip: help all | help <command> | help -e",
    "",
    "vault>",
  ],
  [
    "vault> add github user user123",
    "Added.",
    "",
    "vault> list",
    "------------------------------",
    "Id      : 1",
    "Website : github",
    "Account : user",
    "Password: ******",
    "Note    :",
    "------------------------------",
    "------------------------------",
    "[+] 1 entry found",
    "",
    "vault>",
  ],
  [
    "vault> show 1",
    "------------------------------",
    "Id      : 1",
    "Website : github",
    "Account : user",
    "Password: user123",
    "Note    :",
    "------------------------------",
    "",
    "vault>",
  ],
];

let frameIndex = 0;
let lineIndex = 0;
let charIndex = 0;
let typedLines = [];

const typingDelay = 14;
const lineDelay = 120;
const framePause = 2000;

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isAccentLine(line, index) {
  return frameIndex === 0 && index >= 0 && index <= 3;
}

function isMutedLine(line) {
  const trimmed = line.trim();
  return (
    line.startsWith("-----") ||
    line.startsWith("Type 'help'") ||
    line.startsWith("Tip:") ||
    trimmed === "vault>"
  );
}

function splitPrompt(line) {
  if (!line.startsWith("vault>")) {
    return null;
  }

  if (line === "vault>") {
    return { prefix: line, rest: "" };
  }

  if (line.startsWith("vault> ")) {
    return { prefix: "vault>", rest: line.slice("vault> ".length) };
  }

  return { prefix: "vault>", rest: line.slice("vault>".length) };
}

function isSectionLine(line) {
  return /^\[.*\]$/.test(line.trim());
}

function isSuccessLine(line) {
  return /^\s*\[\+\]/.test(line);
}

function isAddedLine(line) {
  return line.trim() === "Added.";
}

function splitSuccessLine(line) {
  const match = line.match(/^(\s*\[\+\])\s*(.*)$/);
  if (!match) {
    return null;
  }
  return { prefix: match[1], rest: match[2] };
}


function render() {
  const html = typedLines
    .map((line, index) => {
      const safe = escapeHtml(line);
      if (isAccentLine(line, index) || isSectionLine(line)) {
        return `<span class="terminal-accent">${safe}</span>`;
      }
      if (isAddedLine(line)) {
        return `<span class="terminal-success">${safe}</span>`;
      }
      const successParts = splitSuccessLine(line);
      if (successParts) {
        const prefix = escapeHtml(successParts.prefix);
        const rest = escapeHtml(successParts.rest);
        return `<span class="terminal-success">${prefix}</span>${rest ? " " + rest : ""}`;
      }
      const promptParts = splitPrompt(line);
      if (promptParts) {
        const prefix = escapeHtml(promptParts.prefix);
        const rest = escapeHtml(promptParts.rest);
        return `<span class="terminal-muted">${prefix}</span>${rest ? " " + rest : ""}`;
      }
      if (isMutedLine(line)) {
        return `<span class="terminal-muted">${safe}</span>`;
      }
      return safe;
    })
    .join("\n");

  output.innerHTML = `${html}<span class="cursor"></span>`;
}

function typeNextChar() {
  const frame = frames[frameIndex];
  const line = frame[lineIndex];

  if (charIndex < line.length) {
    const current = typedLines[lineIndex] || "";
    typedLines[lineIndex] = current + line[charIndex];
    charIndex += 1;
    render();
    setTimeout(typeNextChar, typingDelay);
    return;
  }

  lineIndex += 1;
  charIndex = 0;

  if (lineIndex < frame.length) {
    typedLines[lineIndex] = "";
    render();
    setTimeout(typeNextChar, lineDelay);
    return;
  }

  setTimeout(() => {
    frameIndex = (frameIndex + 1) % frames.length;
    lineIndex = 0;
    charIndex = 0;
    typedLines = [""];
    render();
    setTimeout(typeNextChar, lineDelay);
  }, framePause);
}

typedLines = [""];
render();
setTimeout(typeNextChar, lineDelay);
