// ===== State =====
let selectedIndustry = null;
let checkState = {};
let activeFilters = new Set(['high', 'medium', 'low']);

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('industry-grid');
    industries.forEach(ind => {
        const btn = document.createElement('button');
        btn.className = 'industry-btn';
        btn.setAttribute('data-id', ind.id);
        btn.innerHTML = `<span class="icon">${ind.icon}</span>${ind.name}`;
        btn.onclick = () => selectIndustry(ind.id);
        grid.appendChild(btn);
    });
    document.getElementById('create-date').value = new Date().toISOString().split('T')[0];
});

function selectIndustry(id) {
    selectedIndustry = id;
    document.querySelectorAll('.industry-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-id') === id);
    });
}

function generateChecklist() {
    if (!selectedIndustry) {
        alert('業種を選択してください。');
        return;
    }

    checkState = {};
    const output = document.getElementById('checklist-output');
    const indInfo = industries.find(i => i.id === selectedIndustry);
    const companyName = document.getElementById('company-name').value || '（未入力）';
    const dealName = document.getElementById('deal-name').value || '（未入力）';
    const dealScheme = document.getElementById('deal-scheme').value || '（未選択）';
    const createDate = document.getElementById('create-date').value;

    const relevance = industryRelevance[selectedIndustry] || {};
    activeFilters = new Set(['high', 'medium', 'low']);

    let html = `
    <div class="checklist-header fade-in">
        <div style="flex:1">
            <h2>${indInfo.icon} ${indInfo.name} M&A チェックリスト</h2>
            <div class="checklist-meta">
                対象: ${companyName} ｜ 案件: ${dealName} ｜ スキーム: ${dealScheme} ｜ 作成日: ${createDate}
            </div>
            <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
            <div class="progress-text" id="progress-text">進捗: 0 / 0 項目完了（0%）</div>
        </div>
        <div class="action-buttons">
            <button class="action-btn" onclick="expandAll()">全展開</button>
            <button class="action-btn" onclick="collapseAll()">全折畳</button>
            <button class="action-btn" onclick="checkAll()">全チェック</button>
            <button class="action-btn" onclick="uncheckAll()">全解除</button>
            <button class="action-btn" onclick="exportCSV()">CSV出力</button>
            <button class="action-btn primary" onclick="window.print()">印刷</button>
        </div>
    </div>`;

    // Key Focus Points Panel
    if (relevance.keyFocusPoints) {
        html += `<div class="key-focus-panel fade-in">
            <h3>&#9888;&#65039; ${indInfo.name}のM&A 重要論点</h3>
            <div class="kf-subtitle">この業種で特に注意すべきリスク・論点を優先的に確認してください</div>
            <div class="focus-grid">`;
        relevance.keyFocusPoints.forEach(fp => {
            html += `<div class="focus-card">
                <span class="fc-icon">${fp.icon}</span>
                <div>
                    <div class="fc-title">${fp.title}</div>
                    <div class="fc-desc">${fp.desc}</div>
                </div>
            </div>`;
        });
        html += `</div></div>`;
    }

    // Relevance Heatmap
    html += `<div class="heatmap-panel fade-in">
        <h3>DD分野別 重要度マップ（${indInfo.name}）</h3>
        <div class="heatmap-grid">`;
    commonCategories.forEach(cat => {
        const rel = relevance[cat.id] || 'standard';
        const hmClass = rel === 'critical' ? 'hm-critical' : rel === 'important' ? 'hm-important' : 'hm-standard';
        const relLabel = rel === 'critical' ? '最重要' : rel === 'important' ? '重要' : '標準';
        html += `<div class="heatmap-item ${hmClass}">
            <span class="hm-icon">${cat.icon}</span>
            ${cat.name}<br><small>${relLabel}</small>
        </div>`;
    });
    const specific = industrySpecific[selectedIndustry];
    if (specific) {
        specific.categories.forEach(cat => {
            html += `<div class="heatmap-item hm-critical">
                <span class="hm-icon">${cat.icon}</span>
                ${cat.name}<br><small>業種固有</small>
            </div>`;
        });
    }
    html += `</div></div>`;

    // Priority Filter
    html += `<div class="filter-bar fade-in">
        <span>表示フィルター：</span>
        <button class="filter-btn f-high active" onclick="toggleFilter('high', this)">&#9632; 重要度：高</button>
        <button class="filter-btn f-medium active" onclick="toggleFilter('medium', this)">&#9632; 重要度：中</button>
        <button class="filter-btn f-low active" onclick="toggleFilter('low', this)">&#9632; 重要度：低</button>
    </div>`;

    // Render common categories
    let itemIndex = 0;
    commonCategories.forEach((cat, catIdx) => {
        const rel = relevance[cat.id] || 'standard';
        html += renderCategory(cat, catIdx, itemIndex, 'common', rel);
        itemIndex += cat.items.length;
    });

    // Render industry-specific
    if (specific) {
        html += `<div class="fade-in" style="margin-top:1.5rem">
            <h3 style="color:var(--primary);margin-bottom:.8rem;font-size:1.1rem">${specific.icon} ${specific.name}</h3>
        </div>`;
        specific.categories.forEach((cat, catIdx) => {
            html += renderCategory(cat, catIdx, itemIndex, 'specific', 'critical');
            itemIndex += cat.items.length;
        });
    }

    output.innerHTML = html;
    output.className = 'visible';
    updateProgress();
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCategory(cat, catIdx, startIdx, prefix, relevanceLevel) {
    const priorityClass = cat.priority === 'high' ? 'badge-high' : cat.priority === 'medium' ? 'badge-medium' : 'badge-low';
    const priorityLabel = cat.priority === 'high' ? '重要度：高' : cat.priority === 'medium' ? '重要度：中' : '重要度：低';
    const relClass = relevanceLevel === 'critical' ? 'relevance-critical' : relevanceLevel === 'important' ? 'relevance-important' : 'relevance-standard';
    const relBadge = relevanceLevel === 'critical' ? '<span class="category-badge badge-high" style="font-size:.7rem">&#9733; 最重要</span>' :
                     relevanceLevel === 'important' ? '<span class="category-badge badge-medium" style="font-size:.7rem">&#9733; 重要</span>' : '';

    let html = `<div class="category-section ${relClass} fade-in">
        <div class="category-header" onclick="toggleCategory('${prefix}-${catIdx}')">
            <div class="category-title">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
                ${relBadge}
                <span class="category-badge ${priorityClass}">${priorityLabel}</span>
                <span style="font-size:.85rem;color:var(--text-light)">(${cat.items.length}項目)</span>
            </div>
            <span class="category-toggle open" id="toggle-${prefix}-${catIdx}">▼</span>
        </div>
        <div class="category-body" id="body-${prefix}-${catIdx}">`;

    cat.items.forEach((item, idx) => {
        const globalIdx = startIdx + idx;
        const pClass = item.priority === 'high' ? 'priority-high' : item.priority === 'medium' ? 'priority-medium' : 'priority-low';
        const pLabel = item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低';
        const itemRowClass = `item-${item.priority}`;
        const titleClass = `title-${item.priority}`;
        html += `<div class="checklist-item ${itemRowClass}" data-priority="${item.priority}">
            <input type="checkbox" id="check-${globalIdx}" onchange="onCheck(${globalIdx})">
            <div class="item-content">
                <div class="item-title ${titleClass}" id="title-${globalIdx}">${item.title}</div>
                <div class="item-detail">${item.detail}</div>
                <input class="note-input" id="note-${globalIdx}" placeholder="メモを入力..." onfocus="this.classList.add('visible')" onblur="if(!this.value)this.classList.remove('visible')">
            </div>
            <span class="item-priority ${pClass}">${pLabel}</span>
        </div>`;
    });

    html += `</div></div>`;
    return html;
}

function toggleFilter(priority, btn) {
    if (activeFilters.has(priority)) {
        activeFilters.delete(priority);
        btn.classList.remove('active');
    } else {
        activeFilters.add(priority);
        btn.classList.add('active');
    }
    applyFilters();
}

function applyFilters() {
    document.querySelectorAll('.checklist-item[data-priority]').forEach(item => {
        const p = item.getAttribute('data-priority');
        item.classList.toggle('filtered-out', !activeFilters.has(p));
    });
    updateProgress();
}

function toggleCategory(id) {
    const body = document.getElementById('body-' + id);
    const toggle = document.getElementById('toggle-' + id);
    body.classList.toggle('collapsed');
    toggle.classList.toggle('open');
}

function expandAll() {
    document.querySelectorAll('.category-body').forEach(el => el.classList.remove('collapsed'));
    document.querySelectorAll('.category-toggle').forEach(el => el.classList.add('open'));
}
function collapseAll() {
    document.querySelectorAll('.category-body').forEach(el => el.classList.add('collapsed'));
    document.querySelectorAll('.category-toggle').forEach(el => el.classList.remove('open'));
}

function onCheck(idx) {
    const cb = document.getElementById('check-' + idx);
    const title = document.getElementById('title-' + idx);
    checkState[idx] = cb.checked;
    title.classList.toggle('checked', cb.checked);
    updateProgress();
}

function checkAll() {
    document.querySelectorAll('#checklist-output input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
        const idx = cb.id.replace('check-', '');
        checkState[idx] = true;
        const title = document.getElementById('title-' + idx);
        if (title) title.classList.add('checked');
    });
    updateProgress();
}
function uncheckAll() {
    document.querySelectorAll('#checklist-output input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        const idx = cb.id.replace('check-', '');
        checkState[idx] = false;
        const title = document.getElementById('title-' + idx);
        if (title) title.classList.remove('checked');
    });
    updateProgress();
}

function updateProgress() {
    const all = document.querySelectorAll('#checklist-output input[type="checkbox"]');
    const checked = document.querySelectorAll('#checklist-output input[type="checkbox"]:checked');
    const total = all.length;
    const done = checked.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `進捗: ${done} / ${total} 項目完了（${pct}%）`;
}

function exportCSV() {
    const indInfo = industries.find(i => i.id === selectedIndustry);
    const companyName = document.getElementById('company-name').value || '';
    const BOM = '\uFEFF';
    let csv = BOM + 'カテゴリ,項目,詳細,重要度,チェック,メモ\n';

    let globalIdx = 0;
    const allCats = [...commonCategories];
    const specific = industrySpecific[selectedIndustry];
    if (specific) allCats.push(...specific.categories);

    allCats.forEach(cat => {
        cat.items.forEach(item => {
            const checked = checkState[globalIdx] ? '済' : '未';
            const noteEl = document.getElementById('note-' + globalIdx);
            const note = noteEl ? noteEl.value.replace(/"/g, '""') : '';
            const pLabel = item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低';
            csv += `"${cat.name}","${item.title}","${item.detail}","${pLabel}","${checked}","${note}"\n`;
            globalIdx++;
        });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MA_Checklist_${indInfo.name}_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
