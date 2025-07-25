# 📝 Incident Markdown Generator

A React-based web app that allows users to:

- Input incident or ITSM data via JSON
- Render markdown reports based on Handlebars templates
- Switch between multiple report types (e.g., Bi-Weekly, Monthly)
- View live-rendered Markdown as HTML
- Print or download reports as `.md` or PDF
- Persist form state across page reloads using Redux Persist

---

## 🚀 Features

- ⚙️ **Dynamic Report Types**: Choose between bi-weekly and monthly reports
- 🧠 **Handlebars Templating**: JSON data rendered via `.hbs` templates
- 💾 **Redux + Redux Persist**: App state is stored and rehydrated automatically
- 📄 **Live Markdown Preview**: Output shows as formatted HTML
- 🖨️ **One-click Print/PDF Export**: Print-friendly HTML is generated and opened in a new window
- 🧼 **Reset to Default**: Reset data to default JSON & template for current report type

---

## 📁 File Structure

```
/src
├── App.jsx                     # Main component with input and preview
├── store/
│   ├── index.js               # Redux + redux-persist store setup
│   └── slices/appSlice.js    # State: jsonInput, templateSrc, reportType
├── report-templates/
│   ├── bi-weekly.json         # Example data for bi-weekly report
│   ├── bi-weekly-template.hbs # Handlebars template for bi-weekly
│   ├── monthly.json           # Example data for monthly report
│   └── monthly-template.hbs   # Handlebars template for monthly
```

---

## 🧪 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the app
```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧰 Tech Stack

- React 18+
- Redux Toolkit
- Redux Persist
- Ant Design (UI)
- Handlebars
- Marked (Markdown to HTML parser)
- FileSaver (for .md export)

---

## 🧼 TODOs / Improvements

- [ ] Add support for multiple template versions
- [ ] Add copy-to-clipboard button for Markdown output
- [ ] Add dark mode toggle
- [ ] Add i18n support

---

## 👨‍💻 Author
**Emre Hancı**

Feel free to contribute or fork for your own incident reporting needs!
