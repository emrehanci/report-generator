import { useEffect } from "react";
import { Button, Card, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Handlebars from "handlebars";
import { marked } from "marked";
import { useDispatch, useSelector } from "react-redux";
import { setJsonInput, setTemplateSrc, setReportType } from "./store/slices/appSlice";

export default function App() {
    const dispatch = useDispatch();
    const { jsonInput, templateSrc, reportType } = useSelector((state) => state.app);

    useEffect(() => {
        if (jsonInput === "") {
            loadReportData(reportType);
        }
    }, [reportType]);

    const loadReportData = (type) => {
        fetch(`/report-templates/${type}.json`)
            .then((res) => res.text())
            .then((data) => dispatch(setJsonInput(data)))
            .catch(() => dispatch(setJsonInput("{}")));

        fetch(`/report-templates/${type}-template.hbs`)
            .then((res) => res.text())
            .then((data) => dispatch(setTemplateSrc(data)))
            .catch(() => dispatch(setTemplateSrc("")));
    };

    const getMarkdown = () => {
        try {
            const data = JSON.parse(jsonInput);
            const compiled = Handlebars.compile(templateSrc);
            return compiled(data);
        } catch (err) {
            return "Invalid JSON or Template";
        }
    };

    const handleDownload = () => {
        const htmlContent = marked.parse(getMarkdown());

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
      <html>
        <head>
          <title>Incident Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1, h2, h3 {
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 1em;
            }
            table, th, td {
              border: 1px solid #999;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    const handleReset = () => {
        loadReportData(reportType);
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 16 }}>
            <Card
                title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Incident JSON Input</span>
                    <Space>
                        <Select
                            value={reportType}
                            onChange={(value) => {dispatch(setReportType(value)); loadReportData(value);}}
                            options={[
                                { label: "Bi-Weekly Report", value: "bi-weekly" },
                                { label: "Monthly Report", value: "monthly" }
                            ]}
                            style={{ width: 180 }}
                        />
                        <Button onClick={handleReset}>Reset to Default</Button>
                    </Space>
                </div>}
                style={{ height: "80vh", overflow: "auto" }}
            >
                <TextArea
                    style={{ width: "100%", height: "70vh", fontFamily: "monospace" }}
                    value={jsonInput}
                    onChange={(e) => dispatch(setJsonInput(e.target.value))}
                />
            </Card>

            <Card
                title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Generated Markdown</span>
                    <Button onClick={handleDownload}>Download / Print</Button>
                </div>}
                style={{ height: "80vh", overflow: "auto" }}
            >
                <div
                    style={{ fontSize: 14 }}
                    dangerouslySetInnerHTML={{ __html: marked.parse(getMarkdown()) }}
                />
            </Card>
        </div>
    );
}
