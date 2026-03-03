// ===== Industry Data =====
const industries = [
    { id: 'manufacturing', name: '製造業', icon: '🏭' },
    { id: 'it', name: 'IT・ソフトウェア', icon: '💻' },
    { id: 'retail', name: '小売・流通', icon: '🛒' },
    { id: 'food', name: '飲食・食品', icon: '🍽️' },
    { id: 'construction', name: '建設・不動産', icon: '🏗️' },
    { id: 'medical', name: '医療・介護', icon: '🏥' },
    { id: 'finance', name: '金融・保険', icon: '🏦' },
    { id: 'logistics', name: '物流・運輸', icon: '🚚' },
    { id: 'service', name: 'サービス業', icon: '🤝' },
    { id: 'agriculture', name: '農業・水産業', icon: '🌾' },
    { id: 'energy', name: 'エネルギー', icon: '⚡' },
    { id: 'education', name: '教育・人材', icon: '📚' },
    { id: 'media', name: 'メディア・広告', icon: '📺' },
    { id: 'pharma', name: '製薬・化学', icon: '🧪' },
    { id: 'hotel', name: '宿泊・観光', icon: '🏨' },
];

// ===== Common DD Categories =====
const commonCategories = [
    {
        id: 'corporate',
        name: '会社概要・組織',
        icon: '🏢',
        priority: 'high',
        items: [
            { title: '定款の確認', detail: '最新の定款、変更履歴の確認', priority: 'high' },
            { title: '登記簿謄本の取得・確認', detail: '商業登記簿の内容確認（役員・資本金・本店所在地等）', priority: 'high' },
            { title: '株主名簿の確認', detail: '株主構成、持株比率、種類株式の有無', priority: 'high' },
            { title: '組織図の確認', detail: '部門構成、意思決定プロセス', priority: 'medium' },
            { title: '取締役会・株主総会議事録', detail: '過去3年分の重要決議事項の確認', priority: 'high' },
            { title: '関連会社・子会社の確認', detail: 'グループ構造、資本関係の把握', priority: 'high' },
            { title: '株式に関する契約', detail: '株主間契約、新株予約権、ストックオプションの確認', priority: 'medium' },
        ]
    },
    {
        id: 'financial',
        name: '財務・会計',
        icon: '💰',
        priority: 'high',
        items: [
            { title: '過去3〜5年の財務諸表', detail: 'BS/PL/CF/株主資本等変動計算書の分析', priority: 'high' },
            { title: '月次試算表', detail: '直近12ヶ月の月次推移の確認', priority: 'high' },
            { title: '税務申告書の確認', detail: '法人税・消費税・地方税の申告状況', priority: 'high' },
            { title: '売掛金・買掛金の分析', detail: '回収状況、滞留債権、主要取引先の確認', priority: 'high' },
            { title: '借入金・社債の確認', detail: '金融機関との契約内容、担保設定、コベナンツ', priority: 'high' },
            { title: '簿外債務の調査', detail: '偶発債務、保証債務、リース債務等', priority: 'high' },
            { title: '固定資産台帳の確認', detail: '資産の実在性・評価の妥当性', priority: 'medium' },
            { title: '在庫評価の確認', detail: '評価方法、滞留在庫、実地棚卸の状況', priority: 'medium' },
            { title: '税務リスクの確認', detail: '税務調査の履歴、指摘事項、繰越欠損金', priority: 'high' },
            { title: '事業計画・予算の確認', detail: '売上予測の根拠、前提条件の妥当性', priority: 'medium' },
        ]
    },
    {
        id: 'legal',
        name: '法務',
        icon: '⚖️',
        priority: 'high',
        items: [
            { title: '主要契約書の確認', detail: '取引基本契約、業務委託契約等の洗い出し', priority: 'high' },
            { title: 'チェンジ・オブ・コントロール条項', detail: '支配権変更時の契約解除条項の有無確認', priority: 'high' },
            { title: '訴訟・紛争の確認', detail: '係属中・過去の訴訟、仲裁、調停の確認', priority: 'high' },
            { title: '許認可・免許の確認', detail: '事業に必要な許認可の有効性、承継可否', priority: 'high' },
            { title: 'コンプライアンス体制', detail: '社内規程、内部統制、通報制度', priority: 'medium' },
            { title: '知的財産権の確認', detail: '特許・商標・著作権の保有状況、ライセンス契約', priority: 'high' },
            { title: '不動産関連の確認', detail: '所有不動産・賃借物件の権利関係', priority: 'medium' },
            { title: '反社チェック', detail: '反社会的勢力との関係有無の確認', priority: 'high' },
        ]
    },
    {
        id: 'hr',
        name: '人事・労務',
        icon: '👥',
        priority: 'high',
        items: [
            { title: '従業員名簿の確認', detail: '従業員数、雇用形態別内訳、年齢構成', priority: 'high' },
            { title: '就業規則・人事制度', detail: '給与体系、評価制度、退職金制度', priority: 'high' },
            { title: '労働組合の状況', detail: '組合の有無、労使協定、労働協約', priority: 'medium' },
            { title: '未払残業代の確認', detail: '労務管理の実態、サービス残業のリスク', priority: 'high' },
            { title: '社会保険・労働保険', detail: '加入状況、未払リスクの確認', priority: 'medium' },
            { title: 'キーパーソンの確認', detail: '経営幹部・重要人材の状況と残留意向', priority: 'high' },
            { title: '退職給付債務', detail: '退職金規程、引当金の計上状況', priority: 'medium' },
            { title: '労務トラブル・ハラスメント', detail: '過去の労働紛争、ハラスメント問題の有無', priority: 'medium' },
        ]
    },
    {
        id: 'business',
        name: '事業・ビジネス',
        icon: '📊',
        priority: 'high',
        items: [
            { title: '事業モデルの分析', detail: '収益構造、バリューチェーンの理解', priority: 'high' },
            { title: '市場環境の分析', detail: '市場規模、成長性、競合状況', priority: 'high' },
            { title: '主要顧客の分析', detail: '顧客集中度、取引継続性、契約条件', priority: 'high' },
            { title: '主要仕入先の分析', detail: 'サプライヤー依存度、代替可能性', priority: 'medium' },
            { title: 'SWOT分析', detail: '強み・弱み・機会・脅威の整理', priority: 'medium' },
            { title: 'シナジー効果の検証', detail: '統合による相乗効果の定量評価', priority: 'high' },
        ]
    },
    {
        id: 'it_system',
        name: 'IT・システム',
        icon: '🖥️',
        priority: 'medium',
        items: [
            { title: '基幹システムの確認', detail: '使用システム一覧、カスタマイズ状況', priority: 'high' },
            { title: 'ITインフラの確認', detail: 'サーバー、ネットワーク、クラウド環境', priority: 'medium' },
            { title: 'セキュリティ対策', detail: '情報セキュリティポリシー、インシデント履歴', priority: 'high' },
            { title: 'ライセンス契約', detail: 'ソフトウェアライセンスの状況、移管可否', priority: 'medium' },
            { title: 'データ管理・個人情報保護', detail: 'プライバシーポリシー、個人情報取扱状況', priority: 'high' },
            { title: 'IT人材の確認', detail: 'IT部門の体制、外注依存度', priority: 'medium' },
        ]
    },
    {
        id: 'environment',
        name: '環境・ESG',
        icon: '🌱',
        priority: 'medium',
        items: [
            { title: '環境法令の遵守状況', detail: '排出基準、廃棄物処理、土壌汚染', priority: 'high' },
            { title: '環境リスクの評価', detail: '過去の環境問題、浄化費用の見積り', priority: 'medium' },
            { title: 'ESGへの取り組み', detail: 'サステナビリティ方針、CO2排出量', priority: 'low' },
            { title: '環境関連の許認可', detail: '排出許可、産業廃棄物処理許可等', priority: 'medium' },
        ]
    },
];

// ===== Industry-Specific Items =====
const industrySpecific = {
    manufacturing: {
        name: '製造業固有の確認事項',
        icon: '🏭',
        categories: [
            {
                name: '生産・設備',
                icon: '⚙️',
                priority: 'high',
                items: [
                    { title: '生産設備の状態確認', detail: '主要設備の稼働年数、更新計画、修繕履歴', priority: 'high' },
                    { title: '生産能力・稼働率の分析', detail: 'ライン別生産能力、キャパシティの余裕度', priority: 'high' },
                    { title: '品質管理体制', detail: 'ISO認証、品質検査体制、不良率推移', priority: 'high' },
                    { title: '原材料の調達リスク', detail: '原材料価格変動、調達先の安定性', priority: 'high' },
                    { title: '製品安全・PL法対応', detail: '製品リコール履歴、PL保険の加入状況', priority: 'high' },
                    { title: '工場の環境規制対応', detail: '排水・排気・騒音の法規制対応状況', priority: 'medium' },
                    { title: '生産技術・ノウハウ', detail: '製造プロセスの独自性、技術者の確保', priority: 'medium' },
                    { title: '設備投資計画', detail: '今後の設備投資計画と必要資金', priority: 'medium' },
                ]
            }
        ]
    },
    it: {
        name: 'IT・ソフトウェア固有の確認事項',
        icon: '💻',
        categories: [
            {
                name: '技術・プロダクト',
                icon: '🔧',
                priority: 'high',
                items: [
                    { title: 'ソースコードの品質', detail: 'コードレビュー体制、技術的負債の評価', priority: 'high' },
                    { title: 'システムアーキテクチャ', detail: '技術スタック、スケーラビリティ、可用性', priority: 'high' },
                    { title: 'SaaS KPIの分析', detail: 'MRR/ARR、チャーンレート、LTV/CAC', priority: 'high' },
                    { title: 'セキュリティ脆弱性', detail: 'ペネトレーションテスト結果、脆弱性対応状況', priority: 'high' },
                    { title: 'OSS利用状況', detail: 'オープンソースライセンスの確認、GPL汚染リスク', priority: 'high' },
                    { title: 'データ資産の評価', detail: '保有データの価値、データ基盤の成熟度', priority: 'medium' },
                    { title: '開発体制・プロセス', detail: 'アジャイル/CI/CD導入状況、リリースサイクル', priority: 'medium' },
                    { title: 'SLA・稼働率の確認', detail: 'サービス品質保証、障害対応体制', priority: 'medium' },
                ]
            }
        ]
    },
    retail: {
        name: '小売・流通固有の確認事項',
        icon: '🛒',
        categories: [
            {
                name: '店舗・販売',
                icon: '🏪',
                priority: 'high',
                items: [
                    { title: '店舗別収益分析', detail: '店舗別売上・利益、既存店売上高推移', priority: 'high' },
                    { title: '立地・賃貸借契約', detail: '店舗立地の評価、賃貸借条件、更新リスク', priority: 'high' },
                    { title: '在庫管理の実態', detail: '在庫回転率、死蔵在庫、棚卸差異', priority: 'high' },
                    { title: 'EC・オムニチャネル', detail: 'オンライン売上比率、EC基盤の評価', priority: 'medium' },
                    { title: 'POS・顧客データ', detail: 'POSシステム、顧客データベース、CRM活用状況', priority: 'medium' },
                    { title: 'フランチャイズ契約', detail: 'FC加盟店との契約内容、ロイヤリティ条件', priority: 'high' },
                    { title: 'ブランド・商標の価値', detail: 'ブランド認知度、商標権の保護状況', priority: 'medium' },
                    { title: 'サプライチェーン', detail: '物流網、配送体制、在庫拠点の評価', priority: 'medium' },
                ]
            }
        ]
    },
    food: {
        name: '飲食・食品固有の確認事項',
        icon: '🍽️',
        categories: [
            {
                name: '食品安全・衛生',
                icon: '🔬',
                priority: 'high',
                items: [
                    { title: '食品衛生許可の確認', detail: '営業許可証、食品衛生責任者の配置状況', priority: 'high' },
                    { title: 'HACCP対応状況', detail: 'HACCP認証取得状況、衛生管理計画', priority: 'high' },
                    { title: '食品表示法の遵守', detail: 'アレルギー表示、原産地表示の適正性', priority: 'high' },
                    { title: '過去の食品事故', detail: '食中毒、異物混入、リコール等の履歴', priority: 'high' },
                    { title: '仕入先・産地管理', detail: '原材料のトレーサビリティ、産地偽装リスク', priority: 'high' },
                    { title: '店舗の衛生状態', detail: '保健所の指導履歴、衛生検査結果', priority: 'medium' },
                    { title: 'メニュー・レシピの権利', detail: 'レシピの知的財産保護、フードコスト分析', priority: 'medium' },
                    { title: '季節変動・廃棄ロス', detail: '売上の季節変動、食品ロス率の分析', priority: 'medium' },
                ]
            }
        ]
    },
    construction: {
        name: '建設・不動産固有の確認事項',
        icon: '🏗️',
        categories: [
            {
                name: '建設・不動産',
                icon: '🔨',
                priority: 'high',
                items: [
                    { title: '建設業許可の確認', detail: '一般/特定建設業許可、業種区分の確認', priority: 'high' },
                    { title: '施工実績・受注残', detail: '完成工事高推移、受注残高、工事進行基準', priority: 'high' },
                    { title: '保有不動産の評価', detail: '不動産鑑定評価、含み損益の確認', priority: 'high' },
                    { title: '工事瑕疵・アフターサービス', detail: '瑕疵担保責任、保証期間、過去のクレーム', priority: 'high' },
                    { title: '下請業者の管理', detail: '下請構造、下請法の遵守状況', priority: 'medium' },
                    { title: 'アスベスト・有害物質', detail: '保有建物のアスベスト使用状況、除去費用', priority: 'high' },
                    { title: '技術者の資格・配置', detail: '一級建築士等の有資格者数、専任技術者', priority: 'medium' },
                    { title: '土壌汚染リスク', detail: '土壌汚染調査の実施状況、浄化義務', priority: 'medium' },
                ]
            }
        ]
    },
    medical: {
        name: '医療・介護固有の確認事項',
        icon: '🏥',
        categories: [
            {
                name: '医療・介護特有事項',
                icon: '⚕️',
                priority: 'high',
                items: [
                    { title: '医療機関の開設許可', detail: '病院/診療所の開設許可、管理者要件', priority: 'high' },
                    { title: '診療報酬・介護報酬', detail: '施設基準の届出状況、加算の取得状況', priority: 'high' },
                    { title: '医師・看護師の確保', detail: '医療従事者の充足率、採用競争力', priority: 'high' },
                    { title: '介護保険指定の確認', detail: '介護事業所の指定状況、更新要件', priority: 'high' },
                    { title: '医療法人制度の理解', detail: '社会医療法人/特定医療法人の要件確認', priority: 'high' },
                    { title: '医療事故・訴訟リスク', detail: '医療事故の履歴、医賠責保険の加入状況', priority: 'high' },
                    { title: '患者数・稼働率', detail: '病床稼働率、外来患者数の推移分析', priority: 'medium' },
                    { title: '医療機器の状態', detail: '高額医療機器のリース状況、更新計画', priority: 'medium' },
                ]
            }
        ]
    },
    finance: {
        name: '金融・保険固有の確認事項',
        icon: '🏦',
        categories: [
            {
                name: '金融規制・資産',
                icon: '📑',
                priority: 'high',
                items: [
                    { title: '金融庁の許認可', detail: '金融商品取引業、貸金業、保険業の登録状況', priority: 'high' },
                    { title: '自己資本比率', detail: 'BIS規制、ソルベンシーマージン比率の確認', priority: 'high' },
                    { title: '不良債権の確認', detail: '貸出金の資産分類、引当金の妥当性', priority: 'high' },
                    { title: 'AML/CFT対応', detail: 'マネーロンダリング防止体制、FATF対応', priority: 'high' },
                    { title: '金融検査の履歴', detail: '金融庁・財務局検査の指摘事項', priority: 'high' },
                    { title: '運用資産の評価', detail: '有価証券ポートフォリオ、時価評価', priority: 'high' },
                    { title: '顧客基盤の分析', detail: '顧客数、預かり資産、クロスセル状況', priority: 'medium' },
                    { title: 'システムリスク', detail: '勘定系システムの安定性、BCP対策', priority: 'medium' },
                ]
            }
        ]
    },
    logistics: {
        name: '物流・運輸固有の確認事項',
        icon: '🚚',
        categories: [
            {
                name: '運輸・物流',
                icon: '📦',
                priority: 'high',
                items: [
                    { title: '運送業許可の確認', detail: '一般貨物自動車運送事業許可、特別積合せ', priority: 'high' },
                    { title: '車両・設備の状態', detail: '保有車両数、車齢、整備状況、減価償却', priority: 'high' },
                    { title: 'ドライバーの確保', detail: '運転手の充足率、高齢化、採用状況', priority: 'high' },
                    { title: '安全管理体制', detail: '事故率、安全管理規程、Gマーク認証', priority: 'high' },
                    { title: '倉庫・拠点の確認', detail: '倉庫面積、立地、賃貸借条件', priority: 'medium' },
                    { title: '燃料コストリスク', detail: '燃料費比率、燃料サーチャージの導入状況', priority: 'medium' },
                    { title: '運賃改定の状況', detail: '荷主との運賃交渉、2024年問題対応', priority: 'high' },
                    { title: '配送管理システム', detail: 'WMS/TMS導入状況、配送効率', priority: 'medium' },
                ]
            }
        ]
    },
    service: {
        name: 'サービス業固有の確認事項',
        icon: '🤝',
        categories: [
            {
                name: 'サービス事業',
                icon: '🎯',
                priority: 'high',
                items: [
                    { title: '顧客契約の継続性', detail: '契約更新率、平均契約期間、解約条件', priority: 'high' },
                    { title: 'サービス品質の指標', detail: 'NPS、顧客満足度、クレーム対応状況', priority: 'high' },
                    { title: '人材依存度の確認', detail: '特定個人への依存度、スキル分散状況', priority: 'high' },
                    { title: '業界特有の許認可', detail: '人材派遣業許可、警備業認定等', priority: 'high' },
                    { title: 'サービス提供体制', detail: '拠点配置、エリアカバレッジ', priority: 'medium' },
                    { title: '競合との差別化要因', detail: 'サービスの独自性、参入障壁', priority: 'medium' },
                    { title: '料金体系の分析', detail: '価格設定の合理性、値上げ余地', priority: 'medium' },
                ]
            }
        ]
    },
    agriculture: {
        name: '農業・水産業固有の確認事項',
        icon: '🌾',
        categories: [
            {
                name: '農業・水産',
                icon: '🐟',
                priority: 'high',
                items: [
                    { title: '農地・漁業権の確認', detail: '農地法の制約、漁業権の種類と承継性', priority: 'high' },
                    { title: '補助金・助成金の状況', detail: '受給中の補助金、承継可否、返還リスク', priority: 'high' },
                    { title: '天候・自然災害リスク', detail: '過去の被害状況、保険加入、BCP対策', priority: 'high' },
                    { title: '設備・農機具の状態', detail: 'ビニールハウス、漁船等の稼働状況', priority: 'medium' },
                    { title: '販路・出荷先の確認', detail: 'JA出荷、直販、契約栽培の比率', priority: 'medium' },
                    { title: '有機認証・GAP認証', detail: '各種認証の取得状況、維持要件', priority: 'medium' },
                    { title: '後継者・従業員の確認', detail: '農業従事者の年齢構成、技能承継', priority: 'high' },
                ]
            }
        ]
    },
    energy: {
        name: 'エネルギー固有の確認事項',
        icon: '⚡',
        categories: [
            {
                name: 'エネルギー事業',
                icon: '🔋',
                priority: 'high',
                items: [
                    { title: '発電許可・届出', detail: '電気事業法の許可、FIT認定の確認', priority: 'high' },
                    { title: '発電設備の状態', detail: '設備容量、稼働率、メンテナンス計画', priority: 'high' },
                    { title: 'FIT/FIP制度の確認', detail: '買取価格、残存期間、制度変更リスク', priority: 'high' },
                    { title: '系統接続契約', detail: '送電線の接続状況、出力制御リスク', priority: 'high' },
                    { title: '環境アセスメント', detail: '環境影響評価の実施状況、地域同意', priority: 'medium' },
                    { title: '燃料調達の安定性', detail: 'LNG・石炭等の長期調達契約', priority: 'medium' },
                    { title: 'カーボンニュートラル対応', detail: 'CO2排出量、排出権取引の状況', priority: 'medium' },
                ]
            }
        ]
    },
    education: {
        name: '教育・人材固有の確認事項',
        icon: '📚',
        categories: [
            {
                name: '教育・人材事業',
                icon: '🎓',
                priority: 'high',
                items: [
                    { title: '学校法人の認可', detail: '私立学校法の認可、設置基準の充足', priority: 'high' },
                    { title: '生徒・学生の確保', detail: '定員充足率、入学者推移、退学率', priority: 'high' },
                    { title: '教員の質と確保', detail: '教員資格、採用状況、離職率', priority: 'high' },
                    { title: '派遣・紹介業の許認可', detail: '労働者派遣事業許可、職業紹介事業許可', priority: 'high' },
                    { title: 'カリキュラム・教材の権利', detail: 'オリジナル教材の著作権、使用許諾', priority: 'medium' },
                    { title: '少子化・市場縮小リスク', detail: '対象人口の推移予測、競合状況', priority: 'medium' },
                    { title: 'EdTech・DX対応', detail: 'オンライン授業基盤、デジタル教材', priority: 'medium' },
                ]
            }
        ]
    },
    media: {
        name: 'メディア・広告固有の確認事項',
        icon: '📺',
        categories: [
            {
                name: 'メディア・広告事業',
                icon: '📡',
                priority: 'high',
                items: [
                    { title: '放送免許・届出', detail: '放送局免許、CATV登録の確認', priority: 'high' },
                    { title: 'コンテンツの権利関係', detail: '著作権、出演契約、二次利用権の確認', priority: 'high' },
                    { title: '広告売上の分析', detail: '広告主の集中度、媒体別売上推移', priority: 'high' },
                    { title: '視聴率・PV等の指標', detail: 'メディア接触指標の推移、競合比較', priority: 'medium' },
                    { title: 'デジタルシフト対応', detail: 'デジタル広告比率、プログラマティック対応', priority: 'medium' },
                    { title: 'コンテンツ制作体制', detail: '自社制作/外注比率、クリエイター確保', priority: 'medium' },
                    { title: '景品表示法・広告規制', detail: '過去の行政指導、コンプライアンス体制', priority: 'high' },
                ]
            }
        ]
    },
    pharma: {
        name: '製薬・化学固有の確認事項',
        icon: '🧪',
        categories: [
            {
                name: '製薬・化学事業',
                icon: '💊',
                priority: 'high',
                items: [
                    { title: '医薬品製造販売業許可', detail: 'GMP適合性、製造販売承認の状況', priority: 'high' },
                    { title: 'パイプラインの評価', detail: '開発段階の医薬品、臨床試験の進捗', priority: 'high' },
                    { title: '特許・知財戦略', detail: '物質特許、用途特許の残存期間', priority: 'high' },
                    { title: '薬価制度への対応', detail: '薬価改定リスク、ジェネリック参入への備え', priority: 'high' },
                    { title: '化学物質管理', detail: '化管法/化審法対応、REACH規制', priority: 'high' },
                    { title: 'MR体制の確認', detail: 'MR数、担当エリア、営業力の評価', priority: 'medium' },
                    { title: '治験データの信頼性', detail: 'データインテグリティ、GCP遵守状況', priority: 'high' },
                    { title: '副作用報告・リコール', detail: '過去の副作用報告、自主回収の履歴', priority: 'high' },
                ]
            }
        ]
    },
    hotel: {
        name: '宿泊・観光固有の確認事項',
        icon: '🏨',
        categories: [
            {
                name: '宿泊・観光事業',
                icon: '✈️',
                priority: 'high',
                items: [
                    { title: '旅館業許可の確認', detail: '旅館業法の許可、消防法・建築基準法の遵守', priority: 'high' },
                    { title: '客室稼働率・RevPAR', detail: '稼働率推移、平均客室単価、収益指標', priority: 'high' },
                    { title: '旅行業登録の確認', detail: '旅行業法の登録区分、営業保証金', priority: 'high' },
                    { title: 'OTA・予約システム', detail: '予約チャネル別比率、手数料率', priority: 'medium' },
                    { title: 'インバウンド依存度', detail: '外国人宿泊者比率、為替リスク', priority: 'medium' },
                    { title: '施設の老朽化', detail: '建物の築年数、修繕計画、耐震性', priority: 'high' },
                    { title: '季節変動・イベント依存', detail: '月別売上変動、閑散期対策', priority: 'medium' },
                    { title: '口コミ・評判管理', detail: 'OTA評価スコア、SNS上の評判', priority: 'low' },
                ]
            }
        ]
    },
};

// ===== Industry Relevance Map (common category importance per industry) =====
// 'critical' = this DD area is especially crucial for this industry
// 'important' = above average importance
// 'standard' = normal importance
const industryRelevance = {
    manufacturing: {
        corporate: 'standard', financial: 'critical', legal: 'important', hr: 'important',
        business: 'critical', it_system: 'standard', environment: 'critical',
        keyFocusPoints: [
            { icon: '⚙️', title: '生産設備の老朽化・投資負担', desc: '設備更新の必要性と追加投資額がバリュエーションに直結' },
            { icon: '🔗', title: '原材料サプライチェーンリスク', desc: '調達先の集中度・価格変動が利益率を大きく左右' },
            { icon: '🏭', title: '環境規制・土壌汚染リスク', desc: '工場敷地の土壌汚染は億単位の浄化費用が発生し得る' },
            { icon: '📋', title: '品質管理体制・PL訴訟リスク', desc: '製品リコールやPL訴訟は事業継続の致命的リスク' },
        ]
    },
    it: {
        corporate: 'standard', financial: 'important', legal: 'critical', hr: 'critical',
        business: 'critical', it_system: 'critical', environment: 'standard',
        keyFocusPoints: [
            { icon: '💻', title: 'ソースコード・知財の帰属', desc: 'コードの権利関係不備は買収後の事業継続を脅かす' },
            { icon: '📉', title: 'SaaS KPI（チャーン・LTV/CAC）', desc: '解約率と顧客獲得効率が企業価値の本質' },
            { icon: '🔒', title: 'セキュリティ・データ漏洩リスク', desc: '情報漏洩インシデントは信用失墜と巨額賠償に直結' },
            { icon: '👨‍💻', title: 'キーエンジニアの残留リスク', desc: '技術者離散で事業価値が急速に毀損する業界特性' },
        ]
    },
    retail: {
        corporate: 'standard', financial: 'critical', legal: 'important', hr: 'important',
        business: 'critical', it_system: 'important', environment: 'standard',
        keyFocusPoints: [
            { icon: '📍', title: '店舗立地・賃貸借リスク', desc: '好立地の賃借権は資産、不利な更新条件は大きなリスク' },
            { icon: '📦', title: '在庫の質と滞留リスク', desc: '死蔵在庫の評価損は簿外の巨額負債になり得る' },
            { icon: '🏪', title: '既存店売上高のトレンド', desc: '新規出店でなく既存店の成長力が真の収益力を示す' },
            { icon: '🤝', title: 'FC契約のロック条件', desc: 'フランチャイズ契約の解除制限がM&A後の戦略自由度に影響' },
        ]
    },
    food: {
        corporate: 'standard', financial: 'important', legal: 'critical', hr: 'important',
        business: 'important', it_system: 'standard', environment: 'important',
        keyFocusPoints: [
            { icon: '🦠', title: '食品安全・衛生管理体制', desc: '食中毒事故は廃業リスクに直結する最重要確認事項' },
            { icon: '📜', title: 'HACCP・食品表示の遵守', desc: '法令違反発覚時の営業停止リスクと行政処分の影響' },
            { icon: '🔍', title: '原材料トレーサビリティ', desc: '産地偽装や品質問題が発覚すればブランド価値が壊滅' },
            { icon: '📊', title: '廃棄ロス率と季節変動', desc: '食品ロスの実態が収益構造の質を左右する' },
        ]
    },
    construction: {
        corporate: 'standard', financial: 'critical', legal: 'critical', hr: 'important',
        business: 'important', it_system: 'standard', environment: 'critical',
        keyFocusPoints: [
            { icon: '📋', title: '建設業許可の承継可否', desc: '許可の条件充足が不可なら事業継続自体が困難' },
            { icon: '⚠️', title: 'アスベスト・土壌汚染', desc: '除去・浄化費用は数億円規模で事後発覚すれば買い手負担に' },
            { icon: '🏗️', title: '工事進行基準の会計リスク', desc: '進捗率の恣意的な見積りによる利益の過大計上に注意' },
            { icon: '🔨', title: '瑕疵担保・保証債務', desc: '引渡済み物件の瑕疵責任は長期間の簿外リスク' },
        ]
    },
    medical: {
        corporate: 'important', financial: 'important', legal: 'critical', hr: 'critical',
        business: 'important', it_system: 'standard', environment: 'standard',
        keyFocusPoints: [
            { icon: '⚕️', title: '管理者要件・開設許可の承継', desc: '医療法人特有の制約で通常のM&Aスキームが使えない場合あり' },
            { icon: '👨‍⚕️', title: '医師・看護師の確保', desc: '診療報酬の施設基準維持に必要な人員が確保できるか' },
            { icon: '⚖️', title: '医療事故・訴訟リスク', desc: '過去の医療事故の賠償リスクと保険カバー範囲の確認' },
            { icon: '💊', title: '診療報酬改定リスク', desc: '政策変更で収益構造が大幅に変わる業界特性' },
        ]
    },
    finance: {
        corporate: 'important', financial: 'critical', legal: 'critical', hr: 'standard',
        business: 'important', it_system: 'critical', environment: 'standard',
        keyFocusPoints: [
            { icon: '🏛️', title: '金融庁認可・規制対応', desc: '認可条件の充足と当局の承認取得が取引成立の前提' },
            { icon: '💳', title: '不良債権・引当金の妥当性', desc: '資産の質の精査が企業価値評価の核心' },
            { icon: '🔐', title: 'AML/CFT・コンプライアンス', desc: 'マネロン対策の不備は巨額制裁金と業務停止に直結' },
            { icon: '🖥️', title: '勘定系システムリスク', desc: 'システム統合の困難さとコストがM&A成否を分ける' },
        ]
    },
    logistics: {
        corporate: 'standard', financial: 'important', legal: 'important', hr: 'critical',
        business: 'important', it_system: 'standard', environment: 'important',
        keyFocusPoints: [
            { icon: '🚛', title: 'ドライバー不足・2024年問題', desc: '労働時間規制強化で人員計画と運賃交渉力が事業の生命線' },
            { icon: '🔧', title: '車両老朽化・設備投資', desc: '車両更新費用の先送りは見かけの利益を過大にする' },
            { icon: '⚠️', title: '安全管理・事故リスク', desc: '重大事故は許可取消しに直結し事業継続が不能に' },
            { icon: '⛽', title: '燃料コスト・運賃転嫁力', desc: 'コスト上昇を荷主に転嫁できる交渉力が収益の鍵' },
        ]
    },
    service: {
        corporate: 'standard', financial: 'important', legal: 'important', hr: 'critical',
        business: 'critical', it_system: 'standard', environment: 'standard',
        keyFocusPoints: [
            { icon: '👤', title: 'キーパーソン依存度', desc: '特定人材への依存は買収後の事業価値毀損リスク' },
            { icon: '📃', title: '顧客契約の継続性', desc: '解約率とCOC条項が買収後の売上維持を左右' },
            { icon: '📜', title: '業界許認可の承継', desc: '派遣業・警備業等の許認可がスキーム選択に制約' },
            { icon: '📊', title: 'サービス品質指標（NPS等）', desc: '顧客満足度の低下は解約率上昇として顕在化する' },
        ]
    },
    agriculture: {
        corporate: 'standard', financial: 'important', legal: 'critical', hr: 'critical',
        business: 'important', it_system: 'standard', environment: 'important',
        keyFocusPoints: [
            { icon: '🌾', title: '農地法・漁業権の制約', desc: '法的制約が多くM&Aスキームが大きく限定される' },
            { icon: '💰', title: '補助金の承継・返還リスク', desc: 'M&Aにより補助金返還義務が発生する場合がある' },
            { icon: '🌪️', title: '天候・自然災害リスク', desc: '収益の不安定さが企業価値評価を困難にする' },
            { icon: '👨‍🌾', title: '後継者・技能承継', desc: '高齢化と暗黙知の承継が事業継続の最大課題' },
        ]
    },
    energy: {
        corporate: 'standard', financial: 'critical', legal: 'critical', hr: 'standard',
        business: 'critical', it_system: 'standard', environment: 'critical',
        keyFocusPoints: [
            { icon: '📋', title: 'FIT認定・系統接続の確保', desc: '認定と接続権は事業の根幹であり譲渡制限に注意' },
            { icon: '⚡', title: '設備の稼働率・劣化状況', desc: '発電効率の低下は長期キャッシュフローに直接影響' },
            { icon: '🌍', title: '環境アセスメント・地域合意', desc: '地元反対が顕在化すれば事業頓挫のリスク' },
            { icon: '📉', title: 'FIT/FIP制度変更リスク', desc: '政策変更で収益モデルが根本から変わり得る' },
        ]
    },
    education: {
        corporate: 'important', financial: 'important', legal: 'critical', hr: 'critical',
        business: 'important', it_system: 'standard', environment: 'standard',
        keyFocusPoints: [
            { icon: '🏫', title: '学校法人・許認可の制約', desc: '学校法人の持分譲渡制限が取引スキームを制約' },
            { icon: '📉', title: '少子化による市場縮小', desc: '定員充足率の将来見通しが事業価値の核心' },
            { icon: '👨‍🏫', title: '教員の質と確保', desc: '教員離脱は教育品質の低下に直結する' },
            { icon: '📜', title: '派遣・紹介業の許認可', desc: '人材事業の場合は許認可の承継可否が重要' },
        ]
    },
    media: {
        corporate: 'standard', financial: 'important', legal: 'critical', hr: 'important',
        business: 'critical', it_system: 'important', environment: 'standard',
        keyFocusPoints: [
            { icon: '📺', title: 'コンテンツ権利の帰属', desc: '著作権・出演契約の不備は事業の根幹を揺るがす' },
            { icon: '📡', title: '放送免許・届出の承継', desc: '放送免許の移転制限がM&Aスキームを制約' },
            { icon: '📊', title: '広告主の集中度', desc: '少数広告主への依存は収益の急変リスク' },
            { icon: '⚖️', title: '景表法・広告規制対応', desc: '過去の行政指導歴はレピュテーションリスク' },
        ]
    },
    pharma: {
        corporate: 'standard', financial: 'critical', legal: 'critical', hr: 'important',
        business: 'critical', it_system: 'standard', environment: 'critical',
        keyFocusPoints: [
            { icon: '🧬', title: 'パイプラインの価値評価', desc: '開発段階品の成功確率がバリュエーションの最大論点' },
            { icon: '📋', title: 'GMP適合・製造販売許可', desc: '許可要件の不備は製造停止に直結する致命的リスク' },
            { icon: '⏳', title: '特許の残存期間', desc: '特許切れによるジェネリック参入が収益を激変させる' },
            { icon: '⚠️', title: '副作用報告・リコール履歴', desc: '薬害リスクは巨額賠償と企業存続に関わる' },
        ]
    },
    hotel: {
        corporate: 'standard', financial: 'critical', legal: 'important', hr: 'important',
        business: 'critical', it_system: 'standard', environment: 'standard',
        keyFocusPoints: [
            { icon: '🏨', title: '施設老朽化・修繕費', desc: '築年数と大規模修繕計画が将来の追加投資額を決める' },
            { icon: '📊', title: 'RevPAR・稼働率トレンド', desc: '客室単価と稼働率の推移が収益力の本質' },
            { icon: '🌏', title: 'インバウンド依存度', desc: '外国人比率の高さは為替・地政学リスクに直結' },
            { icon: '📋', title: '旅館業許可・消防法対応', desc: '法令不適合は営業停止に直結し改修費も多額' },
        ]
    },
};
