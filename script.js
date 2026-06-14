// 你的專屬 Google Apps Script 網址已自動填入：
const scriptURL = 'https://script.google.com/macros/s/AKfycbzN1QLgmH2Fy6_zQ-qK0bbes_I_XF1-3nKFTQCSJA9juj6C0aRAvH9d3U0vHOoVNMzO-w/exec';

// 頁面載入時自動執行：串接 GitHub 官方技術金句 API
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.github.com/zen')
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('API 載入失敗');
        })
        .then(text => {
            document.getElementById('quote-text').innerText = `"${text}"`;
        })
        .catch(err => {
            document.getElementById('quote-text').innerText = "💡 專注當下，打造偉大的硬體專案吧！";
            console.log(err);
        });
});

// 監聽表單送出事件
document.getElementById('log-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻擋網頁跳轉頁面

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = '正在同步至 Google 試算表...';

    // 抓取網頁上使用者輸入的內容
    const projectName = document.getElementById('project-name').value;
    const progress = document.getElementById('progress').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const notes = document.getElementById('notes').value;

    // 將資料打包成 JSON 格式
    const payload = {
        projectName: projectName,
        progress: progress,
        status: status,
        notes: notes
    };

    // 透過 POST 送到你的 Google Apps Script 後端
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // 避免跨網域安全性阻擋
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert('🎉 研發日誌上傳成功！已同步至雲端試算表。');
        document.getElementById('log-form').reset(); // 清空輸入框
    })
    .catch(error => {
        alert('❌ 發生錯誤，請檢查網路或 GAS 部署設定！');
        console.error('Error!', error.message);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = '儲存實驗日誌';
    });
});
