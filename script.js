'use strict';
const button = document.getElementById('generate-btn');
const output = document.getElementById('output-area');
let worker;
let timer;
function generate() {
    if (worker) worker.terminate();
    clearTimeout(timer);
    const pattern = document.getElementById('regex-pattern').value;
    const flags = document.getElementById('regex-flags').value;
    output.classList.remove('ui-error');
    if (!pattern) { output.textContent = 'パターンを入力してください。'; return; }
    output.textContent = '生成中…';
    function fail(message) {
        clearTimeout(timer);
        worker?.terminate();
        output.classList.add('ui-error');
        output.textContent = message;
    }
    try {
        worker = new Worker('generator-worker.js');
        worker.onmessage = event => {
            clearTimeout(timer);
            worker.terminate();
            if (event.data.error) { fail('エラー: ' + event.data.error); return; }
            output.textContent = event.data.results.map((text, i) => `候補 ${i + 1}: ${JSON.stringify(text)}`).join('\n');
        };
        worker.onerror = () => fail('生成処理を読み込めませんでした。HTTPサーバーで開いているか確認してください。');
        timer = setTimeout(() => fail('処理に時間がかかりすぎました。短い正規表現で試してください。'), 1500);
        worker.postMessage({ pattern, flags });
    } catch (_) { fail('生成処理を開始できませんでした。'); }
}
button.addEventListener('click', generate);
generate();
