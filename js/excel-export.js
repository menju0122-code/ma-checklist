// ===== Excel Export (ExcelJS) =====

async function exportExcel() {
    if (!selectedIndustry) {
        alert('先にチェックリストを生成してください。');
        return;
    }

    const indInfo = industries.find(i => i.id === selectedIndustry);
    const companyName = document.getElementById('company-name').value || '未入力';
    const dealName = document.getElementById('deal-name').value || '未入力';
    const dealScheme = document.getElementById('deal-scheme').value || '未選択';
    const createDate = document.getElementById('create-date').value;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'MA Checklist Tool';
    workbook.created = new Date();

    // ===== Sheet 1: チェックリスト =====
    const ws = workbook.addWorksheet('チェックリスト', {
        pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 }
    });

    ws.columns = [
        { key: 'category', width: 20 },
        { key: 'title',    width: 38 },
        { key: 'detail',   width: 45 },
        { key: 'priority', width: 10 },
        { key: 'check',    width: 10 },  // E列: 済/未
        { key: 'note',     width: 32 },
    ];

    // Row 1: タイトル
    ws.mergeCells('A1:F1');
    ws.getRow(1).height = 32;
    const c1 = ws.getCell('A1');
    c1.value = `${indInfo.name}  M&A デューデリジェンス チェックリスト`;
    c1.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' }, name: 'メイリオ' };
    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A365D' } };
    c1.alignment = { horizontal: 'center', vertical: 'middle' };

    // Row 2: 案件情報
    ws.mergeCells('A2:F2');
    ws.getRow(2).height = 18;
    const c2 = ws.getCell('A2');
    c2.value = `対象会社: ${companyName}　　案件名: ${dealName}　　スキーム: ${dealScheme}　　作成日: ${createDate}`;
    c2.font = { size: 9, color: { argb: 'FFFFFFFF' }, name: 'メイリオ' };
    c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C5282' } };
    c2.alignment = { horizontal: 'center', vertical: 'middle' };

    // Row 3: ヘッダー行
    const r3 = ws.addRow(['カテゴリ', '確認項目', '詳細説明', '重要度', 'チェック', 'メモ']);
    r3.height = 22;
    r3.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10, name: 'メイリオ' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4299E1' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = {
            top:    { style: 'medium', color: { argb: 'FF2B6CB0' } },
            bottom: { style: 'medium', color: { argb: 'FF2B6CB0' } },
            left:   { style: 'thin',   color: { argb: 'FF2B6CB0' } },
            right:  { style: 'thin',   color: { argb: 'FF2B6CB0' } },
        };
    });

    // カラーマップ（重要度別）
    const BG       = { high: 'FFFFF5F5', medium: 'FFFFFBEB', low: 'FFEDFFF4' };
    const TITLE_FG = { high: 'FFC53030', medium: 'FF744210', low: 'FF276749' };
    const PRI_BG   = { high: 'FFFED7D7', medium: 'FFFEFCBF', low: 'FFC6F6D5' };
    const PRI_FG   = { high: 'FFB91C1C', medium: 'FF92400E', low: 'FF166534' };
    const LBORDER  = { high: 'FFE53E3E', medium: 'FFD69E2E', low: 'FF9AE6B4' };
    const PRI_LBL  = { high: '高', medium: '中', low: '低' };

    // データ行（Row 4〜）
    const START_ROW = 4;
    let globalIdx = 0;
    let totalItems = 0;

    const allCats = [...commonCategories];
    const specific = industrySpecific[selectedIndustry];
    if (specific) allCats.push(...specific.categories);

    // 先に総項目数をカウント
    allCats.forEach(cat => totalItems += cat.items.length);
    const END_ROW = START_ROW + totalItems - 1;

    allCats.forEach(cat => {
        cat.items.forEach(item => {
            const p = item.priority;
            const isChecked = !!checkState[globalIdx];
            const noteEl = document.getElementById('note-' + globalIdx);
            const note = noteEl ? noteEl.value : '';

            const row = ws.addRow([
                cat.name,
                item.title,
                item.detail,
                PRI_LBL[p],
                isChecked ? '済' : '未',   // 記号なし: ドロップダウンで変更可能にするため
                note
            ]);
            row.height = 20;

            // 全セルの基本スタイル
            row.eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BG[p] } };
                cell.font = { name: 'メイリオ', size: 9 };
                cell.alignment = { vertical: 'middle', wrapText: true };
                cell.border = {
                    top:    { style: 'hair', color: { argb: 'FFE2E8F0' } },
                    bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } },
                    left:   { style: 'thin', color: { argb: 'FFCBD5E0' } },
                    right:  { style: 'thin', color: { argb: 'FFCBD5E0' } },
                };
            });

            // カテゴリ列（左ボーダーで優先度を表現）
            row.getCell(1).border = {
                top:    { style: 'hair',   color: { argb: 'FFE2E8F0' } },
                bottom: { style: 'hair',   color: { argb: 'FFE2E8F0' } },
                left:   { style: 'medium', color: { argb: LBORDER[p] } },
                right:  { style: 'thin',   color: { argb: 'FFCBD5E0' } },
            };

            // 確認項目列
            row.getCell(2).font = {
                name: 'メイリオ', size: 9,
                bold: p === 'high',
                color: { argb: TITLE_FG[p] },
                strike: isChecked,
            };

            // 重要度列
            const priCell = row.getCell(4);
            priCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PRI_BG[p] } };
            priCell.font = { name: 'メイリオ', bold: true, size: 9, color: { argb: PRI_FG[p] } };
            priCell.alignment = { horizontal: 'center', vertical: 'middle' };

            // チェック列: ドロップダウン選択（済 / 未）＋初期スタイル
            const checkCell = row.getCell(5);
            checkCell.alignment = { horizontal: 'center', vertical: 'middle' };
            checkCell.dataValidation = {
                type: 'list',
                allowBlank: false,
                showDropDown: false,
                formulae: ['"済,未"'],
            };
            // 初期色（条件付き書式で上書きされるが念のため設定）
            if (isChecked) {
                checkCell.font = { name: 'メイリオ', bold: true, size: 10, color: { argb: 'FF166534' } };
                checkCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } };
            } else {
                checkCell.font = { name: 'メイリオ', size: 9, color: { argb: 'FF94A3B8' } };
            }

            globalIdx++;
        });
    });

    // 条件付き書式: チェック列（E列）が「済」→緑、「未」→グレー に自動変化
    ws.addConditionalFormatting({
        ref: `E${START_ROW}:E${END_ROW}`,
        rules: [
            {
                type: 'containsText',
                operator: 'containsText',
                text: '済',
                priority: 1,
                style: {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } },
                    font: { bold: true, color: { argb: 'FF166534' } }
                }
            },
            {
                type: 'containsText',
                operator: 'containsText',
                text: '未',
                priority: 2,
                style: {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } },
                    font: { color: { argb: 'FF94A3B8' } }
                }
            }
        ]
    });

    // ペイン固定（3行目まで）
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 3, topLeftCell: 'A4', activeCell: 'A4' }];

    // ===== Sheet 2: サマリー（COUNTIFでチェックリストと連動） =====
    const wsSumm = workbook.addWorksheet('サマリー');
    wsSumm.columns = [{ key: 'label', width: 34 }, { key: 'value', width: 16 }];

    // チェックリストシートへの参照
    const SH     = `'チェックリスト'`;
    const eRange = `${SH}!E${START_ROW}:E${END_ROW}`;  // チェック列
    const dRange = `${SH}!D${START_ROW}:D${END_ROW}`;  // 重要度列

    // サマリータイトル
    wsSumm.mergeCells('A1:B1');
    wsSumm.getRow(1).height = 28;
    const sTitle = wsSumm.getCell('A1');
    sTitle.value = '進捗サマリー（チェックリストシートと連動）';
    sTitle.font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' }, name: 'メイリオ' };
    sTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A365D' } };
    sTitle.alignment = { horizontal: 'center', vertical: 'middle' };

    // 行追加ヘルパー
    function addSRow(label, value, isHeader) {
        const row = wsSumm.addRow([label, value]);
        row.height = isHeader ? 22 : 20;
        if (isHeader) {
            row.eachCell(cell => {
                cell.font = { bold: true, name: 'メイリオ', size: 10, color: { argb: 'FF2C5282' } };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEBF8FF' } };
                cell.border = { bottom: { style: 'thin', color: { argb: 'FF90CDF4' } } };
            });
        } else if (label) {
            row.getCell(1).font = { name: 'メイリオ', size: 9 };
            row.getCell(2).font = { name: 'メイリオ', size: 10, bold: true };
            row.getCell(2).alignment = { horizontal: 'center' };
            row.eachCell(cell => {
                cell.border = {
                    top:    { style: 'hair', color: { argb: 'FFE2E8F0' } },
                    bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } },
                    left:   { style: 'thin', color: { argb: 'FFCBD5E0' } },
                    right:  { style: 'thin', color: { argb: 'FFCBD5E0' } },
                };
            });
        }
        return row;
    }

    wsSumm.addRow(['', '']);
    addSRow('【全体進捗】', '', true);

    // 総項目数（固定値）
    addSRow('総項目数', totalItems);

    // 完了項目数 ← COUNTIF式（チェック列が「済」の数）
    const doneRow = addSRow('完了項目数（済）', null);
    doneRow.getCell(2).value = { formula: `COUNTIF(${eRange},"済")` };
    doneRow.getCell(2).font = { name: 'メイリオ', size: 10, bold: true, color: { argb: 'FF166534' } };
    doneRow.getCell(2).alignment = { horizontal: 'center' };

    // 未完了項目数 ← COUNTIF式
    const undoneRow = addSRow('未完了項目数（未）', null);
    undoneRow.getCell(2).value = { formula: `COUNTIF(${eRange},"未")` };
    undoneRow.getCell(2).font = { name: 'メイリオ', size: 10, bold: true, color: { argb: 'FFE53E3E' } };
    undoneRow.getCell(2).alignment = { horizontal: 'center' };

    // 完了率 ← 式
    const pctRow = addSRow('完了率', null);
    pctRow.getCell(2).value = { formula: `ROUND(COUNTIF(${eRange},"済")/${totalItems}*100,0)&"%"` };
    pctRow.getCell(2).font = { name: 'メイリオ', size: 12, bold: true, color: { argb: 'FF2B6CB0' } };
    pctRow.getCell(2).alignment = { horizontal: 'center' };

    wsSumm.addRow(['', '']);
    addSRow('【優先度別進捗（済 / 全）】', '', true);

    // 重要度：高 ← COUNTIFS式
    const highRow = addSRow('重要度：高', null);
    highRow.getCell(2).value = {
        formula: `COUNTIFS(${dRange},"高",${eRange},"済")&" / "&COUNTIF(${dRange},"高")`
    };
    highRow.getCell(2).font = { name: 'メイリオ', size: 10, bold: true, color: { argb: 'FFB91C1C' } };
    highRow.getCell(2).alignment = { horizontal: 'center' };

    // 重要度：中
    const medRow = addSRow('重要度：中', null);
    medRow.getCell(2).value = {
        formula: `COUNTIFS(${dRange},"中",${eRange},"済")&" / "&COUNTIF(${dRange},"中")`
    };
    medRow.getCell(2).font = { name: 'メイリオ', size: 10, bold: true, color: { argb: 'FF92400E' } };
    medRow.getCell(2).alignment = { horizontal: 'center' };

    // 重要度：低
    const lowRow = addSRow('重要度：低', null);
    lowRow.getCell(2).value = {
        formula: `COUNTIFS(${dRange},"低",${eRange},"済")&" / "&COUNTIF(${dRange},"低")`
    };
    lowRow.getCell(2).font = { name: 'メイリオ', size: 10, bold: true, color: { argb: 'FF166534' } };
    lowRow.getCell(2).alignment = { horizontal: 'center' };

    wsSumm.addRow(['', '']);
    addSRow('【案件情報】', '', true);
    addSRow('対象会社',   companyName);
    addSRow('案件名',     dealName);
    addSRow('スキーム',   dealScheme);
    addSRow('作成日',     createDate);
    addSRow('業種',       indInfo.name);
    addSRow('出力日時',   new Date().toLocaleString('ja-JP'));

    wsSumm.addRow(['', '']);
    const noteRow = wsSumm.addRow(['※ チェックリストシートのE列（チェック）を「済」↔「未」で切り替えると自動更新されます', '']);
    noteRow.getCell(1).font = { name: 'メイリオ', size: 8, italic: true, color: { argb: 'FF718096' } };

    // ===== ダウンロード =====
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MA_DDチェックリスト_${indInfo.name}_${companyName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
}
