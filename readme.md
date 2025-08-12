# terminalstyle

`terminalstyle` is a lightweight, zero-dependency Node.js library that makes styling your terminal output **fast, easy, and reliable**.  
It supports standard ANSI colors, modifiers (bold, underline, italic, etc.), background colors, **RGB/HEX**, and even lets you enable/disable styling dynamically.

---

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [Supported Styles](#-supported-styles)
- [Advanced Usage](#-advanced-usage)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Performance](#-performance)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🎨 **Easy Styling** – Apply colors, bold, underline, and more with minimal code.
- ⚡ **Zero Dependencies** – Ultra-fast and works in any Node.js environment.
- 🖥 **Cross-Platform** – Works on macOS, Linux, and Windows terminals.
- 🔗 **Chainable API** – Combine multiple styles easily.
- 🌈 **RGB & HEX Support** – Style your text with full 24-bit color.
- 📦 **Lightweight** – Minimal package size for quick installs.
- 💻 **Developer-Friendly** – Intuitive function names and API.

---

## 📦 Installation

Install via npm:
```bash
npm install terminalstyle
```

---

## 🚀  Quick Start

``` bash
const style = require('terminalstyle');

console.log(style.red('Error: Something went wrong!'));
console.log(style.green('Success: Operation completed!'));
console.log(style.bold(style.blue('Bold and blue text')));
```

---

## 💡 Usage Examples

### - Basic Colors

``` bash
console.log(style.red('This is red text'));
console.log(style.green('This is green text'));
console.log(style.yellow('This is yellow text'));
```

### - Text Modifiers

``` bash
console.log(style.bold('Bold text'));
console.log(style.underline('Underlined text'));
console.log(style.italic('Italic text'));
console.log(style.dim('Dimmed text'));
```

### - Background Colors

``` bash
console.log(style.bgRed('Red background'));
console.log(style.bgBlue('Blue background'));
console.log(style.bgGreen('Green background'));
```

### - RGB & HEX Colors

``` bash
console.log(style.rgb(255, 105, 180)('Hot pink'));
console.log(style.hex('#1e90ff')('Dodger blue'));
console.log(style.bgHex('#333')('Dark background'));
```

### - Combining Styles

``` bash
console.log(style.bold(style.red('Bold and red')));
console.log(style.underline(style.blue('Underlined blue text')));
console.log(style.inverse(style.green('Green text with inverted background')));
```

---

## 🎨 Supported Styles

### - Modifiers:
* reset
* bold
* dim
* italic
* underline
* inverse
* hidden
* strikethrough

### - Foreground Colors:
* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white

### - Background Colors:
* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite 

---

## ⚙️ Advanced Usage

### - Dynamic Styling
```bash
function logStatus(success) {
  if (success) {
    console.log(style.green('✓ Success'));
  } else {
    console.log(style.red('✗ Failure'));
  }
}

logStatus(true);
logStatus(false);
```

### - Nested Styles
```bash
console.log(
  style.bold(
    style.red('Error:') + ' ' + style.white('Invalid input')
  )
);
```

---

## 📚 API Reference

### - Color and Style Functions
Each style is a function that takes a string and returns a styled string:
``` bash
style.red('text');
style.bold('text');
style.bgBlue('text');
```

### - Applies an RGB color:
``` bash
style.rgb(255, 0, 0)('Bright red');
style.bgRgb(0, 255, 0)('Green background');
``` 

### - Applies a HEX color : 
``` bash
style.hex('#ffaa00')('Orange text');
style.bgHex('#0055ff')('Blue background');
``` 

---

## 🌍 Environment Variables

You can control color output using environment variables:
| Variable      | Description                             |
| ------------- | --------------------------------------- |
| `NO_COLOR`    | Disables all colors and styles          |
| `FORCE_COLOR` | `1`, `2`, or `3` to force-enable colors |

---

## ⚡ Performance

terminalstyle uses raw ANSI escape codes for maximum speed, making it ideal for `real-time logging`, `interactive CLI tools`, and `high-frequency output`.

---

## 🧪 Testing

Run tests with:
``` bash
npm test
```

---

## 🤝 Contributing

Contributions are welcome! To get started:
1. Fork the repository
2. Create a feature branch:
``` bash 
git checkout -b feature/my-feature
```
3. Commit your changes:
``` bash
git commit -m "Add my feature"
```
4. Push to your branch:
``` bash
git push origin feature/my-feature
```
5. Open a Pull Request 🎉

---

## 📄 License
MIT License © 2025 [NormanMarks]
Free for personal and commercial use.