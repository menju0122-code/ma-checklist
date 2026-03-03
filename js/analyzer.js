// ===== 企業概況書 AI分析 =====

let extractedPDFText = '';
let lastAnalysis = null;

// PDF.js初期化 & ドラッグドロップ設定
function initAnalyzer() {
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const dropZone = document.getElementById('pdf-drop-zone');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handlePDFFile(file);
        } else {
            alert('PDFファイルをドロップしてください。');
        }
    });

    document.getElementById('pdf-upload').addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) handlePDFFile(file);
    });
}

async function handlePDFFile(file) {
    const status = document.getElementById('pdf-status');
    const analyzeBtn = document.getElementById('analyze-btn');

    status.textContent = 'PDFを読み込み中...';
    status.className = 'pdf-status loading';
    analyzeBtn.disabled = true;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }

        extractedPDFText = text.trim();
        const charCount = extractedPDFText.length;

        status.textContent = `✓ ${file.name}　（${pdf.numPages}ページ、約${charCount.toLocaleString()}文字を抽出）`;
        status.className = 'pdf-status success';
        analyzeBtn.disabled = false;

        document.getElementById('pdf-drop-zone').classList.add('has-file');
        document.getElementById('pdf-filename').textContent = file.name;
    } catch (err) {
        status.textContent = 'エラー: ' + err.message;
        status.className = 'pdf-status error';
    }
}

async function analyzeCompanyDocument() {
    const apiKey = document.getElementById('api-key').value.trim();
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultPanel = document.getElementById('analysis-result');

    if (!extractedPDFText) {
        alert('企業概況書（PDF）を先にアップロードしてください。');
        return;
    }
    if (!apiKey) {
        alert('Claude API キーを入力してください。\n（sk-ant-... で始まるキー）');
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="spinner"></span> AI分析中...';
    resultPanel.style.display = 'none';

    try {
        const truncatedText = extractedPDFText.substring(0, 8000);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
                'anthropic-dangerous-direct-browser-access': 'true',
            },
            body: JSON.stringify({
                model: 'claude-opus-4-6',
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: `あなたはM&Aアドバイザー（FA）です。以下の企業概況書テキストを読み、買い手（買収する企業）の視点から詳細に分析してください。

【企業概況書テキスト】
${truncatedText}

以下のJSON形式のみで出力してください（説明文・前置き不要）:
{
  "companyName": "会社名（概況書から抽出）",
  "industry": "業種",
  "businessSummary": "事業概要（3〜4文で簡潔に）",
  "merits": [
    {
      "title": "メリットのタイトル（15字以内）",
      "detail": "具体的な説明（50〜100字）",
      "category": "財務/事業/市場/人材/その他"
    }
  ],
  "demerits": [
    {
      "title": "リスク・懸念点のタイトル（15字以内）",
      "detail": "具体的な説明と対処の方向性（50〜100字）",
      "category": "財務/法務/事業/人材/その他"
    }
  ],
  "initialQA": [
    {
      "question": "初回面談で確認すべき具体的な質問",
      "purpose": "この質問が重要な理由（なぜ確認が必要か）",
      "category": "財務/法務/事業/人材/その他",
      "priority": "high/medium/low"
    }
  ]
}

出力の指針:
- メリットは5〜8個
- デメリット・リスクは4〜7個
- 初回QAは8〜15個（重要度の高いものから）
- 企業概況書の内容に基づいた具体的な分析をすること`
                }]
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.content[0].text;

        let analysis;
        try {
            const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            analysis = JSON.parse(cleaned);
        } catch (e) {
            throw new Error('AIの回答をJSONとして解析できませんでした。');
        }

        lastAnalysis = analysis;
        renderAnalysis(analysis);

    } catch (err) {
        alert('分析エラー: ' + err.message);
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '🤖 AI分析を実行';
    }
}

function renderAnalysis(analysis) {
    const panel = document.getElementById('analysis-result');

    const meritHTML = (analysis.merits || []).map((m, i) => `
        <div class="merit-card">
            <div class="mc-number">${i + 1}</div>
            <div class="mc-body">
                <div class="mc-title">${escapeHtml(m.title)}</div>
                <div class="mc-cat">${escapeHtml(m.category || '')}</div>
                <div class="mc-detail">${escapeHtml(m.detail)}</div>
            </div>
        </div>`).join('');

    const demeritHTML = (analysis.demerits || []).map((d, i) => `
        <div class="demerit-card">
            <div class="dc-number">${i + 1}</div>
            <div class="dc-body">
                <div class="dc-title">${escapeHtml(d.title)}</div>
                <div class="dc-cat">${escapeHtml(d.category || '')}</div>
                <div class="dc-detail">${escapeHtml(d.detail)}</div>
            </div>
        </div>`).join('');

    const qaHTML = (analysis.initialQA || []).map((qa, i) => {
        const pClass = qa.priority === 'high' ? 'qa-p-high' : qa.priority === 'medium' ? 'qa-p-med' : 'qa-p-low';
        const priBadge = qa.priority === 'high' ? '<span class="qa-pri-badge">重要</span>' : '';
        return `
        <div class="qa-item ${pClass}">
            <div class="qa-header-row">
                <span class="qa-num">Q${i + 1}</span>
                <span class="qa-cat-badge">${escapeHtml(qa.category || 'その他')}</span>
                ${priBadge}
                <span class="qa-question">${escapeHtml(qa.question)}</span>
            </div>
            <div class="qa-purpose">💡 ${escapeHtml(qa.purpose)}</div>
        </div>`;
    }).join('');

    panel.innerHTML = `
    <div class="analysis-report-header">
        <div class="arh-left">
            <h3 class="arh-company">${escapeHtml(analysis.companyName || '企業分析レポート')}</h3>
            <div class="arh-industry">${escapeHtml(analysis.industry || '')}</div>
            <div class="arh-summary">${escapeHtml(analysis.businessSummary || '')}</div>
        </div>
        <div class="arh-right">
            <div class="arh-stat">
                <span class="arh-stat-num arh-green">${(analysis.merits || []).length}</span>
                <span class="arh-stat-label">メリット</span>
            </div>
            <div class="arh-stat">
                <span class="arh-stat-num arh-red">${(analysis.demerits || []).length}</span>
                <span class="arh-stat-label">リスク</span>
            </div>
            <div class="arh-stat">
                <span class="arh-stat-num arh-blue">${(analysis.initialQA || []).length}</span>
                <span class="arh-stat-label">QA項目</span>
            </div>
        </div>
    </div>

    <div class="analysis-tabs">
        <button class="atab-btn active" onclick="switchAnalysisTab(this,'tab-md')">✅ メリット・デメリット</button>
        <button class="atab-btn" onclick="switchAnalysisTab(this,'tab-qa')">❓ 初回QAリスト</button>
    </div>

    <div id="tab-md" class="atab-pane">
        <div class="md-grid">
            <div>
                <div class="md-section-title merit-title">✅ 買い手メリット（${(analysis.merits || []).length}件）</div>
                ${meritHTML}
            </div>
            <div>
                <div class="md-section-title demerit-title">⚠️ リスク・懸念点（${(analysis.demerits || []).length}件）</div>
                ${demeritHTML}
            </div>
        </div>
    </div>

    <div id="tab-qa" class="atab-pane" style="display:none">
        <div class="qa-toolbar">
            <span class="qa-count">全 ${(analysis.initialQA || []).length} 項目</span>
            <button class="qa-export-btn" onclick="exportQAToText()">📄 テキスト出力</button>
            <button class="qa-export-btn" onclick="exportQAToCSV()">📊 CSV出力</button>
        </div>
        <div class="qa-list">${qaHTML}</div>
    </div>`;

    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function switchAnalysisTab(btn, tabId) {
    document.querySelectorAll('.atab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.atab-pane').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    document.getElementById(tabId).style.display = 'block';
}

function exportQAToText() {
    if (!lastAnalysis) return;
    const a = lastAnalysis;
    let text = `【初回QAリスト】\n`;
    text += `対象企業: ${a.companyName || ''}\n`;
    text += `作成日: ${new Date().toLocaleDateString('ja-JP')}\n`;
    text += '='.repeat(60) + '\n\n';
    (a.initialQA || []).forEach((qa, i) => {
        const pri = qa.priority === 'high' ? '★重要' : qa.priority === 'medium' ? '☆中' : '　低';
        text += `Q${i + 1}【${qa.category}】${pri}\n`;
        text += `　${qa.question}\n`;
        text += `　→ 確認目的: ${qa.purpose}\n\n`;
    });
    downloadTextFile(text, `初回QA_${a.companyName || '企業'}_${new Date().toISOString().slice(0, 10)}.txt`);
}

function exportQAToCSV() {
    if (!lastAnalysis) return;
    const a = lastAnalysis;
    const BOM = '\uFEFF';
    let csv = BOM + 'No.,カテゴリ,重要度,質問内容,確認目的\n';
    (a.initialQA || []).forEach((qa, i) => {
        const p = qa.priority === 'high' ? '高' : qa.priority === 'medium' ? '中' : '低';
        csv += `${i + 1},"${qa.category}","${p}","${(qa.question || '').replace(/"/g, '""')}","${(qa.purpose || '').replace(/"/g, '""')}"\n`;
    });
    downloadTextFile(csv, `初回QA_${a.companyName || '企業'}_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
}

function downloadTextFile(content, filename, type = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function toggleApiKey() {
    const input = document.getElementById('api-key');
    const btn = document.getElementById('toggle-key-btn');
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🔒';
    } else {
        input.type = 'password';
        btn.textContent = '👁';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', initAnalyzer);
