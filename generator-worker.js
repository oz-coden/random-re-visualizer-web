'use strict';
importScripts('vendor/randexp/randexp.js');
self.onmessage = event => {
    try {
        const { pattern, flags } = event.data;
        if (pattern.length > 2048) throw new Error('パターンは2048文字以内にしてください。');
        const regex = new RegExp(pattern, flags);
        const generator = new RandExp(regex);
        generator.max = 15;
        function budget(token, depth = 0) {
            if (depth > 100) throw new Error('正規表現の入れ子が深すぎます。');
            let size = 1;
            if (token.options) size = Math.max(...token.options.map(option => option.reduce((sum, item) => sum + budget(item, depth + 1), 0)));
            else if (token.stack) size = token.stack.reduce((sum, item) => sum + budget(item, depth + 1), 0);
            else if (token.type === 5) size = Math.max(1, budget(token.value, depth + 1)) * (Number.isFinite(token.max) ? token.max : token.min + 15);
            if (!Number.isFinite(size) || size > 10000) throw new Error('生成結果が長すぎる正規表現です。最大1万文字までにしてください。');
            return size;
        }
        budget(generator.tokens);
        const results = [];
        for (let i = 0; i < 5; i++) {
            let result;
            for (let attempt = 0; attempt < 30; attempt++) {
                const candidate = generator.gen();
                if (candidate.length > 10000) throw new Error('生成結果が1万文字を超えました。');
                regex.lastIndex = 0;
                if (regex.test(candidate)) { result = candidate; break; }
            }
            if (result === undefined) throw new Error('この構文の一致候補は生成できませんでした。対応する正規表現を指定してください。');
            results.push(result);
        }
        self.postMessage({ results });
    } catch (error) { self.postMessage({ error: error.message }); }
};
