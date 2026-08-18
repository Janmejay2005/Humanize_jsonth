# Humanize — JSON, Plainly

A lightweight, interactive web app that translates JSON data into clear, human-readable English. Perfect for understanding data structures, API responses, and configuration files at a glance.

### Published link : https://janmejay2005.github.io/Humanize_jsonth/

## 🎯 Features

- **Live Translation**: Paste JSON and instantly see it described in plain English
- **File Upload**: Upload `.json` files directly using the upload button or drag-and-drop
- **Drag & Drop**: Drop JSON files anywhere on the input pane for instant processing
- **Real-time Validation**: Automatic error detection with helpful error messages
- **Summary View**: Get a one-line summary of your data structure
- **Detailed Breakdown**: Explore complete data hierarchy with type information
- **Copy Summary**: Export the translated text to your clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Draggable Divider**: Resize the input and output panes to suit your workflow
- **Dark Theme**: Eye-friendly interface with high contrast and readable typography

## 🚀 Quick Start

1. **Paste JSON**: Paste your JSON in the "Raw JSON" pane on the left
2. **Read the translation**: See the plain English breakdown on the right
3. **Or upload a file**: Click "Upload file" or drag a `.json` file onto the input area

### Example

**Input JSON:**
```json
{
  "name": "Janmejay",
  "role": "Vice President, Odyssey",
  "active": true,
  "skills": ["Python", "React", "FastAPI"]
}
```

**Output:**
```
In one line
This is a record with 4 fields: name, role, active, skills.

Full breakdown
name: Janmejay
role: Vice President, Odyssey
active: true
skills: list · 3 items
  item 1: Python
  item 2: React
  item 3: FastAPI
```

## 🛠️ How It Works

### JSON Parsing
- Uses native JavaScript `JSON.parse()` to validate and parse input
- Supports objects, arrays, strings, numbers, booleans, and null values

### Translation Logic
- **Objects**: Described as "record" with field count and names
- **Arrays**: Described as "list" with item count
- **Primitives**: Rendered as their type with actual values
- **Keys**: Automatically humanized (converts `camelCase` and `snake_case` to readable text)

### Data Stats
- **Groups**: Number of objects/records
- **Lists**: Number of arrays
- **Values**: Number of primitive values (strings, numbers, booleans, null)

## ⌨️ Keyboard & Mouse

- **Paste JSON**: Ctrl+V (or Cmd+V on Mac) in the Raw JSON pane
- **Upload File**: Click "Upload file" button
- **Drag & Drop**: Drop a `.json` file on the input pane
- **Resize Panes**: Drag the vertical divider to adjust pane width
- **Copy Summary**: Click "Copy summary" to copy output text
- **Load Sample**: Click "Load sample" to see an example


## 📱 Responsive Design

- **Desktop (>760px)**: Side-by-side layout with draggable divider
- **Mobile (<760px)**: Stacked layout with draggable divider between input/output
- All font sizes and spacing adjust for readability on smaller screens

## ⚙️ Browser Compatibility

- Chrome, Firefox, Safari, Edge (all modern versions)
- Requires JavaScript enabled
- FileReader API support for file upload
- Drag & Drop API support for file handling

## 🐛 Error Handling

- **Invalid JSON**: Displays error message with specific parsing error details
- **Empty Input**: Shows helpful placeholder text
- **Unsupported File Types**: Ignores non-JSON files in drag-and-drop
- **Empty Collections**: Indicates "empty list" or "empty group"

## 📊 Stats Display

Real-time statistics bar shows:
- **Groups**: Count of objects/records in your JSON
- **Lists**: Count of arrays in your JSON
- **Values**: Count of primitive values

The stats bar appears with a "live" indicator (amber highlight) when valid JSON is loaded.

## 🔄 Features in Detail

### File Upload
- Click "Upload file" button to select a `.json` file
- File is automatically parsed and displayed
- Supports standard JSON MIME types and `.json` extensions

### Drag & Drop
- Drag any `.json` file and drop it on the Raw JSON input area
- Visual feedback (amber border highlight) during drag-over
- Automatically validates file type before processing

### Draggable Divider
- Click and drag the center divider to resize panes
- Mobile-friendly: drag vertically to adjust input/output height
- Works on both mouse and touch devices

### Copy Summary
- Click "Copy summary" button to copy all readable output to clipboard
- Confirmation text changes to "copied" briefly
- Plain text format (no HTML markup)

## 📝 Notes

- This is a **client-side only** application — no server or backend required
- All processing happens in your browser
- JSON data is never sent anywhere
- Works offline after initial page load

## 🎓 Use Cases

- Understanding API response structures
- Debugging configuration files
- Learning JSON format
- Data exploration and analysis
- Educational demonstrations
- Testing JSON validity quickly

## 📄 License

Use freely in personal and commercial projects.

## 🙋 Support & Feedback

For issues, feature requests, or improvements, feel free to reach out!

---

**Version**: 2.0  
**Last Updated**: 2026-08-18  
**Built with**: HTML, CSS, JavaScript (Vanilla)
