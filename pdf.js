

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require("fs");
const { spawn } = require('child_process');
const { spawnSync } = require('child_process');
const { execSync } = require('child_process');// Ensure this is required



app.listen(3001)

console.log("Server started on port 3001");
app.get('/', async function (req, res) {
  const textContent1 = `
    \\documentclass{article}
  
    \\usepackage{import}
    \\begin{document}
    Hello, hi \\ LaTeX!
    hi heloo \\\\
   
    \\end{document}
  `;

  // Write LaTeX content to .tex file
  fs.writeFileSync('bug_report.tex', textContent1);



  // Compile LaTeX to PDF
  let count = 0;
  for (let i = 0; i < 3; i++) {

    // let pdflatex = spawnSync('pdflatex', ['bug_report.tex']);
    const pdflatex = execSync('pdflatex bug_report.tex', { stdio: 'inherit' });

    count++;
    console.log("count", count);
   
  }




  console.log("bug report generating");

  // Send the generated PDF as a response
  const pdfBuffer = fs.readFileSync('bug_report.pdf');
  console.log(pdfBuffer)
  res.setHeader('Content-Type', 'application/pdf');
  console.log("set header");
  res.setHeader('Content-Disposition', 'inline; filename=BugReport.pdf');
  console.log("inline filename");
  res.send(pdfBuffer);

  console.log("Bug report generated");

  // Compile LaTeX to PDF


  // Send the generated PDF as a response



});
